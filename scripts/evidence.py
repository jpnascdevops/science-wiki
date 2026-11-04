"""Review evidence and reproducible machine-check results."""
import hashlib
import json
from datetime import date, datetime, timezone
from urllib.parse import urlparse
from wiki import ROOT


def claim_hash(claim):
    payload = {k: v for k, v in claim.items() if k not in ("evidence", "status", "reviewed_by", "note")}
    return hashlib.sha256(json.dumps(payload, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def content_hash(concept):
    payload = {key: concept.meta.get(key) for key in ("summary", "recap", "equations")}
    payload["body"] = concept.body
    return hashlib.sha256(json.dumps(payload, sort_keys=True, ensure_ascii=False).encode()).hexdigest()


def evidence_errors(claim, concept=None):
    evidence = claim.get("evidence", {})
    errors = []
    if not claim.get("reviewed_by"):
        errors.append("missing reviewer")
    for key in ("source", "locator", "support", "checked_at", "claim_hash"):
        if not evidence.get(key):
            errors.append(f"missing evidence.{key}")
    if evidence.get("source") not in claim.get("sources", []):
        errors.append("evidence source must appear in sources")
    if evidence.get("claim_hash") != claim_hash(claim):
        errors.append("review does not match current claim")
    if concept is not None and evidence.get("content_hash") != content_hash(concept):
        errors.append("review does not match current page content")
    try:
        if date.fromisoformat(evidence.get("checked_at", "")) > date.today():
            errors.append("review date is in the future")
    except (ValueError, TypeError):
        errors.append("invalid review date")
    return errors


def valid_url(url):
    parsed = urlparse(url)
    return parsed.scheme in ("https", "http") and bool(parsed.netloc)


def snapshot_hash():
    digest = hashlib.sha256()
    for folder in ("content", "scripts", "schema", "data", "site/overrides"):
        for path in sorted((ROOT / folder).rglob("*")):
            if path.is_file() and "__pycache__" not in path.parts:
                digest.update(path.relative_to(ROOT).as_posix().encode())
                digest.update(path.read_bytes())
    return digest.hexdigest()


def save_results(check, rows, snapshot=None):
    folder = ROOT / "build" / "checks"
    folder.mkdir(parents=True, exist_ok=True)
    result = {"check": check, "checked_at": datetime.now(timezone.utc).isoformat(),
              "snapshot": snapshot if snapshot is not None else snapshot_hash(), "results": rows}
    (folder / f"{check}.json").write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")


def result_row(cid, claim, outcome, detail):
    return {"concept": cid, "claim": claim["id"], "claim_hash": claim_hash(claim),
            "outcome": outcome, "detail": detail}

