import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET

from wiki import load_all

API = "http://export.arxiv.org/api/query?id_list={}"
ATOM = "{http://www.w3.org/2005/Atom}"


def normalize(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def fetch_title(arxiv_id: str) -> str | None:
    with urllib.request.urlopen(API.format(arxiv_id), timeout=20) as resp:
        root = ET.fromstring(resp.read())
    entry = root.find(f"{ATOM}entry")
    if entry is None:
        return None
    title = entry.findtext(f"{ATOM}title")
    if not title or title.strip() == "Error":
        return None
    return " ".join(title.split())


def main() -> int:
    failures = 0
    unreachable = 0
    seen = {}
    for cid, c in load_all().items():
        for claim in c.meta.get("claims", []):
            if claim["check"] != "arxiv":
                continue
            aid = claim["arxiv"]
            if aid not in seen:
                try:
                    seen[aid] = fetch_title(aid)
                    time.sleep(3)
                except Exception as e:
                    print(f"SKIP {cid}: {aid} unreachable ({e.__class__.__name__})")
                    unreachable += 1
                    seen[aid] = "__unreachable__"
                    continue
            title = seen[aid]
            if title == "__unreachable__":
                continue
            expected = claim.get("expected_title", "")
            ok = title is not None and normalize(expected) == normalize(title)
            if not ok:
                failures += 1
            print(f"{'ok  ' if ok else 'FAIL'} {cid}: {aid} -> {title!r}")
    print(f"{len(seen)} arXiv ids, {failures} failures, {unreachable} unreachable")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
