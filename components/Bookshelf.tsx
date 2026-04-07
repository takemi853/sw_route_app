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

export default function Bookshelf({ reader, onOpenRoutes, onBack }: Props) {
  const [selected, setSelected] = useState<Work | null>(null);
  const [tab, setTab] = useState<Tab>("shelf");

  if (selected) {
    return <WorkDetail work={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="min-h-screen" style={{ background: "#e9e5de" }}>
      {/* ヘッダー */}
      <header
        className="sticky top-0 z-10 border-b px-5 py-3"
        style={{ background: "rgba(233,229,222,0.92)", borderColor: "#d4cfc6", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-sm shrink-0"
              style={{ color: "#9ca3af" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#374151")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#9ca3af")}
            >
              ← 最初から
            </button>
            {/* タブ切替 */}
            <div
              className="flex rounded-lg p-0.5 gap-0.5"
              style={{ background: "#d4cfc6" }}
            >
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

      <main className="max-w-xl mx-auto px-4 py-6">
        {tab === "shelf" ? (
          <>
            {/* ポスターグリッド */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {works.map((work) => (
                <PosterCard key={work.id} work={work} onClick={() => setSelected(work)} />
              ))}
            </div>
            {/* カード一覧 */}
            <div className="space-y-3">
              {works.map((work) => (
                <WorkCard key={work.id} work={work} onClick={() => setSelected(work)} />
              ))}
            </div>
          </>
        ) : (
          <Timeline onSelectWork={setSelected} />
        )}

        <button
          onClick={onOpenRoutes}
          className="mt-8 w-full py-3 rounded-xl text-sm font-semibold"
          style={{ background: "#1c1917", color: "#f9fafb" }}
        >
          どこから見るか、ルートを選ぶ →
        </button>
      </main>
    </div>
  );
}

function PosterCard({ work, onClick }: { work: Work; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative aspect-[2/3] rounded-lg overflow-hidden group transition-transform hover:scale-105"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
      title={work.titleJa}
    >
      <Image
        src={work.posterUrl}
        alt={work.titleJa}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 25vw, 120px"
      />
      {/* タイトルオーバーレイ（ホバー時） */}
      <div
        className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}
      >
        <p className="text-white text-[9px] font-bold px-2 pb-2 leading-tight">
          {work.titleJa}
        </p>
      </div>
    </button>
  );
}

function WorkCard({ work, onClick }: { work: Work; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl overflow-hidden transition-colors group flex"
      style={{ background: "#f2ede5" }}
      onMouseOver={(e) => (e.currentTarget.style.background = "#ece7de")}
      onMouseOut={(e) => (e.currentTarget.style.background = "#f2ede5")}
    >
      {/* ポスターサムネイル */}
      <div className="relative w-16 shrink-0" style={{ aspectRatio: "2/3" }}>
        <Image
          src={work.posterUrl}
          alt={work.titleJa}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* テキスト */}
      <div className="flex-1 px-4 py-3 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="font-bold text-sm" style={{ color: "#1c1917" }}>
            {work.titleJa}
          </span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full"
            style={{ background: "#e9e5de", color: "#6b7280" }}
          >
            {work.type === "film" ? "映画" : `S${work.seasons}`}
          </span>
        </div>
        <p className="text-[11px] mb-1" style={{ color: "#9ca3af" }}>
          {work.year}年 · {work.timelineLabel}
        </p>
        <p className="text-xs leading-5 line-clamp-2" style={{ color: "#78716c" }}>
          {work.synopsis}
        </p>
      </div>

      <div className="flex items-center px-3" style={{ color: "#9ca3af" }}>›</div>
    </button>
  );
}
