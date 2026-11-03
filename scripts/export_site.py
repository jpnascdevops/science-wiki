import re
import shutil
import sys
from pathlib import Path

import yaml

from wiki import ROOT, ancestors, children, load_all, load_map, load_yaml, topo_order

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


def trail_info(nodes, order, trails):
    info = []
    for t in trails:
        ids = ancestors(nodes, t["targets"])
        info.append({"id": t["id"], "title": t["title"], "summary": t["summary"], "order": [c for c in order if c in ids]})
    return info


def node_ref(concepts, nodes, cid):
    return {"id": cid, "title": nodes[cid].title, "written": cid in concepts}


def concept_view(concepts, nodes, kids, history, tinfo, module_titles, cid):
    m = concepts[cid].meta
    containing = sorted((t for t in tinfo if cid in t["order"]), key=lambda t: len(t["order"]))
    trails = []
    for t in containing:
        pos = t["order"].index(cid)
        lo = max(0, min(pos - 3, len(t["order"]) - 7))
        window = t["order"][lo:lo + 7]
        trails.append({
            "id": t["id"], "title": t["title"], "pos": pos + 1, "total": len(t["order"]),
            "window": [dict(node_ref(concepts, nodes, w), current=w == cid, n=t["order"].index(w) + 1) for w in window],
        })
    era = m["tags"].get("era")
    return {
        "kind": "concept",
        "module": module_titles[nodes[cid].module],
        "review": m["review"]["status"],
        "consensus": CONSENSUS_PT[m["consensus"]],
        "checked": str(m["review"].get("checked_at") or ""),
        "before": [node_ref(concepts, nodes, p) for p in nodes[cid].requires],
        "after": [node_ref(concepts, nodes, n) for n in kids[cid]],
        "trails": trails,
        "era": {"title": history["eras"][era]["title"], "anchor": heading_slug(history["eras"][era]["title"])} if era else None,
        "people": [{"id": p, "name": history["people"][p]["name"]} for p in m["tags"].get("people", [])],
    }


def render_concept(concepts, nodes, kids, history, tinfo, module_titles, cid, symbols):
    c = concepts[cid]
    m = c.meta
    front = {
        "title": m["title"], "description": m.get("summary", ""), "tags": flat_tags(m), "aliases": [cid],
        "wiki": concept_view(concepts, nodes, kids, history, tinfo, module_titles, cid),
    }
    head = ["> [!abstract] Revisão rápida"] + [f"> - {b}" for b in m["recap"]] + [""]
    body = "\n".join(head) + "\n" + c.body.strip() + "\n\n" + pronunciation(m, symbols) + "\n" + resources(m) + "\n" + claims(m)
    return "---\n" + yaml.safe_dump(front, allow_unicode=True, sort_keys=False) + "---\n\n" + body


def trail_card(concepts, t):
    written = sum(1 for c in t["order"] if c in concepts)
    return {"id": t["id"], "title": t["title"], "summary": t["summary"], "total": len(t["order"]), "written": written, "ids": t["order"]}


def render_trail(concepts, nodes, t, module_titles):
    order = t["order"]
    inside = set(order)
    layer = {}
    for cid in order:
        layer[cid] = 1 + max((layer[p] for p in nodes[cid].requires if p in inside), default=-1)
    view = {
        "kind": "trail",
        "nodes": [dict(node_ref(concepts, nodes, cid), n=i, layer=layer[cid], module=nodes[cid].module) for i, cid in enumerate(order, 1)],
        "edges": [[p, cid] for cid in order for p in nodes[cid].requires if p in inside],
    }
    written = sum(1 for cid in order if cid in concepts)
    view["intro"] = f"{t['summary']} {len(order)} conceitos, {written} já escritos. Cada estrela é um conceito; as linhas ligam um conceito ao que ele exige. Comece pelo número 1."
    front = {"title": t["title"], "description": t["summary"], "wiki": view}
    lines = ["## Ordem de estudo", ""]
    lines += ["| # | Conceito | Módulo | Depende de |", "| --- | --- | --- | --- |"]
    for i, cid in enumerate(order, 1):
        pres = ", ".join(link(concepts, nodes, p) for p in nodes[cid].requires) or "nada"
        lines.append(f"| {i} | {link(concepts, nodes, cid)} | {module_titles[nodes[cid].module]} | {pres} |")
    return "---\n" + yaml.safe_dump(front, allow_unicode=True, sort_keys=False) + "---\n\n" + "\n".join(lines) + "\n"


def render_roadmap(concepts, nodes, tinfo):
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
    front = {"title": "Roadmap", "wiki": {"kind": "roadmap", "trails": [trail_card(concepts, t) for t in tinfo],
             "intro": "Cada trilha começa do zero e segue a ordem em que um conceito só depende dos anteriores. Escolha uma para ver o mapa dela."}}
    body = ["## Como os módulos se ligam", "", "```mermaid", "graph TD"]
    for m in modules:
        body.append(f'  {m["id"].replace("-", "_")}["{m["title"]}"]')
    for a, b in sorted(edges):
        body.append(f"  {a.replace('-', '_')} --> {b.replace('-', '_')}")
    body += ["```", ""]
    return "---\n" + yaml.safe_dump(front, allow_unicode=True, sort_keys=False) + "---\n\n" + "\n".join(body)


