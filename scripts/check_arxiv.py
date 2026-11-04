from evidence import result_row, save_results, snapshot_hash
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET

from wiki import load_all

API = "https://export.arxiv.org/api/query?id_list={}"
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
    snapshot = snapshot_hash()
    rows = []
    seen = {}
    for cid, c in load_all().items():
        for claim in c.meta.get("claims", []):
            if claim["check"] != "arxiv":
                continue
            aid = claim["arxiv"]
            if aid not in seen:
                for attempt in range(3):
                    try:
                        seen[aid] = fetch_title(aid)
                        time.sleep(3)
                        break
                    except Exception as exc:
                        seen[aid] = "__unreachable__"
                        time.sleep(3 * (attempt + 1))
            title = seen[aid]
            if title == "__unreachable__":
                outcome = "inconclusive"
            else:
                outcome = "passed" if title and normalize(claim.get("expected_title", "")) == normalize(title) else "failed"
            detail = f"{aid}: {title!r}; title matching only, not scientific support"
            rows.append(result_row(cid, claim, outcome, detail))
            print(f"{outcome}: {cid}: {detail}")
    save_results("arxiv", rows, snapshot)
    return int(any(row["outcome"] != "passed" for row in rows))


if __name__ == "__main__":
    sys.exit(main())
