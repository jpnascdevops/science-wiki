import sys

from formulas import FORMULAS
from wiki import load_all


def main() -> int:
    failures = 0
    checked = 0
    for cid, c in load_all().items():
        for claim in c.meta.get("claims", []):
            if claim["check"] != "compute":
                continue
            name = claim.get("formula")
            if name not in FORMULAS:
                print(f"FAIL {cid}: unknown formula '{name}'")
                failures += 1
                continue
            value = FORMULAS[name]()
            expected = claim.get("expected")
            tol = claim.get("tolerance", 0.02)
            checked += 1
            if expected is None:
                print(f"FAIL {cid}: {name} has no expected value (computed {value:.6g})")
                failures += 1
                continue
            rel = abs(value - expected) / abs(expected)
            ok = rel <= tol
            if not ok:
                failures += 1
            if ok and claim["status"] != "verified":
                print(f"NOTE {cid}: {name} passes but status is '{claim['status']}'")
            if not ok and claim["status"] == "verified":
                print(f"FAIL {cid}: {name} marked verified but differs")
            print(f"{'ok  ' if ok else 'FAIL'} {cid}: {name} = {value:.6g} (expected {expected:g} {claim.get('unit', '')}, rel diff {rel:.2%})")
    print(f"{checked} numeric claims, {failures} failures")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
