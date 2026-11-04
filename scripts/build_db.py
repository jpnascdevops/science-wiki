import sqlite3
import json
import sys

from wiki import ROOT, depth, load_all, load_map, load_yaml

DB = ROOT / "build" / "wiki.sqlite"

SCHEMA = """
create table modules (id text primary key, title text, position integer);
create table concepts (
  id text primary key, title text, module text references modules(id), depth integer,
  written integer, summary text, consensus text, area text, era text, review_status text, reviewer text
);
create table requires (concept text references concepts(id), prerequisite text references concepts(id));
create table trails (id text primary key, title text, summary text);
create table trail_targets (trail text references trails(id), concept text references concepts(id));
create table eras (id text primary key, title text, span text, position integer);
create table people (id text primary key, name text, era text references eras(id), wikidata text);
create table events (id text primary key, title text, era text references eras(id), date text, wikidata text);
create table event_concepts (event text references events(id), concept text references concepts(id));
create table superseded (id text primary key, title text, era text references eras(id), superseded_by text references concepts(id));
create table concept_people (concept text references concepts(id), person text references people(id));
create table claims (concept text references concepts(id), text text, type text, check_method text, status text, reviewed_by text,
  claim_id text, metadata_json text, primary key (concept, claim_id));
create table claim_sources (concept text, claim_text text, url text);
create table resources (concept text references concepts(id), kind text, title text, url text, level text, lang text, checked_at text);
create table equations (concept text references concepts(id), tex text, spoken text);
"""


def main() -> int:
    DB.parent.mkdir(exist_ok=True)
    if DB.exists():
        DB.unlink()
    nodes = load_map()
    concepts = load_all()
    d = depth(nodes)
    con = sqlite3.connect(DB)
    con.executescript(SCHEMA)
    for i, m in enumerate(load_yaml("map.yaml")["modules"]):
        con.execute("insert into modules values (?,?,?)", (m["id"], m["title"], i))
    for cid, n in nodes.items():
        c = concepts.get(cid)
        meta = c.meta if c else {}
        tags = meta.get("tags", {})
        review = meta.get("review", {})
        con.execute(
            "insert into concepts values (?,?,?,?,?,?,?,?,?,?,?)",
            (cid, n.title, n.module, d[cid], int(c is not None), meta.get("summary"), meta.get("consensus"),
             tags.get("area"), tags.get("era"), review.get("status"), review.get("reviewer")),
        )
        con.executemany("insert into requires values (?,?)", [(cid, p) for p in n.requires])
    for t in load_yaml("trails.yaml"):
        con.execute("insert into trails values (?,?,?)", (t["id"], t["title"], t["summary"]))
        con.executemany("insert into trail_targets values (?,?)", [(t["id"], x) for x in t["targets"]])
    for i, e in enumerate(load_yaml("history/eras.yaml")):
        con.execute("insert into eras values (?,?,?,?)", (e["id"], e["title"], e["span"], i))
    for p in load_yaml("history/people.yaml"):
        con.execute("insert into people values (?,?,?,?)", (p["id"], p["name"], p["era"], p.get("wikidata")))
    for e in load_yaml("history/events.yaml"):
        con.execute("insert into events values (?,?,?,?,?)", (e["id"], e["title"], e["era"], e.get("date"), e.get("wikidata")))
        con.executemany("insert into event_concepts values (?,?)", [(e["id"], c) for c in e.get("concepts", [])])
    for s in load_yaml("history/superseded.yaml"):
        con.execute("insert into superseded values (?,?,?,?)", (s["id"], s["title"], s["era"], s["superseded_by"]))
    for cid, c in concepts.items():
        m = c.meta
        con.executemany("insert into concept_people values (?,?)", [(cid, p) for p in m["tags"].get("people", [])])
        for cl in m.get("claims", []):
            con.execute("insert into claims values (?,?,?,?,?,?,?,?)", (cid, cl["text"], cl["type"], cl["check"], cl["status"], cl.get("reviewed_by"),
                        cl["id"], json.dumps(cl, ensure_ascii=False)))
            con.executemany("insert into claim_sources values (?,?,?)", [(cid, cl["text"], u) for u in cl.get("sources", [])])
        for r in m.get("resources", []):
            con.execute("insert into resources values (?,?,?,?,?,?,?)", (cid, r["kind"], r["title"], r.get("url"), r["level"], r["lang"], r.get("checked_at")))
        con.executemany("insert into equations values (?,?,?)", [(cid, e["tex"], e["spoken"]) for e in m.get("equations", [])])
    con.commit()
    total, written = con.execute("select count(*), sum(written) from concepts").fetchone()
    print(f"built {DB.relative_to(ROOT)}: {total} concepts, {written} written")
    con.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
