import json
import sys

from jsonschema import Draft202012Validator

from wiki import ROOT, load_all, load_yaml, topo_order

REQUIRED_SECTIONS = ["## Intuição", "## Equação", "## Variáveis", "## Exemplo", "## Onde isso volta", "## Pergunta-ponte", "## Evite dizer"]


def main() -> int:
    schema = json.loads((ROOT / "schema" / "concept.schema.json").read_text())
    validator = Draft202012Validator(schema)
    vocab = load_yaml("tags.yaml")
    errors = []
    try:
        concepts = load_all()
    except ValueError as e:
        print(f"ERROR {e}")
        return 1

    for cid, c in concepts.items():
        where = c.path.name
        if c.path.stem != cid:
            errors.append(f"{where}: file name must match id '{cid}'")
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
        for ref in c.meta.get("prerequisites", []) + c.meta.get("leads_to", []):
            if ref not in concepts:
                errors.append(f"{where}: unknown concept '{ref}'")
        for section in REQUIRED_SECTIONS:
            if section not in c.body:
                errors.append(f"{where}: missing section '{section}'")
        for claim in c.meta.get("claims", []):
            if claim["status"] == "verified" and claim["check"] in ("source", "verifier", "human") and not claim.get("sources"):
                errors.append(f"{where}: verified claim without sources: {claim['text'][:60]}")
            if claim["check"] == "compute" and not claim.get("formula"):
                errors.append(f"{where}: compute claim without formula: {claim['text'][:60]}")
            if claim["check"] == "arxiv" and not claim.get("arxiv"):
                errors.append(f"{where}: arxiv claim without id: {claim['text'][:60]}")
        if c.meta.get("levels") and "technical" in c.meta["levels"] and "## Nível técnico" not in c.body:
            errors.append(f"{where}: level 'technical' declared but no '## Nível técnico' section")

    for cid, c in concepts.items():
        derived = {k for k, o in concepts.items() if cid in o.meta.get("prerequisites", [])}
        declared = set(c.meta.get("leads_to", []))
        if declared != derived:
            errors.append(f"{c.path.name}: leads_to {sorted(declared)} differs from concepts that require it {sorted(derived)}")

    try:
        topo_order(concepts)
    except ValueError as e:
        errors.append(str(e))

    for e in errors:
        print(f"ERROR {e}")
    print(f"{len(concepts)} concepts, {len(errors)} errors")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
