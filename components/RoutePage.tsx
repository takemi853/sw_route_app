"use client";

import { useState } from "react";
import type { ReaderProfile, Route, PageBlock, BlockKind } from "@/lib/types";
import { pickBody, isBlockVisible, shouldShowAnnotation } from "@/lib/types";
import { blockIndex } from "@/lib/data";
import { glossary, type GlossaryEntry } from "@/lib/data/glossary";
import GlossaryPopup from "./GlossaryPopup";
import TermText from "./TermText";

type Props = {
  route: Route;
  reader: ReaderProfile;
  onBack: () => void;
};

const KIND_LABEL: Record<BlockKind, string> = {
  hook:        "",
  route_why:   "なぜこのルートか",
  world:       "舞台・時代背景",
  character:   "主人公",
  theme:       "テーマ",
  cta:         "次に見るべき作品",
  annotation:  "用語メモ",
};

const KIND_ACCENT: Record<BlockKind, string> = {
  hook:        "#f59e0b",
  route_why:   "#60a5fa",
  world:       "#94a3b8",
  character:   "#34d399",
  theme:       "#a78bfa",
  cta:         "#f59e0b",
  annotation:  "#6b7280",
};

export default function RoutePage({ route, reader, onBack }: Props) {
  const [selectedEntry, setSelectedEntry] = useState<GlossaryEntry | null>(null);

  const visibleBlocks: PageBlock[] = route.blockOrder
    .map((id) => blockIndex[id])
    .filter((b): b is PageBlock => !!b && isBlockVisible(b, reader));

  // このルートに関連する辞書エントリーだけ抽出
  const routeGlossary = glossary.filter((e) => e.routeIds.includes(route.id));

  return (
    <div className="min-h-screen" style={{ background: "#e9e5de" }}>
      {/* ヘッダー */}
      <header
        className="sticky top-0 z-10 border-b px-5 py-3"
        style={{ background: "rgba(233,229,222,0.92)", borderColor: "#d4cfc6", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-sm transition-colors shrink-0"
            style={{ color: "#9ca3af" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#374151")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#9ca3af")}
          >
            ← 戻る
          </button>
          <div className="min-w-0">
            <h1 className="font-bold text-sm truncate" style={{ color: "#1c1917" }}>
              {route.titleJa}
            </h1>
            <div className="flex gap-1.5 mt-1 flex-wrap">
              {route.themes.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: "#d4cfc6", color: "#6b7280" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* コンテンツ */}
      <main className="max-w-xl mx-auto px-4 py-10 space-y-4">
        {visibleBlocks.map((block) => (
          <BlockCard
            key={block.id}
            block={block}
            reader={reader}
            routeGlossary={routeGlossary}
            onTermClick={setSelectedEntry}
          />
        ))}
      </main>

      {/* 辞書ポップアップ */}
      {selectedEntry && (
        <GlossaryPopup
          entry={selectedEntry}
          knowledgeLevel={reader.knowledgeLevel}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  );
}

function BlockCard({
  block,
  reader,
  routeGlossary,
  onTermClick,
}: {
  block: PageBlock;
  reader: ReaderProfile;
  routeGlossary: GlossaryEntry[];
  onTermClick: (entry: GlossaryEntry) => void;
}) {
  const body = pickBody(block, reader);
  const label = KIND_LABEL[block.kind];
  const accent = KIND_ACCENT[block.kind];
  const isHook = block.kind === "hook";
  const isCta = block.kind === "cta";

  // このブロックの glossaryTerms に対応する辞書エントリーを引く
  const blockEntries = block.glossaryTerms
    ? routeGlossary.filter((e) =>
        block.glossaryTerms!.some((t) => t.term === e.termJa)
      )
    : [];

  // フック
  if (isHook) {
    return (
      <section className="px-1 py-6">
        <p className="text-xl font-medium leading-9" style={{ color: "#1c1917" }}>
          <TermText text={body} entries={blockEntries} onTermClick={onTermClick} />
        </p>
      </section>
    );
  }

  // CTA
  if (isCta) {
    return (
      <section
        className="rounded-xl px-6 py-5 mt-6"
        style={{ background: "#d4cfc6", border: "1px solid #b5afa5" }}
      >
        <p className="text-[11px] font-bold tracking-widest uppercase mb-4" style={{ color: "#92400e" }}>
          ▶ {KIND_LABEL.cta}
        </p>
        <CtaBody body={body} />
      </section>
    );
  }

  // 通常ブロック
  return (
    <section className="rounded-xl px-6 py-5" style={{ background: "#f2ede5" }}>
      {label && (
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: accent }} />
          <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "#9ca3af" }}>
            {label}
          </span>
        </div>
      )}

      <div className="space-y-4">
        {body.split("\n").filter(Boolean).map((line, i) => (
          <p key={i} className="leading-8 text-[15px]" style={{ color: "#1c1917" }}>
            <TermText text={line} entries={blockEntries} onTermClick={onTermClick} />
          </p>
        ))}
      </div>

      {/* 用語注釈（beginner のみ・辞書エントリーがないものの補足） */}
      {reader.knowledgeLevel === "beginner" && block.glossaryTerms?.length ? (
        <ul className="mt-5 pt-4 space-y-2" style={{ borderTop: "1px solid #e7e4de" }}>
          <li className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#9ca3af" }}>
            用語メモ（タップで詳細）
          </li>
          {block.glossaryTerms
            .filter((t) => shouldShowAnnotation(t, reader))
            .map((t) => {
              const entry = routeGlossary.find((e) => e.termJa === t.term);
              return (
                <li key={t.term} className="flex gap-2 text-sm">
                  {entry ? (
                    <button
                      onClick={() => onTermClick(entry)}
                      className="font-semibold shrink-0 underline decoration-dotted underline-offset-2"
                      style={{ color: "#92400e" }}
                    >
                      {t.term}
                    </button>
                  ) : (
                    <span className="font-semibold shrink-0" style={{ color: "#92400e" }}>
                      {t.term}
                    </span>
                  )}
                  <span style={{ color: "#57534e" }}>{t.note}</span>
                </li>
              );
            })}
        </ul>
      ) : null}
    </section>
  );
}

function CtaBody({ body }: { body: string }) {
  const lines = body.split("\n").filter(Boolean);
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const isListItem = /^\d+\.\s/.test(line);
        if (isListItem) {
          return (
            <div
              key={i}
              className="flex gap-3 items-start py-2.5"
              style={{ borderBottom: "1px solid #bfbab0" }}
            >
              <span className="font-bold shrink-0 w-4 text-sm" style={{ color: "#92400e" }}>
                {line.match(/^\d+/)?.[0]}.
              </span>
              <span className="leading-7 text-[15px]" style={{ color: "#292524" }}>
                {line.replace(/^\d+\.\s/, "")}
              </span>
            </div>
          );
        }
        return (
          <p key={i} className="leading-8 text-[15px]" style={{ color: "#292524" }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}
