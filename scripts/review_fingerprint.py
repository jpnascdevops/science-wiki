"""Print fingerprints after a reviewer has inspected the evidence; does not approve claims."""
import argparse
import json
from evidence import claim_hash, content_hash
from wiki import load_all

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("concept")
parser.add_argument("claim")
args = parser.parse_args()
concept = load_all()[args.concept]
claim = next(c for c in concept.meta["claims"] if c["id"] == args.claim)
print(json.dumps({"claim_hash": claim_hash(claim), "content_hash": content_hash(concept)}, indent=2))
