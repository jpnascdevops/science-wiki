import sys
from collections import Counter

from wiki import load_all


def main() -> int:
    concepts = load_all()
    by_status = Counter()
    by_type = Counter()
    review = Counter()
    pending = []
    for cid, c in concepts.items():
        review[c.meta["review"]["status"]] += 1
        for claim in c.meta.get("claims", []):
            by_status[claim["status"]] += 1
            by_type[(claim["type"], claim["status"])] += 1
            if claim["status"] != "verified":
                pending.append((cid, claim["check"], claim["text"]))
    resources = [r for c in concepts.values() for r in c.meta.get("resources", [])]
    unchecked = [r for r in resources if not r.get("checked_at")]

    print("# Relatório de checagem\n")
    print(f"Conceitos: {len(concepts)} | revisão: {dict(review)}\n")
    print("| Status | Afirmações |\n| --- | --- |")
    for s in ("verified", "pending", "disputed", "wrong"):
        print(f"| {s} | {by_status.get(s, 0)} |")
    print("\n| Tipo | verified | pending | disputed | wrong |\n| --- | --- | --- | --- | --- |")
    for t in ("number", "date", "attribution", "definition", "conceptual", "reference"):
        row = [by_type.get((t, s), 0) for s in ("verified", "pending", "disputed", "wrong")]
        if any(row):
            print(f"| {t} | " + " | ".join(map(str, row)) + " |")
    print(f"\nMateriais: {len(resources)} | sem checagem: {len(unchecked)}\n")
    print("## Pendentes\n")
    for cid, check, text in pending:
        print(f"- [{cid}] ({check}) {text}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
