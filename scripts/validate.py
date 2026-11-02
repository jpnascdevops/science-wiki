import json
import sys

from jsonschema import Draft202012Validator

from wiki import ROOT, load_all, load_map, load_yaml, topo_order

REQUIRED_SECTIONS = ["## Intuição", "## Equação", "## Variáveis", "## Exemplo", "## Onde isso volta", "## Pergunta-ponte", "## Evite dizer"]


def check_history(errors, concept_ids, map_ids):
    eras = {e["id"] for e in load_yaml("history/eras.yaml")}
    people = load_yaml("history/people.yaml")
    events = load_yaml("history/events.yaml")
    superseded = load_yaml("history/superseded.yaml")
    for group, items in (("people", people), ("events", events), ("superseded", superseded)):
        seen = set()
        for x in items:
            if x["id"] in seen:
                errors.append(f"history/{group}: duplicate id {x['id']}")
            seen.add(x["id"])
            if x.get("era") not in eras:
                errors.append(f"history/{group}: {x['id']} has unknown era {x.get('era')}")
    for e in events:
        for c in e.get("concepts", []):
            if c not in map_ids:
                errors.append(f"history/events: {e['id']} links unknown concept {c}")
    for t in superseded:
        if t["superseded_by"] not in map_ids:
            errors.append(f"history/superseded: {t['id']} points to unknown concept {t['superseded_by']}")
    return eras, {p["id"] for p in people}, {e["id"] for e in events}


def main() -> int:
    schema = json.loads((ROOT / "schema" / "concept.schema.json").read_text())
    validator = Draft202012Validator(schema)
    vocab = load_yaml("tags.yaml")
    reviewers = {r["id"] for r in load_yaml("reviewers.yaml")}
    errors = []
    try:
        concepts = load_all()
        nodes = load_map()
        topo_order(nodes)
    except ValueError as e:
        print(f"ERROR {e}")
        return 1

    for cid, n in nodes.items():
        for pre in n.requires:
            if pre not in nodes:
                errors.append(f"map: {cid} requires unknown concept {pre}")

    for t in load_yaml("trails.yaml"):
        for target in t["targets"]:
            if target not in nodes:
                errors.append(f"trails: {t['id']} targets unknown concept {target}")

    eras, people, events = check_history(errors, set(concepts), set(nodes))

    for cid, c in concepts.items():
        where = c.path.name
        if c.path.stem != cid:
            errors.append(f"{where}: file name must match id '{cid}'")
        if cid not in nodes:
            errors.append(f"{where}: concept is not in data/map.yaml")
        elif nodes[cid].title != c.meta.get("title"):
            errors.append(f"{where}: title differs from data/map.yaml ('{nodes[cid].title}')")
        for err in validator.iter_errors(c.meta):
            path = "/".join(str(p) for p in err.absolute_path)
            errors.append(f"{where}: {path or '<root>'}: {err.message}")
        tags = c.meta.get("tags", {})
        if tags.get("area") not in vocab["areas"]:
            errors.append(f"{where}: area '{tags.get('area')}' not in data/tags.yaml")
        for t in tags.get("topics", []):
            if t not in vocab["topics"]:
                errors.append(f"{where}: topic '{t}' not in data/tags.yaml")
        cat = tags.get("arxiv_category")
        if cat and cat not in vocab["arxiv_categories"]:
            errors.append(f"{where}: arxiv_category '{cat}' not in data/tags.yaml")
        if tags.get("era") and tags["era"] not in eras:
            errors.append(f"{where}: era '{tags['era']}' not in data/history/eras.yaml")
        for p in tags.get("people", []):
            if p not in people:
                errors.append(f"{where}: person '{p}' not in data/history/people.yaml")
        for e in tags.get("events", []):
            if e not in events:
                errors.append(f"{where}: event '{e}' not in data/history/events.yaml")
        for section in REQUIRED_SECTIONS:
            if section not in c.body:
                errors.append(f"{where}: missing section '{section}'")
        reviewer = c.meta.get("review", {}).get("reviewer")
        if reviewer and reviewer not in reviewers:
            errors.append(f"{where}: reviewer '{reviewer}' not in data/reviewers.yaml")
        if c.meta.get("review", {}).get("status") == "human_reviewed" and not reviewer:
            errors.append(f"{where}: human_reviewed needs a reviewer")
        for claim in c.meta.get("claims", []):
            if claim.get("reviewed_by") and claim["reviewed_by"] not in reviewers:
                errors.append(f"{where}: claim reviewer '{claim['reviewed_by']}' not in data/reviewers.yaml")
            if claim["status"] == "verified" and claim["check"] in ("source", "verifier", "human") and not claim.get("sources"):
                errors.append(f"{where}: verified claim without sources: {claim['text'][:60]}")
            if claim["check"] == "compute" and not claim.get("formula"):
                errors.append(f"{where}: compute claim without formula: {claim['text'][:60]}")
            if claim["check"] == "arxiv" and not claim.get("arxiv"):
                errors.append(f"{where}: arxiv claim without id: {claim['text'][:60]}")
        if "technical" in c.meta.get("levels", []) and "## Nível técnico" not in c.body:
            errors.append(f"{where}: level 'technical' declared but no '## Nível técnico' section")

    for e in errors:
        print(f"ERROR {e}")
    print(f"{len(nodes)} concepts in map, {len(concepts)} written, {len(errors)} errors")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
