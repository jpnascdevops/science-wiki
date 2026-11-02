import re
import shutil
import sys
from pathlib import Path

import yaml

from wiki import ROOT, depth, load_all, load_yaml, topo_order

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
REVIEW_PT = {
    "draft": ("warning", "Rascunho: ainda não revisado por uma pessoa."),
    "auto_checked": ("info", "Checado automaticamente; falta revisão humana."),
    "human_reviewed": ("success", "Revisado por uma pessoa."),
}


def link(concepts, cid):
    return f"[[{cid}|{concepts[cid].meta['title']}]]"


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


def render_concept(concepts, cid, symbols):
    c = concepts[cid]
    m = c.meta
    front = {"title": m["title"], "description": m.get("summary", ""), "tags": flat_tags(m), "aliases": [cid]}
    kind, note = REVIEW_PT[m["review"]["status"]]
    checked = m["review"].get("checked_at") or "nunca"
    head = [f"> [!{kind}] Status", f"> {note} Última checagem: {checked}.", ""]
    pres = m.get("prerequisites", [])
    nexts = [k for k, o in concepts.items() if cid in o.meta.get("prerequisites", [])]
    trail = []
    if pres:
        trail.append("**Antes:** " + ", ".join(link(concepts, p) for p in pres))
    if nexts:
        trail.append("**Depois:** " + ", ".join(link(concepts, n) for n in nexts))
    if trail:
        head += [" · ".join(trail), ""]
    body = "\n".join(head) + c.body.strip() + "\n\n" + pronunciation(m, symbols) + "\n" + resources(m) + "\n" + claims(m)
    return "---\n" + yaml.safe_dump(front, allow_unicode=True, sort_keys=False) + "---\n\n" + body


def ancestors(concepts, targets):
    seen = set()
    stack = list(targets)
    while stack:
        cid = stack.pop()
        if cid in seen:
            continue
        seen.add(cid)
        stack.extend(concepts[cid].meta.get("prerequisites", []))
    return seen


def render_trail(concepts, trail, order, d):
    ids = ancestors(concepts, trail["targets"])
    trail_order = [cid for cid in order if cid in ids]
    lines = [f"## {trail['title']}", "", trail["summary"], "", "```mermaid", "graph TD"]
    for cid in trail_order:
        lines.append(f'  {cid.replace("-", "_")}["{concepts[cid].meta["title"]}"]')
    for cid in trail_order:
        for p in concepts[cid].meta.get("prerequisites", []):
            if p in ids:
                lines.append(f"  {p.replace('-', '_')} --> {cid.replace('-', '_')}")
    lines += ["```", "", "| # | Conceito | Etapa | Depende de | Status |", "| --- | --- | --- | --- | --- |"]
    for i, cid in enumerate(trail_order, 1):
        m = concepts[cid].meta
        pres = ", ".join(link(concepts, p) for p in m.get("prerequisites", [])) or "nada"
        lines.append(f"| {i} | {link(concepts, cid)} | {d[cid]} | {pres} | {REVIEW_LABEL[m['review']['status']]} |")
    return "\n".join(lines) + "\n"


def render_roadmap(concepts):
    order = topo_order(concepts)
    d = depth(concepts)
    trails = load_yaml("trails.yaml")
    head = ["---", "title: Roadmap", "---", "", "Cada trilha lista os conceitos na ordem em que um depende só dos anteriores. Conceitos de base aparecem nas duas.", ""]
    return "\n".join(head) + "\n".join(render_trail(concepts, t, order, d) for t in trails)


def render_index(concepts):
    total = sum(len(c.meta.get("claims", [])) for c in concepts.values())
    ok = sum(1 for c in concepts.values() for x in c.meta.get("claims", []) if x["status"] == "verified")
    return "\n".join([
        "---", "title: Wiki de Conceitos", "---", "",
        "Conceitos de física explicados do zero ao técnico, cada um com equações, pronúncia, exemplos calculados, materiais e checagem das afirmações.",
        "",
        "- [[roadmap|Roadmap]]: duas trilhas, o paradoxo da informação (até replica wormholes) e exoplanetas (até atmosferas de outros mundos).",
        "- Navegue pelas tags: área, tópico, nível, pessoa e época.",
        "",
        f"Afirmações verificadas: {ok} de {total}.",
        "",
    ])


def main() -> int:
    concepts = load_all()
    symbols = load_yaml("symbols.yaml")
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "concepts").mkdir(parents=True)
    for cid in concepts:
        (OUT / "concepts" / f"{cid}.md").write_text(render_concept(concepts, cid, symbols), encoding="utf-8")
    (OUT / "concepts" / "index.md").write_text("---\ntitle: Conceitos\n---\n\nTodos os conceitos da wiki. Para a ordem de estudo, veja o [[roadmap|Roadmap]].\n", encoding="utf-8")
    (OUT / "roadmap.md").write_text(render_roadmap(concepts), encoding="utf-8")
    (OUT / "index.md").write_text(render_index(concepts), encoding="utf-8")
    print(f"exported {len(concepts)} concepts to {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
