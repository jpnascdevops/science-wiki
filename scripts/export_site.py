import re
import shutil
import sys
from pathlib import Path

import yaml

from wiki import ROOT, ancestors, children, depth, load_all, load_map, load_yaml, topo_order

OUT = ROOT / "site" / "content"
LEVEL_PT = {"zero": "do zero", "intermediate": "intermediário", "technical": "técnico"}
KIND_PT = {"watch": "Assistir", "read": "Ler", "study": "Estudar"}
STATUS_PT = {"pending": "pendente", "verified": "verificado", "disputed": "contestado", "wrong": "errado"}
SYMBOL_DISPLAY = {
    "\\sqrt": "\\sqrt{x}",
    "\\frac": "\\frac{a}{b}",
    "\\hat": "\\hat{r}",
    "\\vec": "\\vec{F}",
    "\\langle": "\\langle S \\rangle",
    "\\rangle": "\\vert\\psi\\rangle",
    "\\dagger": "U^\\dagger",
    "\\partial": "\\partial I",
    "\\lim": "\\lim_{n\\to 1}",
}
REVIEW_LABEL = {"draft": "rascunho", "auto_checked": "checado", "human_reviewed": "revisado"}
CONSENSUS_PT = {
    "established": "estabelecido",
    "broad": "consenso amplo",
    "debated": "em debate",
    "speculative": "especulativo",
    "superseded": "superado",
}
REVIEW_PT = {
    "draft": ("warning", "Rascunho: ainda não revisado por uma pessoa."),
    "auto_checked": ("info", "Checado automaticamente; falta revisão humana."),
    "human_reviewed": ("success", "Revisado por uma pessoa."),
}


def heading_slug(text):
    text = re.sub(r"[^\w\- ]", "", text.lower(), flags=re.UNICODE)
    return text.replace(" ", "-")


def link(concepts, nodes, cid):
    if cid in concepts:
        return f"[[{cid}|{nodes[cid].title}]]"
    return f"{nodes[cid].title} (em breve)"


def symbols_used(equations, symbols):
    found = []
    joined = " ".join(e["tex"] for e in equations)
    for key, spoken in symbols.items():
        pattern = re.escape(key) + (r"(?![A-Za-z])" if re.match(r"\\[A-Za-z]+$", key) else "")
        if re.search(pattern, joined):
            found.append((key, spoken))
    return found


def pronunciation(meta, symbols):
    eqs = meta.get("equations", [])
    if not eqs:
        return ""
    lines = ["## Como ler as equações em voz alta", ""]
    used = symbols_used(eqs, symbols)
    if used:
        lines += ["| Símbolo | Fala-se |", "| --- | --- |"]
        for key, spoken in used:
            lines.append(f"| ${SYMBOL_DISPLAY.get(key, 'x' + key if key.startswith(('^', '_')) else key)}$ | {spoken} |")
        lines.append("")
    lines += ["| Equação | Fala-se |", "| --- | --- |"]
    for e in eqs:
        tex = e["tex"].replace("|", "\\vert ")
        lines.append(f"| ${tex}$ | {e['spoken']} |")
    return "\n".join(lines) + "\n"


def resources(meta):
    items = meta.get("resources", [])
    if not items:
        return ""
    lines = ["## Materiais", ""]
    for kind in ("watch", "read", "study"):
        group = [r for r in items if r["kind"] == kind]
        if not group:
            continue
        lines += [f"**{KIND_PT[kind]}**", ""]
        for r in group:
            title = f"[{r['title']}]({r['url']})" if r.get("url") else f"{r['title']} (link pendente)"
            lines.append(f"- {title} · {LEVEL_PT[r['level']]} · {r['lang']}")
        lines.append("")
    return "\n".join(lines)


def claims(meta):
    items = meta.get("claims", [])
    if not items:
        return ""
    lines = ["## Checagem", "", "| Afirmação | Tipo | Como | Status |", "| --- | --- | --- | --- |"]
    for c in items:
        srcs = " ".join(f"[fonte]({s})" for s in c.get("sources", []))
        how = c["check"] + (f" `{c['formula']}`" if c.get("formula") else "") + (f" arXiv:{c['arxiv']}" if c.get("arxiv") else "")
        text = c["text"].replace("|", "\\|") + (f" {srcs}" if srcs else "")
        lines.append(f"| {text} | {c['type']} | {how} | {STATUS_PT[c['status']]} |")
    return "\n".join(lines) + "\n"


