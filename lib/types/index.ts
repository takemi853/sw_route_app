// ────────────────────────────────────────────────
// 読者プロファイル
// ────────────────────────────────────────────────

export type KnowledgeLevel = "beginner" | "intermediate" | "advanced";

export type ReaderProfile = {
  /** 視聴済み作品のID (例: "rogue_one", "andor_s1", "mandalorian_s1") */
  seenWorks: string[];
  /** ネタバレ許容レベル: 0=なし 1=軽め 2=中程度 3=全解禁 */
  spoilerTolerance: 0 | 1 | 2 | 3;
  /** SW知識レベル */
  knowledgeLevel: KnowledgeLevel;
};

// ────────────────────────────────────────────────
// ページブロック
// ────────────────────────────────────────────────

export type BlockKind =
  | "hook"        // 入口の惹き込み文
  | "route_why"   // なぜこのルートか
  | "world"       // 世界・背景の説明
  | "character"   // 主人公・主要キャラ紹介
  | "theme"       // 作品のテーマ・感情軸
  | "cta"         // 次に見るべき作品への誘導
  | "annotation"; // 用語注釈ブロック（インライン埋め込み用）

export type SpoilerLevel = 0 | 1 | 2 | 3;

export type BodyVariants = {
  beginner: string;
  intermediate: string;
  advanced: string;
};

export type GlossaryTerm = {
  term: string;
  /** beginner向けの短い説明（1文以内） */
  note: string;
};

export type PageBlock = {
  id: string;
  routeId: RouteId;
  kind: BlockKind;
  /** このブロックを表示するために必要な最低spoilerLevel */
  spoilerLevel: SpoilerLevel;
  /** このブロックを表示するために必要な最低knowledge（省略時=全レベルOK） */
  minKnowledge?: KnowledgeLevel;
  /** このブロックを表示するために視聴済みである必要がある作品ID */
  requiresSeen?: string[];
  bodyVariants: BodyVariants;
  /** このブロック内で注釈が必要な用語 */
  glossaryTerms?: GlossaryTerm[];
};

// ────────────────────────────────────────────────
// ルート
// ────────────────────────────────────────────────

export type RouteId = "rogue_one_andor_route" | "mandalorian_route";

export type Route = {
  id: RouteId;
  titleJa: string;
  /** ルートの主要テーマキーワード（UI表示用） */
  themes: string[];
  /** このルートが向いている読者の傾向 */
  recommendedFor: string;
  /** このルートに属するブロックを順番に並べたID一覧 */
  blockOrder: string[];
};

// ────────────────────────────────────────────────
// ブロック選択ヘルパー
// ────────────────────────────────────────────────

export function pickBody(block: PageBlock, reader: ReaderProfile): string {
  return block.bodyVariants[reader.knowledgeLevel];
}

export function isBlockVisible(block: PageBlock, reader: ReaderProfile): boolean {
  if (block.spoilerLevel > reader.spoilerTolerance) return false;
  if (block.requiresSeen?.some((w) => !reader.seenWorks.includes(w))) return false;
  if (block.minKnowledge) {
    const levels: KnowledgeLevel[] = ["beginner", "intermediate", "advanced"];
    if (levels.indexOf(reader.knowledgeLevel) < levels.indexOf(block.minKnowledge)) return false;
  }
  return true;
}

export function shouldShowAnnotation(
  term: GlossaryTerm,
  reader: ReaderProfile
): boolean {
  return reader.knowledgeLevel === "beginner";
}
