import sqlite3
import sys

from build_db import DB, main as build
from wiki import ancestors, load_map, load_yaml


def main() -> int:
    build()
    con = sqlite3.connect(DB)
    print("# Cobertura\n")
    print("| Módulo | Escritos | Planejados | % |\n| --- | --- | --- | --- |")
    rows = con.execute(
        "select m.title, sum(c.written), count(*) from modules m join concepts c on c.module = m.id group by m.id order by m.position"
    ).fetchall()
    for title, w, n in rows:
        print(f"| {title} | {w} | {n - w} | {round(100 * w / n)}% |")
    w, n = con.execute("select sum(written), count(*) from concepts").fetchone()
    print(f"| **Total** | **{w}** | **{n - w}** | **{round(100 * w / n)}%** |\n")

    nodes = load_map()
    written = {r[0] for r in con.execute("select id from concepts where written = 1")}
    print("| Trilha | Conceitos | Escritos | Próximos a escrever |\n| --- | --- | --- | --- |")
    for t in load_yaml("trails.yaml"):
        ids = ancestors(nodes, t["targets"])
        ready = sorted(c for c in ids - written if all(p in written for p in nodes[c].requires))
        print(f"| {t['title']} | {len(ids)} | {len(ids & written)} | {', '.join(ready[:4]) or '-'} |")

    frontier = sorted(c for c, n in nodes.items() if c not in written and all(p in written for p in n.requires))
    print(f"\nProntos para escrever agora (todos os pré-requisitos escritos): {len(frontier)}\n")
    for c in frontier:
        print(f"- {c}: {nodes[c].title}")
    con.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
