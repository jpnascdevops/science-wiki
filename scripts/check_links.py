import sys
import time
from concurrent.futures import ThreadPoolExecutor
from evidence import save_results, snapshot_hash
import urllib.request

from wiki import load_all

HEADERS = {"User-Agent": "science-wiki-link-check"}


def status(url: str) -> int | str:
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as resp:
                return resp.status
        except urllib.error.HTTPError as e:
            if method == "GET" or e.code not in (403, 405):
                return e.code
        except Exception as e:
            if method == "GET":
                return e.__class__.__name__
    return "unknown"


def classify(code):
    if not isinstance(code, int) or code in (401, 403, 405, 408, 429) or code >= 500:
        return "inconclusive"
    return "passed" if code < 400 else "failed"


def check_url(url):
    for attempt in range(3):
        code = status(url)
        outcome = classify(code)
        if outcome != "inconclusive":
            break
        if attempt < 2:
            time.sleep(attempt + 1)
    return {"url": url, "outcome": outcome, "detail": str(code)}


def main(strict: bool = False) -> int:
    snapshot = snapshot_hash()
    roles: dict[str, set[str]] = {}
    missing = []
    for cid, c in load_all().items():
        for resource in c.meta.get("resources", []):
            if resource.get("url"):
                roles.setdefault(resource["url"], set()).add("resource")
            else:
                missing.append({"concept": cid, "role": "resource", "outcome": "inconclusive", "detail": "resource missing URL: " + resource["title"]})
        for claim in c.meta.get("claims", []):
            for url in claim.get("sources", []):
                roles.setdefault(url, set()).add("evidence")
    with ThreadPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(check_url, sorted(roles)))
    for row in rows:
        row["role"] = "evidence" if "evidence" in roles[row["url"]] else "resource"
    rows += missing
    save_results("links", rows, snapshot)
    for row in rows:
        if row["outcome"] != "passed":
            print(f"{row['outcome']} ({row['role']}): {row.get('url', row.get('concept'))}: {row['detail']}")
    for role in ("evidence", "resource"):
        group = [r for r in rows if r["role"] == role]
        count = {o: sum(r["outcome"] == o for r in group) for o in ("passed", "failed", "inconclusive")}
        print(f"{role}: {len(group)} links, {count['passed']} passed, {count['failed']} failed, {count['inconclusive']} inconclusive")
    if strict:
        return int(any(row["outcome"] != "passed" for row in rows))
    return 0


if __name__ == "__main__":
    sys.exit(main(strict="--strict" in sys.argv[1:]))
