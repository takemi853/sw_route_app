import type {
  Interest,
  Recommendation,
  RecommendationCandidate,
  RecommendationInput,
} from "./types";

const INTEREST_LABELS: Readonly<Record<Interest, string>> = {
  family: "家族",
  human_drama: "人間ドラマ",
  politics: "政治",
  character: "キャラクター",
  lore: "世界観",
};

function fitsTimeBudget(
  candidate: RecommendationCandidate,
  input: RecommendationInput,
): boolean {
  if (input.timeBudget.kind === "one_film") {
    return candidate.format === "film" && candidate.minutes <= 180;
  }
  return candidate.minutes <= input.timeBudget.minutes;
}

function isSeen(
  candidate: RecommendationCandidate,
  seenWorks: readonly string[],
): boolean {
  return candidate.seenAliases.some((alias) => seenWorks.includes(alias));
}

function matchedInterests(
  candidate: RecommendationCandidate,
  interests: readonly Interest[],
): Interest[] {
  return interests.filter((interest) => candidate.interests.includes(interest));
}

function safeAttentionPoint(
  candidate: RecommendationCandidate,
  input: RecommendationInput,
): string {
  const safePoints = candidate.attentionPoints
    .filter((point) => point.spoilerLevel <= input.spoilerTolerance)
    .sort((a, b) => b.spoilerLevel - a.spoilerLevel);

  return safePoints[0]?.text ?? "作品の雰囲気と人物の選択に注目";
}

function toRecommendation(
  candidate: RecommendationCandidate,
  input: RecommendationInput,
): Recommendation {
  const interests = matchedInterests(candidate, input.interests);
  const personaScore = candidate.personaPriority[input.persona] ?? 0;
  const reasons = [
    interests.length > 0
      ? `興味のある「${interests.map((interest) => INTEREST_LABELS[interest]).join("・")}」に合います`
      : null,
    ...candidate.reasonPoints
      .filter((point) => point.spoilerLevel <= input.spoilerTolerance)
      .map((point) => point.text),
  ].filter((reason): reason is string => reason !== null);

  return {
    candidate,
    score: interests.length * 100 + personaScore * 10,
    matchedInterests: interests,
    reasons,
    attentionPoint: safeAttentionPoint(candidate, input),
  };
}

export function rankRecommendations(
  input: RecommendationInput,
  candidates: readonly RecommendationCandidate[],
): Recommendation[] {
  if (input.interests.length > 2) {
    throw new RangeError("興味軸は最大2つまでです");
  }
  if (input.timeBudget.kind === "minutes" && input.timeBudget.minutes <= 0) {
    throw new RangeError("視聴時間は1分以上にしてください");
  }

  return candidates
    .filter((candidate) => !isSeen(candidate, input.seenWorks))
    .filter((candidate) => fitsTimeBudget(candidate, input))
    .filter((candidate) => input.animationAllowed || !candidate.animated)
    .map((candidate) => toRecommendation(candidate, input))
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.editorialPriority - a.candidate.editorialPriority ||
        a.candidate.id.localeCompare(b.candidate.id),
    );
}

export function recommendNext(
  input: RecommendationInput,
  candidates: readonly RecommendationCandidate[],
): Recommendation | null {
  return rankRecommendations(input, candidates)[0] ?? null;
}
