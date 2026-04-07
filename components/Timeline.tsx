"use client";

import Image from "next/image";
import { getWorksByEra, type Work, type Era } from "@/lib/data/works";

type Props = {
  onSelectWork: (work: Work) => void;
};

export default function Timeline({ onSelectWork }: Props) {
  const byEra = getWorksByEra();

  return (
    <div className="space-y-0">
      {byEra.map(({ era, works }) => (
        <EraSection key={era.id} era={era} works={works} onSelectWork={onSelectWork} />
      ))}
    </div>
  );
}

function EraSection({
  era,
  works,
  onSelectWork,
}: {
  era: Era;
  works: Work[];
  onSelectWork: (work: Work) => void;
}) {
  return (
    <div className="relative">
      {/* 時代ラベル */}
      <div
        className="sticky top-12 z-10 px-4 py-2 flex items-center gap-3"
        style={{ background: "#e9e5de" }}
      >
        <span
          className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: era.color }}
        />
        <span className="text-xs font-bold" style={{ color: "#57534e" }}>
          {era.labelJa}
        </span>
        <span className="text-[10px]" style={{ color: "#a8a29e" }}>
          {era.timelineRange}
        </span>
      </div>

      {/* 作品一覧（タイムライン線付き） */}
      <div className="relative pl-8 pr-4 pb-2">
        {/* 縦線 */}
        <div
          className="absolute left-[22px] top-0 bottom-0 w-px"
          style={{ background: era.color, opacity: 0.3 }}
        />

        <div className="space-y-3">
          {works.map((work, i) => (
            <TimelineItem
              key={work.id}
              work={work}
              eraColor={era.color}
              isLast={i === works.length - 1}
              onSelect={() => onSelectWork(work)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  work,
  eraColor,
  onSelect,
}: {
  work: Work;
  eraColor: string;
  isLast: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="relative flex gap-3 items-start">
      {/* ドット */}
      <div
        className="absolute -left-[22px] top-4 w-3 h-3 rounded-full border-2 shrink-0"
        style={{ background: "#e9e5de", borderColor: eraColor, transform: "translateX(-50%)" }}
      />

      {/* カード */}
      <button
        onClick={onSelect}
        className="w-full text-left rounded-xl overflow-hidden flex transition-colors group"
        style={{ background: "#f2ede5" }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#ece7de")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#f2ede5")}
      >
        {/* ポスター */}
        <div className="relative w-14 shrink-0" style={{ aspectRatio: "2/3" }}>
          <Image
            src={work.posterUrl}
            alt={work.titleJa}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>

        {/* テキスト */}
        <div className="flex-1 px-3 py-2.5 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <span className="font-bold text-sm leading-tight" style={{ color: "#1c1917" }}>
              {work.titleJa}
            </span>
            <span
              className="text-[9px] px-1.5 py-0.5 rounded-full shrink-0"
              style={{ background: "#e9e5de", color: "#78716c" }}
            >
              {work.type === "film" ? "映画" : `S${work.seasons}`}
            </span>
          </div>
          <p className="text-[10px] mb-1" style={{ color: "#a8a29e" }}>
            {work.timelineLabel}
          </p>
          <p className="text-xs leading-5 line-clamp-2" style={{ color: "#78716c" }}>
            {work.synopsis}
          </p>

          {/* 繋がり */}
          {work.connections && work.connections.length > 0 && (
            <div className="mt-1.5 flex gap-1 flex-wrap">
              {work.connections.slice(0, 2).map((c) => (
                <span
                  key={c.workId}
                  className="text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{ background: `${eraColor}18`, color: eraColor }}
                >
                  → {c.relation}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
