"use client";

import Image from "next/image";
import type { Work } from "@/lib/data/works";
import { routes } from "@/lib/data";

type Props = {
  work: Work;
  onBack: () => void;
};

export default function WorkDetail({ work, onBack }: Props) {
  const relatedRoutes = routes.filter((r) => work.routeIds.includes(r.id));

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
            className="text-sm shrink-0"
            style={{ color: "#9ca3af" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#374151")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#9ca3af")}
          >
            ← 本棚に戻る
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8 space-y-4">
        {/* ヒーロー：ポスター＋タイトル */}
        <div className="rounded-xl overflow-hidden flex gap-0" style={{ background: "#1c1917" }}>
          {/* ポスター */}
          <div className="relative w-32 shrink-0" style={{ aspectRatio: "2/3" }}>
            <Image
              src={work.posterUrl}
              alt={work.titleJa}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>

          {/* タイトル情報 */}
          <div className="flex-1 px-5 py-5 flex flex-col justify-end">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold self-start mb-3"
              style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}
            >
              {work.type === "film" ? "映画" : `ドラマ S${work.seasons} · 全${work.episodes}話`}
            </span>
            <h1 className="text-lg font-bold leading-snug" style={{ color: "#f9fafb" }}>
              {work.titleJa}
            </h1>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              {work.titleEn} · {work.year}
            </p>
          </div>
        </div>

        {/* タイムライン */}
        <div className="rounded-xl px-5 py-4" style={{ background: "#f2ede5" }}>
          <Label>作中の時代</Label>
          <p className="text-base font-semibold mt-1" style={{ color: "#1c1917" }}>
            {work.timelineLabel}
          </p>
          <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
            BBY = ヤヴィンの戦い以前 / ABY = 以後
          </p>
        </div>

        {/* あらすじ */}
        <div className="rounded-xl px-5 py-5" style={{ background: "#f2ede5" }}>
          <Label>あらすじ</Label>
          <p className="leading-8 text-[15px] mt-2" style={{ color: "#1c1917" }}>
            {work.synopsis}
          </p>
        </div>

        {/* テーマ */}
        {work.themes.length > 0 && (
          <div className="rounded-xl px-5 py-4" style={{ background: "#f2ede5" }}>
            <Label>テーマ</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {work.themes.map((t) => (
                <span
                  key={t}
                  className="text-sm px-3 py-1 rounded-full"
                  style={{ background: "#e9e5de", color: "#57534e" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 関連ルート */}
        {relatedRoutes.length > 0 && (
          <div className="rounded-xl px-5 py-4" style={{ background: "#f2ede5" }}>
            <Label>収録ルート</Label>
            <div className="mt-2 space-y-2">
              {relatedRoutes.map((r) => (
                <div
                  key={r.id}
                  className="px-3 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: "#e9e5de", color: "#1c1917" }}
                >
                  {r.titleJa}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#9ca3af" }}>
      {children}
    </p>
  );
}