def flat_tags(meta):
    t = meta["tags"]
    out = [f"area/{t['area']}"] + [f"topic/{x}" for x in t["topics"]]
    out += [f"level/{lv}" for lv in meta["levels"]]
    out += [f"person/{p}" for p in t.get("people", [])]
    if t.get("era"):
        out.append(f"era/{t['era']}")
    if t.get("arxiv_category"):
        out.append(f"arxiv/{t['arxiv_category']}")
    return out


def render_concept(concepts, nodes, kids, history, cid, symbols):
    c = concepts[cid]
    m = c.meta
    front = {"title": m["title"], "description": m.get("summary", ""), "tags": flat_tags(m), "aliases": [cid]}
    kind, note = REVIEW_PT[m["review"]["status"]]
    checked = m["review"].get("checked_at") or "nunca"
    head = [f"> [!{kind}] Status", f"> {note} Grau de consenso: {CONSENSUS_PT[m['consensus']]}. Última checagem: {checked}.", ""]
    head += ["> [!abstract] Revisão rápida"] + [f"> - {b}" for b in m["recap"]] + [""]
    trail = []
    if nodes[cid].requires:
        trail.append("**Antes:** " + ", ".join(link(concepts, nodes, p) for p in nodes[cid].requires))
    if kids[cid]:
        trail.append("**Depois:** " + ", ".join(link(concepts, nodes, n) for n in kids[cid]))
    if trail:
        head += [" · ".join(trail), ""]
    era = m["tags"].get("era")
    people = m["tags"].get("people", [])
    if era or people:
        bits = []
        if era:
            bits.append(f"**Época:** [[timeline#{heading_slug(history['eras'][era]['title'])}|{history['eras'][era]['title']}]]")
        if people:
            bits.append("**Pessoas:** " + ", ".join(f"[[people/{p}|{history['people'][p]['name']}]]" for p in people))
        head += [" · ".join(bits), ""]
    body = "\n".join(head) + "\n" + c.body.strip() + "\n\n" + pronunciation(m, symbols) + "\n" + resources(m) + "\n" + claims(m)
    return "---\n" + yaml.safe_dump(front, allow_unicode=True, sort_keys=False) + "---\n\n" + body


def render_trail(concepts, nodes, trail, order, d, module_titles):
    ids = ancestors(nodes, trail["targets"])
    trail_order = [cid for cid in order if cid in ids]
    written = sum(1 for cid in ids if cid in concepts)
    lines = [f"## {trail['title']}", "", f"{trail['summary']} {len(ids)} conceitos, {written} já escritos.", ""]
    lines += ["| # | Conceito | Módulo | Depende de |", "| --- | --- | --- | --- |"]
    for i, cid in enumerate(trail_order, 1):
        pres = ", ".join(link(concepts, nodes, p) for p in nodes[cid].requires) or "nada"
        lines.append(f"| {i} | {link(concepts, nodes, cid)} | {module_titles[nodes[cid].module]} | {pres} |")
    return "\n".join(lines) + "\n"


def render_roadmap(concepts, nodes):
    order = topo_order(nodes)
    d = depth(nodes)
    modules = load_yaml("map.yaml")["modules"]
    module_titles = {m["id"]: m["title"] for m in modules}
    weight = {}
    for cid, n in nodes.items():
        for p in n.requires:
            if nodes[p].module != n.module:
                key = (nodes[p].module, n.module)
                weight[key] = weight.get(key, 0) + 1
    strong = {k for k, w in weight.items() if w >= 2 and weight.get((k[1], k[0]), 0) < w}
    edges = {(a, b) for a, b in strong if not any((a, c) in strong and (c, b) in strong for c in module_titles)}
    head = ["---", "title: Roadmap", "---", "",
            "Cada trilha começa do zero e lista os conceitos na ordem em que um só depende dos anteriores. Conceitos ainda não escritos aparecem como \"em breve\".", "",
            "### Como os módulos se ligam", "", "```mermaid", "graph TD"]
    for m in modules:
        head.append(f'  {m["id"].replace("-", "_")}["{m["title"]}"]')
    for a, b in sorted(edges):
        head.append(f"  {a.replace('-', '_')} --> {b.replace('-', '_')}")
    head += ["```", ""]
    trails = load_yaml("trails.yaml")
    return "\n".join(head) + "\n".join(render_trail(concepts, nodes, t, order, d, module_titles) for t in trails)


