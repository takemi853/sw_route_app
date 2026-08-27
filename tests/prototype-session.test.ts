import assert from "node:assert/strict";
import test from "node:test";

import {
  recommendationCandidates,
} from "../lib/recommendation/fixtures";
import { recommendNext } from "../lib/recommendation/recommend";
import {
  diagnosisPresets,
  inferPersona,
  recommendAlternative,
  toRecommendationInput,
} from "../lib/prototype/session";

test("視聴歴から3ペルソナを固定判定する", () => {
  assert.equal(inferPersona([]), "newcomer");
  assert.equal(inferPersona(["ep4"]), "lapsed");
  assert.equal(
    inferPersona(["mandalorian_s1", "mandalorian_s2"]),
    "partial_fan",
  );
});

test("診断presetを推薦inputへ変換する", () => {
  const newcomer = toRecommendationInput(diagnosisPresets.newcomer);
  const lapsed = toRecommendationInput(diagnosisPresets.lapsed);

  assert.deepEqual(newcomer.timeBudget, { kind: "minutes", minutes: 60 });
  assert.deepEqual(lapsed.timeBudget, { kind: "one_film" });
  assert.equal(lapsed.animationAllowed, false);
});

test("提案が今は違う場合は現在候補を除外して別入口へ進む", () => {
  const input = toRecommendationInput(diagnosisPresets.partial_fan);
  const current = recommendNext(input, recommendationCandidates);

  assert.ok(current);
  const next = recommendAlternative(
    input,
    current,
    recommendationCandidates,
    "lore",
  );

  assert.notEqual(next?.candidate.id, current.candidate.id);
  assert.equal(next?.matchedInterests.includes("lore"), true);
});