def render_timeline(concepts, nodes, history):
    eras = []
    for era in history["eras_list"]:
        eras.append({
            "id": era["id"], "title": era["title"], "span": era["span"], "anchor": heading_slug(era["title"]),
            "events": [{"title": e["title"], "concepts": [node_ref(concepts, nodes, c) for c in e.get("concepts", [])]}
                       for e in history["events_list"] if e["era"] == era["id"]],
            "people": [{"id": p["id"], "name": p["name"]} for p in history["people_list"] if p["era"] == era["id"]],
            "superseded": [{"title": x["title"], "by": node_ref(concepts, nodes, x["superseded_by"])}
                           for x in history["superseded_list"] if x["era"] == era["id"]],
        })
    front = {"title": "Linha do tempo", "wiki": {"kind": "timeline", "eras": eras,
             "intro": "A física por épocas: quem fez, o que aconteceu e quais ideias ficaram para trás. As datas exatas entram à medida que cada evento é checado."}}
    body = ""
    return "---\n" + yaml.safe_dump(front, allow_unicode=True, sort_keys=False) + "---\n\n" + body


def render_person(person, concepts, nodes, history):
    era = history["eras"][person["era"]]
    appears = [cid for cid, c in concepts.items() if person["id"] in c.meta["tags"].get("people", [])]
    lines = ["---", f"title: \"{person['name']}\"", "tags: [person]", "---", "",
             f"**Época:** [[timeline#{heading_slug(era['title'])}|{era['title']}]] ({era['span']})", ""]
    if appears:
        lines += ["**Aparece em:** " + ", ".join(link(concepts, nodes, c) for c in appears), ""]
    lines += ["> [!note] Em construção", "> A biografia e as contribuições desta pessoa ainda vão ser escritas e checadas.", ""]
    return "\n".join(lines)


def render_index(concepts, nodes, tinfo, history):
    total = sum(len(c.meta.get("claims", [])) for c in concepts.values())
    ok = sum(1 for c in concepts.values() for x in c.meta.get("claims", []) if x["status"] == "verified")
    view = {
        "kind": "home",
        "stats": {"written": len(concepts), "mapped": len(nodes), "verified": ok, "claims": total,
                  "trails": len(tinfo), "people": len(history["people_list"])},
        "trails": [trail_card(concepts, t) for t in tinfo],
    }
    front = {"title": "Wiki de Conceitos", "description": "Física do zero ao técnico, com história, equações com pronúncia, laboratórios e checagem.", "wiki": view}
    body = "Cada conceito tem uma revisão rápida no topo, a equação central com a leitura em voz alta, um exemplo calculado, materiais para assistir, ler e estudar, e a lista das afirmações com o status da checagem.\n"
    return "---\n" + yaml.safe_dump(front, allow_unicode=True, sort_keys=False) + "---\n\n" + body


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
    modules = load_yaml("map.yaml")["modules"]
    module_titles = {m["id"]: m["title"] for m in modules}
    tinfo = trail_info(nodes, topo_order(nodes), load_yaml("trails.yaml"))
    if OUT.exists():
        shutil.rmtree(OUT)
    for sub in ("concepts", "people", "trails"):
        (OUT / sub).mkdir(parents=True)
    for cid in concepts:
        (OUT / "concepts" / f"{cid}.md").write_text(render_concept(concepts, nodes, kids, history, tinfo, module_titles, cid, symbols), encoding="utf-8")
    for p in people_list:
        (OUT / "people" / f"{p['id']}.md").write_text(render_person(p, concepts, nodes, history), encoding="utf-8")
    for t in tinfo:
        (OUT / "trails" / f"{t['id']}.md").write_text(render_trail(concepts, nodes, t, module_titles), encoding="utf-8")
    (OUT / "concepts" / "index.md").write_text("---\ntitle: Conceitos\n---\n\nTodos os conceitos já escritos. Para a ordem de estudo, veja o [[roadmap|Roadmap]].\n", encoding="utf-8")
    (OUT / "people" / "index.md").write_text("---\ntitle: Pessoas\n---\n\nQuem construiu a física. Veja também a [[timeline|Linha do tempo]].\n", encoding="utf-8")
    (OUT / "trails" / "index.md").write_text("---\ntitle: Trilhas\n---\n\nTodas as trilhas estão no [[roadmap|Roadmap]].\n", encoding="utf-8")
    (OUT / "roadmap.md").write_text(render_roadmap(concepts, nodes, tinfo), encoding="utf-8")
    (OUT / "timeline.md").write_text(render_timeline(concepts, nodes, history), encoding="utf-8")
    (OUT / "index.md").write_text(render_index(concepts, nodes, tinfo, history), encoding="utf-8")
    print(f"exported {len(concepts)} concepts and {len(people_list)} people to {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
