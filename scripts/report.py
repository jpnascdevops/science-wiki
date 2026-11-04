import sys
import json
import re
from datetime import date, datetime, timezone
from collections import Counter
from evidence import evidence_errors, snapshot_hash

from wiki import ROOT, load_all


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
            if claim["status"] in ("pending", "wrong", "disputed"):
                pending.append((cid, claim["check"], claim["text"]))
    resources = [r for c in concepts.values() for r in c.meta.get("resources", [])]
    unchecked = [r for r in resources if not r.get("checked_at")]

    print("# Relatório de checagem\n")
    print(f"Conceitos: {len(concepts)} | revisão: {dict(review)}\n")
    print("| Status | Afirmações |\n| --- | --- |")
    for s in ("verified", "calculated", "reference_checked", "pending", "disputed", "wrong"):
        print(f"| {s} | {by_status.get(s, 0)} |")
    print("\n| Tipo | verified | calculated | reference_checked | pending | disputed | wrong |\n| --- | --- | --- | --- | --- | --- | --- |")
    for t in ("number", "date", "attribution", "definition", "conceptual", "reference"):
        row = [by_type.get((t, s), 0) for s in ("verified", "calculated", "reference_checked", "pending", "disputed", "wrong")]
        if any(row):
            print(f"| {t} | " + " | ".join(map(str, row)) + " |")
    print(f"\nMateriais: {len(resources)} | sem checagem: {len(unchecked)}\n")
    print("## Pendentes\n")
    for cid, check, text in pending:
        print(f"- [{cid}] ({check}) {text}")
    print("\n## Evidência e cobertura editorial\n")
    print("Status acima são declarados no conteúdo; resultados de execução aparecem separadamente abaixo.\n")
    for cid, concept in concepts.items():
        covered = set()
        for claim in concept.meta.get("claims", []):
            problems = evidence_errors(claim, concept)
            if claim["status"] == "verified" and not problems:
                covered.update(claim.get("covers", []))
            if claim["check"] in ("source", "human", "verifier") and problems:
                print(f"- {cid}/{claim['id']}: evidência incompleta ({'; '.join(problems)})")
            checked = claim.get("evidence", {}).get("checked_at")
            if checked:
                try:
                    if (date.today() - date.fromisoformat(checked)).days > 365:
                        print(f"- {cid}/{claim['id']}: revisão há mais de 365 dias; avaliar atualização")
                except ValueError:
                    pass
        missing = {'definition', 'equation', 'recap'} - covered
        if missing:
            print(f"- {cid}: sem cobertura revisada de {', '.join(sorted(missing))}")
        labs = re.findall(r'```lab\s*\n([^\n]+)', concept.body)
        if labs:
            print(f"- {cid}: laboratórios ({', '.join(labs)}); a checagem numérica Python não certifica estas simulações")
    print("\n## Resultados de execução\n")
    snapshot = snapshot_hash()
    for name in ("numbers", "arxiv", "links"):
        path = ROOT / "build" / "checks" / f"{name}.json"
        if not path.exists():
            print(f"- {name}: não executado")
            continue
        result = json.loads(path.read_text(encoding="utf-8"))
        age = datetime.now(timezone.utc) - datetime.fromisoformat(result["checked_at"])
        if result["snapshot"] != snapshot or age.total_seconds() > 86400:
            print(f"- {name}: resultado antigo ou conteúdo alterado; executar novamente")
            continue
        print(f"- {name} ({result['checked_at']}): {dict(Counter(row['outcome'] for row in result['results']))}")
        for row in result['results']:
            if row['outcome'] != 'passed':
                role = f" ({row['role']})" if row.get('role') else ""
                print(f"  - {row.get('concept', row.get('url', ''))}{role}: {row['outcome']} — {row['detail']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
