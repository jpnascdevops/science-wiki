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


def fetch_titles(ids: list[str]) -> dict[str, str | None]:
    req = urllib.request.Request(API.format(",".join(ids)) + f"&max_results={len(ids)}", headers={"User-Agent": "science-wiki-reference-check"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        root = ET.fromstring(resp.read())
    found: dict[str, str | None] = {i: None for i in ids}
    for entry in root.findall(f"{ATOM}entry"):
        url = entry.findtext(f"{ATOM}id") or ""
        title = entry.findtext(f"{ATOM}title")
        aid = re.sub(r"v\d+$", "", url.split("/abs/")[-1])
        if aid in found and title and title.strip() != "Error":
            found[aid] = " ".join(title.split())
    return found


def main(strict: bool = False) -> int:
    snapshot = snapshot_hash()
    claims = [(cid, claim) for cid, c in load_all().items() for claim in c.meta.get("claims", []) if claim["check"] == "arxiv"]
    ids = sorted({claim["arxiv"] for _, claim in claims})
    seen: dict[str, str | None] = {}
    for attempt in range(4):
        try:
            seen = fetch_titles(ids) if ids else {}
            break
        except Exception:
            seen = {i: "__unreachable__" for i in ids}
            if attempt < 3:
                time.sleep(10 * (attempt + 1))
    rows = []
    for cid, claim in claims:
        aid = claim["arxiv"]
        title = seen.get(aid)
        if title == "__unreachable__":
            outcome = "inconclusive"
        else:
            outcome = "passed" if title and normalize(claim.get("expected_title", "")) == normalize(title) else "failed"
        detail = f"{aid}: {title!r}; title matching only, not scientific support"
        rows.append(result_row(cid, claim, outcome, detail))
        print(f"{outcome}: {cid}: {detail}")
    save_results("arxiv", rows, snapshot)
    bad = {"failed", "inconclusive"} if strict else {"failed"}
    return int(any(row["outcome"] in bad for row in rows))


if __name__ == "__main__":
    sys.exit(main(strict="--strict" in sys.argv[1:]))
