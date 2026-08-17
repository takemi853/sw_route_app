import type { SpoilerLevel } from "../types";

export type PersonaId = "newcomer" | "lapsed" | "partial_fan";

export type Interest =
  | "family"
  | "human_drama"
  | "politics"
  | "character"
  | "lore";

export type TimeBudget =
  | { kind: "minutes"; minutes: number }
  | { kind: "one_film" };

export type RecommendationInput = {
  persona: PersonaId;
  seenWorks: readonly string[];
  interests: readonly Interest[];
  timeBudget: TimeBudget;
  spoilerTolerance: SpoilerLevel;
  animationAllowed: boolean;
};

export type RecommendationCandidate = {
  id: string;
  workId: string;
  titleJa: string;
  unitLabel: string;
  format: "film" | "episode_bundle";
  minutes: number;
  animated: boolean;
  seenAliases: readonly string[];
  interests: readonly Interest[];
  personaPriority: Readonly<Partial<Record<PersonaId, number>>>;
  editorialPriority: number;
  reasonPoints: readonly {
    text: string;
    spoilerLevel: SpoilerLevel;
  }[];
  attentionPoints: readonly {
    text: string;
    spoilerLevel: SpoilerLevel;
  }[];
};

export type Recommendation = {
  candidate: RecommendationCandidate;
  score: number;
  matchedInterests: readonly Interest[];
  reasons: readonly string[];
  attentionPoint: string;
};