def render_timeline(concepts, nodes, history):
    lines = ["---", "title: Linha do tempo", "---", "",
             "A física por épocas: quem fez, o que aconteceu e quais ideias foram deixadas para trás. As datas exatas entram à medida que cada evento é checado.", ""]
    for era in history["eras_list"]:
        lines += [f"## {era['title']}", "", f"*{era['span']}*", ""]
        evs = [e for e in history["events_list"] if e["era"] == era["id"]]
        if evs:
            lines += ["**Acontecimentos**", ""]
            for e in evs:
                cs = ", ".join(link(concepts, nodes, c) for c in e.get("concepts", []))
                lines.append(f"- {e['title']}" + (f" · {cs}" if cs else ""))
            lines.append("")
        ppl = [p for p in history["people_list"] if p["era"] == era["id"]]
        if ppl:
            lines += ["**Pessoas**", "", ", ".join(f"[[people/{p['id']}|{p['name']}]]" for p in ppl), ""]
        sup = [x for x in history["superseded_list"] if x["era"] == era["id"]]
        if sup:
            lines += ["**Ideias superadas**", ""]
            for x in sup:
                lines.append(f"- {x['title']}, substituída por: {link(concepts, nodes, x['superseded_by'])}")
            lines.append("")
    return "\n".join(lines) + "\n"


def render_person(person, concepts, nodes, history):
    era = history["eras"][person["era"]]
    appears = [cid for cid, c in concepts.items() if person["id"] in c.meta["tags"].get("people", [])]
    lines = ["---", f"title: \"{person['name']}\"", "tags: [person]", "---", "",
             f"**Época:** [[timeline#{heading_slug(era['title'])}|{era['title']}]] ({era['span']})", ""]
    if appears:
        lines += ["**Aparece em:** " + ", ".join(link(concepts, nodes, c) for c in appears), ""]
    lines += ["> [!note] Em construção", "> A biografia e as contribuições desta pessoa ainda vão ser escritas e checadas.", ""]
    return "\n".join(lines)


def render_index(concepts, nodes):
    total = sum(len(c.meta.get("claims", [])) for c in concepts.values())
    ok = sum(1 for c in concepts.values() for x in c.meta.get("claims", []) if x["status"] == "verified")
    trails = load_yaml("trails.yaml")
    return "\n".join([
        "---", "title: Wiki de Conceitos", "---", "",
        "Física explicada do zero ao técnico, conceito por conceito, com a história de quem descobriu cada coisa, equações com pronúncia, exemplos calculados, laboratórios, materiais e checagem das afirmações.",
        "",
        f"- [[roadmap|Roadmap]]: {len(trails)} trilhas, do primeiro conceito até as fronteiras da física.",
        "- [[timeline|Linha do tempo]]: da Antiguidade até hoje, com pessoas, acontecimentos e ideias superadas.",
        "- Cada conceito tem uma **revisão rápida** no topo, para quem só quer recapitular.",
        "",
        f"Conceitos escritos: {len(concepts)} de {len(nodes)} no mapa. Afirmações verificadas: {ok} de {total}.",
        "",
    ])


def main() -> int:
    concepts = load_all()
    nodes = load_map()
    kids = children(nodes)
    symbols = load_yaml("symbols.yaml")
    eras_list = load_yaml("history/eras.yaml")
    people_list = load_yaml("history/people.yaml")
    history = {
        "eras_list": eras_list,
        "eras": {e["id"]: e for e in eras_list},
        "people_list": people_list,
        "people": {p["id"]: p for p in people_list},
        "events_list": load_yaml("history/events.yaml"),
        "superseded_list": load_yaml("history/superseded.yaml"),
    }
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "concepts").mkdir(parents=True)
    (OUT / "people").mkdir()
    for cid in concepts:
        (OUT / "concepts" / f"{cid}.md").write_text(render_concept(concepts, nodes, kids, history, cid, symbols), encoding="utf-8")
    for p in people_list:
        (OUT / "people" / f"{p['id']}.md").write_text(render_person(p, concepts, nodes, history), encoding="utf-8")
    (OUT / "concepts" / "index.md").write_text("---\ntitle: Conceitos\n---\n\nTodos os conceitos já escritos. Para a ordem de estudo, veja o [[roadmap|Roadmap]].\n", encoding="utf-8")
    (OUT / "people" / "index.md").write_text("---\ntitle: Pessoas\n---\n\nQuem construiu a física. Veja também a [[timeline|Linha do tempo]].\n", encoding="utf-8")
    (OUT / "roadmap.md").write_text(render_roadmap(concepts, nodes), encoding="utf-8")
    (OUT / "timeline.md").write_text(render_timeline(concepts, nodes, history), encoding="utf-8")
    (OUT / "index.md").write_text(render_index(concepts, nodes), encoding="utf-8")
    print(f"exported {len(concepts)} concepts and {len(people_list)} people to {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
