import sys
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


def main() -> int:
    seen = {}
    broken = 0
    missing = 0
    unreachable = 0
    for cid, c in load_all().items():
        for r in c.meta.get("resources", []):
            url = r.get("url")
            if not url:
                missing += 1
                print(f"TODO {cid}: no url for '{r['title']}'")
                continue
            if url not in seen:
                seen[url] = status(url)
            code = seen[url]
            if not isinstance(code, int):
                unreachable += 1
                print(f"SKIP {cid}: {code} {url}")
                continue
            ok = code < 400
            if not ok:
                broken += 1
            print(f"{'ok  ' if ok else 'FAIL'} {cid}: {code} {url}")
    print(f"{len(seen)} unique links, {broken} broken, {unreachable} unreachable, {missing} without url")
    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
