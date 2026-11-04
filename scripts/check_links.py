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
    if not isinstance(code, int) or code in (401, 403, 408, 429) or code >= 500:
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


def main() -> int:
    snapshot = snapshot_hash()
    urls = set()
    missing = []
    for cid, c in load_all().items():
        for resource in c.meta.get("resources", []):
            if resource.get("url"):
                urls.add(resource["url"])
            else:
                missing.append({"concept": cid, "outcome": "inconclusive", "detail": "resource missing URL: " + resource["title"]})
        for claim in c.meta.get("claims", []):
            urls.update(claim.get("sources", []))
    with ThreadPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(check_url, sorted(urls))) + missing
    save_results("links", rows, snapshot)
    for row in rows:
        print(f"{row['outcome']}: {row.get('url', row.get('concept'))}: {row['detail']}")
    return int(any(row["outcome"] != "passed" for row in rows))


if __name__ == "__main__":
    sys.exit(main())
