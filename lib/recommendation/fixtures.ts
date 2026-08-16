import type {
  RecommendationCandidate,
  RecommendationInput,
} from "./types";

export const recommendationCandidates: readonly RecommendationCandidate[] = [
  {
    id: "mandalorian-s1e1",
    workId: "mandalorian",
    titleJa: "マンダロリアン",
    unitLabel: "シーズン1 第1話",
    format: "episode_bundle",
    minutes: 40,
    animated: false,
    seenAliases: ["mandalorian", "mandalorian_s1"],
    interests: ["family", "human_drama", "character", "lore"],
    personaPriority: { newcomer: 10 },
    editorialPriority: 100,
    reasonPoints: [
      { text: "事前知識なしでも始めやすい独立した入口です", spoilerLevel: 0 },
      { text: "家族と居場所をめぐる物語の入口です", spoilerLevel: 0 },
    ],
    attentionPoints: [
      { text: "寡黙な主人公の選択と、旅の空気感に注目", spoilerLevel: 0 },
    ],
  },
  {
    id: "tales-of-jedi-s1e1",
    workId: "tales_of_jedi",
    titleJa: "テイルズ・オブ・ジェダイ",
    unitLabel: "シーズン1 第1話",
    format: "episode_bundle",
    minutes: 17,
    animated: true,
    seenAliases: ["tales_of_jedi", "tales_of_jedi_s1"],
    interests: ["family", "character", "lore"],
    personaPriority: { newcomer: 5, partial_fan: 2 },
    editorialPriority: 70,
    reasonPoints: [
      { text: "短時間で人物と世界観に触れられます", spoilerLevel: 0 },
    ],
    attentionPoints: [
      { text: "台詞以外で描かれる家族の距離感に注目", spoilerLevel: 0 },
    ],
  },
  {
    id: "andor-s1e1",
    workId: "andor",
    titleJa: "アンドー",
    unitLabel: "シーズン1 第1話",
    format: "episode_bundle",
    minutes: 43,
    animated: false,
    seenAliases: ["andor", "andor_s1"],
    interests: ["politics", "human_drama", "character"],
    personaPriority: { newcomer: 2, lapsed: 3 },
    editorialPriority: 80,
    reasonPoints: [
      { text: "政治劇と人間ドラマを小さな事件から始められます", spoilerLevel: 0 },
    ],
    attentionPoints: [
      { text: "帝国の影が日常へ入り込む描写に注目", spoilerLevel: 0 },
    ],
  },
  {
    id: "rogue-one-film",
    workId: "rogue_one",
    titleJa: "ローグ・ワン",
    unitLabel: "映画1本",
    format: "film",
    minutes: 133,
    animated: false,
    seenAliases: ["rogue_one"],
    interests: ["politics", "human_drama", "character"],
    personaPriority: { lapsed: 10 },
    editorialPriority: 90,
    reasonPoints: [
      { text: "既知の物語へつながる一本の映画として復帰しやすい入口です", spoilerLevel: 0 },
      { text: "名もなき人々の選択を描く人間ドラマです", spoilerLevel: 1 },
    ],
    attentionPoints: [
      { text: "大きな歴史の裏側で動く普通の人々に注目", spoilerLevel: 0 },
      { text: "反乱へ参加する理由の違いに注目", spoilerLevel: 1 },
    ],
  },
  {
    id: "rebels-mandalore-bridge",
    workId: "rebels",
    titleJa: "反乱者たち",
    unitLabel: "マンダロア関連 2話",
    format: "episode_bundle",
    minutes: 44,
    animated: true,
    seenAliases: ["rebels", "rebels_mandalore_bridge"],
    interests: ["character", "lore"],
    personaPriority: { partial_fan: 10 },
    editorialPriority: 85,
    reasonPoints: [
      { text: "既視聴のマンダロリアン文化を別の人物から深められます", spoilerLevel: 0 },
      { text: "マンダロアの歴史的背景とのつながりを補えます", spoilerLevel: 2 },
    ],
    attentionPoints: [
      { text: "人物が受け継ぐ文化と葛藤に注目", spoilerLevel: 0 },
      { text: "マンダロアをめぐる立場の違いに注目", spoilerLevel: 2 },
    ],
  },
  {
    id: "boba-fett-s1e1",
    workId: "boba_fett",
    titleJa: "ボバ・フェットの書",
    unitLabel: "シーズン1 第1話",
    format: "episode_bundle",
    minutes: 40,
    animated: false,
    seenAliases: ["boba_fett", "boba_fett_s1"],
    interests: ["character", "lore"],
    personaPriority: { partial_fan: 5 },
    editorialPriority: 75,
    reasonPoints: [
      { text: "マンダロリアン周辺の世界を実写のまま広げられます", spoilerLevel: 0 },
    ],
    attentionPoints: [
      { text: "支配ではなく信頼を選ぶ過程に注目", spoilerLevel: 0 },
    ],
  },
];

export const acceptancePersonas: Readonly<
  Record<"newcomer" | "lapsed" | "partial_fan", RecommendationInput>
> = {
  newcomer: {
    persona: "newcomer",
    seenWorks: [],
    interests: ["family", "human_drama"],
    timeBudget: { kind: "minutes", minutes: 60 },
    spoilerTolerance: 0,
    animationAllowed: true,
  },
  lapsed: {
    persona: "lapsed",
    seenWorks: ["ep4"],
    interests: ["politics", "human_drama"],
    timeBudget: { kind: "one_film" },
    spoilerTolerance: 1,
    animationAllowed: false,
  },
  partial_fan: {
    persona: "partial_fan",
    seenWorks: ["mandalorian_s1", "mandalorian_s2"],
    interests: ["character", "lore"],
    timeBudget: { kind: "minutes", minutes: 60 },
    spoilerTolerance: 2,
    animationAllowed: true,
  },
};
