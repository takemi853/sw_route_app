import assert from "node:assert/strict";
import test from "node:test";

import { works } from "../lib/data/works";
import {
  acceptancePersonas,
  recommendationCandidates,
} from "../lib/recommendation/fixtures";
import {
  rankRecommendations,
  recommendNext,
} from "../lib/recommendation/recommend";
import type {
  RecommendationCandidate,
  RecommendationInput,
} from "../lib/recommendation/types";

test("固定候補は既存作品データだけを参照する", () => {
  const workIds = new Set(works.map((work) => work.id));
  const candidateIds = recommendationCandidates.map((candidate) => candidate.id);

  assert.equal(new Set(candidateIds).size, candidateIds.length);
  assert.equal(
    recommendationCandidates.every(
      (candidate) =>
        workIds.has(candidate.workId) &&
        candidate.minutes > 0 &&
        candidate.attentionPoints.some((point) => point.spoilerLevel === 0),
    ),
    true,
  );
});

test("完全未履修者には60分以内の独立した入口を一つ返す", () => {
  const result = recommendNext(acceptancePersonas.newcomer, recommendationCandidates);

  assert.equal(result?.candidate.id, "mandalorian-s1e1");
  assert.ok(result.candidate.minutes <= 60);
});

test("途中離脱者には既視聴作品ではない映画を返す", () => {
  const result = recommendNext(acceptancePersonas.lapsed, recommendationCandidates);

  assert.equal(result?.candidate.id, "rogue-one-film");
  assert.equal(result.candidate.format, "film");
  assert.equal(result.candidate.workId === "ep4", false);
});

test("部分的ファンには既視聴範囲とつながる2話を返す", () => {
  const result = recommendNext(acceptancePersonas.partial_fan, recommendationCandidates);

  assert.equal(result?.candidate.id, "rebels-mandalore-bridge");
  assert.equal(result.candidate.unitLabel, "マンダロア関連 2話");
});

test("視聴済み候補を除外する", () => {
  const input: RecommendationInput = {
    ...acceptancePersonas.newcomer,
    seenWorks: ["mandalorian_s1"],
  };

  const results = rankRecommendations(input, recommendationCandidates);

  assert.equal(results.some((result) => result.candidate.id === "mandalorian-s1e1"), false);
});

test("時間上限を超える候補を除外する", () => {
  const input: RecommendationInput = {
    ...acceptancePersonas.newcomer,
    timeBudget: { kind: "minutes", minutes: 20 },
  };

  const results = rankRecommendations(input, recommendationCandidates);

  assert.deepEqual(results.map((result) => result.candidate.id), ["tales-of-jedi-s1e1"]);
});

test("アニメ不可ならアニメ候補を除外する", () => {
  const input: RecommendationInput = {
    ...acceptancePersonas.partial_fan,
    animationAllowed: false,
  };

  const results = rankRecommendations(input, recommendationCandidates);

  assert.equal(results.some((result) => result.candidate.animated), false);
  assert.equal(results[0]?.candidate.id, "boba-fett-s1e1");
});

test("許容度を超えるネタバレ理由と注目点を返さない", () => {
  const input: RecommendationInput = {
    ...acceptancePersonas.partial_fan,
    spoilerTolerance: 0,
  };

  const result = recommendNext(input, recommendationCandidates);

  assert.equal(result?.candidate.id, "rebels-mandalore-bridge");
  assert.equal(result.reasons.some((reason) => reason.includes("歴史的背景")), false);
  assert.equal(result.attentionPoint, "人物が受け継ぐ文化と葛藤に注目");
});

test("同点時は編集者優先度、最後にIDで順序を固定する", () => {
  const base: RecommendationCandidate = {
    ...recommendationCandidates[0],
    id: "candidate-b",
    editorialPriority: 1,
    interests: [],
    personaPriority: {},
  };
  const candidates: RecommendationCandidate[] = [
    base,
    { ...base, id: "candidate-c", editorialPriority: 2 },
    { ...base, id: "candidate-a", editorialPriority: 2 },
  ];
  const input: RecommendationInput = {
    ...acceptancePersonas.newcomer,
    interests: [],
  };

  const results = rankRecommendations(input, candidates);

  assert.deepEqual(results.map((result) => result.candidate.id), [
    "candidate-a",
    "candidate-c",
    "candidate-b",
  ]);
});

test("興味軸が3つ以上なら推薦を開始しない", () => {
  const input: RecommendationInput = {
    ...acceptancePersonas.newcomer,
    interests: ["family", "human_drama", "character"],
  };

  assert.throws(
    () => recommendNext(input, recommendationCandidates),
    /興味軸は最大2つまで/,
  );
});
