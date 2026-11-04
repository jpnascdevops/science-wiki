import math
import sys
from evidence import result_row, save_results, snapshot_hash
from formulas import FORMULAS
from wiki import load_all


def evaluate(claim):
    try:
        expected = claim["expected"]
        relative = claim.get("tolerance", 0.02)
        absolute = claim.get("absolute_tolerance", 0.0)
        if not all(math.isfinite(x) for x in (expected, relative, absolute)):
            raise ValueError("expected value and tolerances must be finite")
        if not 0 <= relative <= 0.1 or absolute < 0:
            raise ValueError("invalid tolerance")
        value = FORMULAS[claim["formula"]]()
        if not math.isfinite(value):
            raise ValueError("non-finite calculation")
        ok = abs(value - expected) <= max(absolute, relative * abs(expected))
        return ("passed" if ok else "failed"), f"computed {value:.10g}; expected {expected:g} {claim.get('unit', '')}"
    except (KeyError, ValueError, TypeError, ArithmeticError) as exc:
        return "failed", str(exc)


def main():
    snapshot = snapshot_hash()
    rows = []
    for cid, concept in load_all().items():
        for claim in concept.meta.get("claims", []):
            if claim["check"] != "compute":
                continue
            outcome, detail = evaluate(claim)
            rows.append(result_row(cid, claim, outcome, detail))
            print(f"{outcome}: {cid}/{claim['id']}: {detail}")
    save_results("numbers", rows, snapshot)
    failures = sum(row["outcome"] != "passed" for row in rows)
    print(f"{len(rows)} numeric claims, {failures} failures")
    return int(bool(failures))


if __name__ == "__main__":
    sys.exit(main())
