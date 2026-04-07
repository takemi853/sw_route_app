"use client";

import { useEffect } from "react";
import type { GlossaryEntry } from "@/lib/data/glossary";
import type { KnowledgeLevel } from "@/lib/types";

type Props = {
  entry: GlossaryEntry;
  knowledgeLevel: KnowledgeLevel;
  onClose: () => void;
};

const CATEGORY_LABEL: Record<GlossaryEntry["category"], string> = {
  character:    "キャラクター",
  organization: "組織・勢力",
  event:        "出来事",
  place:        "場所",
  concept:      "概念",
};

export default function GlossaryPopup({ entry, knowledgeLevel, onClose }: Props) {
  // ESCキーで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const note = knowledgeLevel === "beginner" ? entry.shortNote : entry.mediumNote;

  return (
    <>
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.25)" }}
        onClick={onClose}
      />

      {/* ポップアップ本体（画面下から） */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl px-6 pt-5 pb-8 max-w-xl mx-auto"
        style={{ background: "#f2ede5", boxShadow: "0 -4px 24px rgba(0,0,0,0.12)" }}
      >
        {/* ハンドル */}
        <div
          className="w-10 h-1 rounded-full mx-auto mb-5"
          style={{ background: "#d4cfc6" }}
        />

        {/* カテゴリラベル */}
        <p
          className="text-[10px] font-bold tracking-widest uppercase mb-1"
          style={{ color: "#9ca3af" }}
        >
          {CATEGORY_LABEL[entry.category]}
        </p>

        {/* 用語名 */}
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="text-xl font-bold" style={{ color: "#1c1917" }}>
            {entry.termJa}
          </h2>
          <span className="text-sm" style={{ color: "#9ca3af" }}>
            {entry.termEn}
          </span>
        </div>

        {/* 説明 */}
        <p className="leading-8 text-[15px]" style={{ color: "#292524" }}>
          {note}
        </p>

        {/* 出典 */}
        <div className="mt-5 pt-4 space-y-1" style={{ borderTop: "1px solid #d4cfc6" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#9ca3af" }}>
            出典
          </p>
          {entry.sources.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs truncate"
              style={{ color: "#92400e" }}
            >
              {url}
            </a>
          ))}
        </div>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-3 rounded-xl text-sm font-semibold"
          style={{ background: "#e9e5de", color: "#6b7280" }}
        >
          閉じる
        </button>
      </div>
    </>
  );
}
