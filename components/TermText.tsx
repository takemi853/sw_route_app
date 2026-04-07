"use client";

import type { GlossaryEntry } from "@/lib/data/glossary";

type Props = {
  text: string;
  /** このブロックで注釈すべき用語一覧（glossary.tsから引いたもの） */
  entries: GlossaryEntry[];
  onTermClick: (entry: GlossaryEntry) => void;
};

/**
 * テキスト中に glossary の termJa が含まれていれば下線付きのタップ可能スパンに変換する。
 * 長い用語を優先してマッチさせる（部分一致の誤検出を防ぐ）。
 */
export default function TermText({ text, entries, onTermClick }: Props) {
  if (entries.length === 0) {
    return <>{text}</>;
  }

  // 長い用語から順にソート（部分一致を防ぐ）
  const sorted = [...entries].sort((a, b) => b.termJa.length - a.termJa.length);

  // テキストをセグメントに分割する
  type Segment = { type: "text"; value: string } | { type: "term"; value: string; entry: GlossaryEntry };

  function splitText(input: string, remaining: GlossaryEntry[]): Segment[] {
    if (remaining.length === 0) return [{ type: "text", value: input }];

    const [entry, ...rest] = remaining;
    const term = entry.termJa;
    const parts = input.split(term);

    if (parts.length === 1) {
      // この用語はテキスト中に存在しない
      return splitText(input, rest);
    }

    const result: Segment[] = [];
    parts.forEach((part, i) => {
      const inner = splitText(part, rest);
      result.push(...inner);
      if (i < parts.length - 1) {
        result.push({ type: "term", value: term, entry });
      }
    });
    return result;
  }

  const segments = splitText(text, sorted);

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        return (
          <button
            key={i}
            onClick={() => onTermClick(seg.entry)}
            className="inline underline decoration-dotted underline-offset-4 cursor-pointer transition-colors"
            style={{ color: "#92400e", textDecorationColor: "#c4a882" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#78350f")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#92400e")}
          >
            {seg.value}
          </button>
        );
      })}
    </>
  );
}
