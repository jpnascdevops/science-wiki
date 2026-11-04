import copy
import json
import sys
import unittest
from datetime import date
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from check_numbers import evaluate
from check_links import classify
from formulas import action_perturbed
import math
import check_arxiv
import check_links
from evidence import claim_hash, content_hash, evidence_errors
from wiki import load_all
from jsonschema import Draft202012Validator


class VerificationTests(unittest.TestCase):
    def test_action_against_independent_analytic_solution(self):
        cases = json.loads(Path(__file__).with_name("action-cases.json").read_text())
        for case in cases:
            amplitude = case["amplitude"]
            actual = action_perturbed(amplitude) - action_perturbed(0)
            expected = amplitude ** 2 * math.pi ** 2 / 8
            self.assertAlmostEqual(expected, case["delta_action"], places=14)
            self.assertAlmostEqual(actual, expected, places=6)

    def test_arxiv_outage_fails_and_records_inconclusive(self):
        with patch.object(check_arxiv, "fetch_title", side_effect=OSError("offline")), \
             patch.object(check_arxiv.time, "sleep"), \
             patch.object(check_arxiv, "save_results") as save, \
             patch("builtins.print"):
            self.assertEqual(check_arxiv.main(), 1)
            self.assertTrue(save.call_args.args[1])
            self.assertTrue(all(row["outcome"] == "inconclusive" for row in save.call_args.args[1]))

    def test_claim_sources_are_checked(self):
        with patch.object(check_links, "check_url", side_effect=lambda url: dict(url=url, outcome="passed", detail="200")) as check, \
             patch.object(check_links, "save_results"), patch("builtins.print"):
            check_links.main()
        checked = {call.args[0] for call in check.call_args_list}
        sources = {url for concept in load_all().values() for claim in concept.meta["claims"] for url in claim.get("sources", [])}
        self.assertTrue(sources <= checked)

    def test_zero_and_absolute_tolerance(self):
        with patch.dict("check_numbers.FORMULAS", zero=lambda: 0.0, tiny=lambda: 1e-9):
            self.assertEqual(evaluate(dict(formula="zero", expected=0))[0], "passed")
            self.assertEqual(evaluate(dict(formula="tiny", expected=0))[0], "failed")
            self.assertEqual(evaluate(dict(formula="tiny", expected=0, absolute_tolerance=1e-8))[0], "passed")

    def test_bad_numeric_input(self):
        for change in ({"expected": float("nan")}, {"tolerance": -1}, {"tolerance": 1},
                       {"absolute_tolerance": float("inf")}, {"formula": "missing"}):
            self.assertEqual(evaluate(dict(formula="cart_force_newton", expected=20, **{}) | change)[0], "failed")
        with patch.dict("check_numbers.FORMULAS", bad=lambda: float("inf")):
            self.assertEqual(evaluate(dict(formula="bad", expected=20))[0], "failed")

    def test_network_outcomes(self):
        for code in (403, 429, 503, "TimeoutError"):
            self.assertEqual(classify(code), "inconclusive")
        self.assertEqual(classify(404), "failed")
        self.assertEqual(classify(200), "passed")

    def test_review_invalidated_by_edits(self):
        concept = copy.deepcopy(next(iter(load_all().values())))
        claim = dict(id="test", text="A claim", check="source", type="conceptual", status="verified",
                     sources=["https://example.org/paper"], reviewed_by="joao-pedro")
        claim["evidence"] = dict(source=claim["sources"][0], locator="Section 2", support="Explanation",
                                 checked_at=date.today().isoformat(), claim_hash=claim_hash(claim),
                                 content_hash=content_hash(concept))
        self.assertEqual(evidence_errors(claim, concept), [])
        concept.body += " Changed explanation."
        self.assertIn("review does not match current page content", evidence_errors(claim, concept))
        claim["text"] = "Different claim"
        self.assertIn("review does not match current claim", evidence_errors(claim, concept))

    def test_missing_evidence_rejected(self):
        self.assertTrue(evidence_errors(dict(id="test", text="Claim", sources=["https://example.org"])))

    def test_schema_and_ids(self):
        root = Path(__file__).resolve().parents[1]
        validator = Draft202012Validator(json.loads((root / "schema/concept.schema.json").read_text()))
        for concept in load_all().values():
            self.assertEqual(list(validator.iter_errors(concept.meta)), [])
            ids = [c["id"] for c in concept.meta["claims"]]
            self.assertEqual(len(ids), len(set(ids)))


if __name__ == "__main__":
    unittest.main()
