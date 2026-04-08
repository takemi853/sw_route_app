"use client";

import { useState } from "react";
import Image from "next/image";
import { works, type Work } from "@/lib/data/works";
import WorkDetail from "./WorkDetail";
import Timeline from "./Timeline";
import type { ReaderProfile } from "@/lib/types";

type Tab = "shelf" | "timeline";

type Props = {
  reader: ReaderProfile;
  onOpenRoutes: () => void;
  onBack: () => void;
};

function formatTime(work: Work): string {
  if (work.type === "film") return `${work.minutesPerEpisode}分`;
  const total = work.minutesPerEpisode * (work.episodes ?? 1);
  const h = Math.floor(total / 60);
  return `1話${work.minutesPerEpisode}分 × ${work.episodes}話（計${h}時間〜）`;
}

export default function Bookshelf({ reader, onOpenRoutes, onBack }: Props) {
  const [selected, setSelected] = useState<Work | null>(null);
  const [tab, setTab] = useState<Tab>("shelf");

  if (selected) {
    return <WorkDetail work={selected} onBack={() => setSelected(null)} />;
  }

  const entryWorks = works.filter((w) => w.isEntryPoint);
  const otherWorks = works.filter((w) => !w.isEntryPoint);

  return (
    <div className="min-h-screen" style={{ background: "#e9e5de" }}>
      {/* ヘッダー */}
      <header
        className="sticky top-0 z-10 border-b px-5 py-3"
        style={{ background: "rgba(233,229,222,0.92)", borderColor: "#d4cfc6", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-sm shrink-0"
              style={{ color: "#9ca3af" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#374151")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#9ca3af")}
            >
              ← 最初から
            </button>
            <div className="flex rounded-lg p-0.5" style={{ background: "#d4cfc6" }}>
              {(["shelf", "timeline"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="text-xs px-3 py-1 rounded-md font-semibold transition-colors"
                  style={{
                    background: tab === t ? "#f2ede5" : "transparent",
                    color: tab === t ? "#1c1917" : "#78716c",
                  }}
                >
                  {t === "shelf" ? "一覧" : "時系列"}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onOpenRoutes}
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "#1c1917", color: "#f9fafb" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#374151")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#1c1917")}
          >
            ルートを選ぶ →
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-8">
        {tab === "shelf" ? (
          <>
            {/* ── ここから始めよう ── */}
            <section>
              <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "#9ca3af" }}>
                ここから始めよう
              </p>
              <div className="space-y-3">
                {entryWorks.map((work) => (
                  <EntryCard key={work.id} work={work} onClick={() => setSelected(work)} />
                ))}
              </div>
            </section>

            {/* ── 全作品 ── */}
            <section>
              <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "#9ca3af" }}>
                全作品（{works.length}作）
              </p>
              <div className="space-y-2">
                {otherWorks.map((work) => (
                  <WorkCard key={work.id} work={work} onClick={() => setSelected(work)} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <Timeline onSelectWork={setSelected} />
        )}

        <button
          onClick={onOpenRoutes}
          className="w-full py-3 rounded-xl text-sm font-semibold"
          style={{ background: "#1c1917", color: "#f9fafb" }}
        >
          どこから見るか、ルートを選ぶ →
        </button>
      </main>
    </div>
  );
}

// ── 入門カード（大きめ・目立つ）
function EntryCard({ work, onClick }: { work: Work; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl overflow-hidden flex transition-colors"
      style={{ background: "#f2ede5", border: "1.5px solid #c4a882" }}
      onMouseOver={(e) => (e.currentTarget.style.background = "#ece7de")}
      onMouseOut={(e) => (e.currentTarget.style.background = "#f2ede5")}
    >
      {/* ポスター */}
      <div className="relative w-24 shrink-0" style={{ aspectRatio: "2/3" }}>
        <Image src={work.posterUrl} alt={work.titleJa} fill className="object-cover" sizes="96px" />
      </div>

      <div className="flex-1 px-4 py-4 min-w-0 flex flex-col justify-between">
        <div>
          {/* バッジ */}
          <span
            className="inline-block text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-2"
            style={{ background: "#92400e18", color: "#92400e" }}
          >
            入門におすすめ
          </span>
          <h3 className="font-bold text-base leading-snug mb-1" style={{ color: "#1c1917" }}>
            {work.titleJa}
          </h3>
          {/* 一言コピー */}
          {work.entryNote && (
            <p className="text-sm leading-6 mb-2" style={{ color: "#57534e" }}>
              {work.entryNote}
            </p>
          )}
        </div>
        {/* 視聴時間 */}
        <p className="text-[11px]" style={{ color: "#a8a29e" }}>
          {formatTime(work)}
        </p>
      </div>
    </button>
  );
}

// ── 通常カード（小さめ・トーンを落とす）
function WorkCard({ work, onClick }: { work: Work; onClick: () => void }) {
  const isEssential = (work.essentialForRoutes?.length ?? 0) > 0;

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl overflow-hidden flex transition-colors"
      style={{
        background: "#f2ede5",
        opacity: isEssential ? 1 : 0.72,
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#ece7de";
        (e.currentTarget as HTMLElement).style.opacity = "1";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#f2ede5";
        (e.currentTarget as HTMLElement).style.opacity = isEssential ? "1" : "0.72";
      }}
    >
      {/* ポスター */}
      <div className="relative w-12 shrink-0" style={{ aspectRatio: "2/3" }}>
        <Image src={work.posterUrl} alt={work.titleJa} fill className="object-cover" sizes="48px" />
      </div>

      <div className="flex-1 px-3 py-2.5 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-sm" style={{ color: "#1c1917" }}>
            {work.titleJa}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "#e9e5de", color: "#78716c" }}>
            {work.type === "film" ? "映画" : `S${work.seasons}`}
          </span>
          {isEssential && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "#92400e18", color: "#92400e" }}>
              ルート必須
            </span>
          )}
        </div>
        <p className="text-[10px] mt-0.5" style={{ color: "#a8a29e" }}>
          {formatTime(work)} · {work.timelineLabel}
        </p>
      </div>

      <div className="flex items-center px-3" style={{ color: "#c4bfb8" }}>›</div>
    </button>
  );
}
