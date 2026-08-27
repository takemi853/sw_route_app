import type { SpoilerLevel } from "../types";
import type {
  Interest,
  Recommendation,
  RecommendationCandidate,
  RecommendationInput,
} from "../recommendation/types";
import { recommendNext } from "../recommendation/recommend";

export type DiagnosisDraft = {
  seenWorks: string[];
  interests: Interest[];
  timeChoice: "60m" | "one_film";
  spoilerTolerance: SpoilerLevel;
  animationAllowed: boolean;
};

export const diagnosisPresets: Readonly<
  Record<"newcomer" | "lapsed" | "partial_fan", DiagnosisDraft>
> = {
  newcomer: {
    seenWorks: [],
    interests: ["family", "human_drama"],
    timeChoice: "60m",
    spoilerTolerance: 0,
    animationAllowed: true,
  },
  lapsed: {
    seenWorks: ["ep4"],
    interests: ["politics", "human_drama"],
    timeChoice: "one_film",
    spoilerTolerance: 1,
    animationAllowed: false,
  },
  partial_fan: {
    seenWorks: ["mandalorian_s1", "mandalorian_s2"],
    interests: ["character", "lore"],
    timeChoice: "60m",
    spoilerTolerance: 2,
    animationAllowed: true,
  },
};

export function inferPersona(
  seenWorks: readonly string[],
): RecommendationInput["persona"] {
  if (seenWorks.length === 0) return "newcomer";
  if (
    seenWorks.includes("mandalorian_s1") &&
    seenWorks.includes("mandalorian_s2")
  ) {
    return "partial_fan";
  }
  return "lapsed";
}

export function toRecommendationInput(
  draft: DiagnosisDraft,
): RecommendationInput {
  return {
    persona: inferPersona(draft.seenWorks),
    seenWorks: draft.seenWorks,
    interests: draft.interests,
    timeBudget:
      draft.timeChoice === "one_film"
        ? { kind: "one_film" }
        : { kind: "minutes", minutes: 60 },
    spoilerTolerance: draft.spoilerTolerance,
    animationAllowed: draft.animationAllowed,
  };
}

export function recommendAlternative(
  input: RecommendationInput,
  current: Recommendation,
  candidates: readonly RecommendationCandidate[],
  selectedInterest?: Interest,
): Recommendation | null {
  const interests = selectedInterest
    ? [
        selectedInterest,
        ...input.interests.filter((interest) => interest !== selectedInterest),
      ].slice(0, 2)
    : input.interests;

  return recommendNext(
    {
      ...input,
      seenWorks: [...input.seenWorks, ...current.candidate.seenAliases],
      interests,
    },
    candidates,
  );
}
