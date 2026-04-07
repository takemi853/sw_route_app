"use client";

import type { ReaderProfile, Route } from "@/lib/types";
import { routes } from "@/lib/data";

type Props = {
  reader: ReaderProfile;
  onSelect: (route: Route) => void;
  onOpenBookshelf: () => void;
};

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  mandalorian_route:
    "ジェダイもフォースも関係ない。戦士の男と迷子の子どもの話から始めたい人へ。",
  rogue_one_andor_route:
    "帝国に支配された普通の人々の話。政治と人間ドラマとしてSWを楽しみたい人へ。",
};

export default function RouteSelector({ reader, onSelect, onOpenBookshelf }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#e9e5de" }}>
      <div className="w-full max-w-lg space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#1c1917" }}>
            どのルートから始めますか？
          </h1>
          <p className="text-sm" style={{ color: "#9ca3af" }}>
            あなたの視聴状況に合わせてページを出します
          </p>
        </div>

        <ul className="space-y-3">
          {routes.map((route) => (
            <li key={route.id}>
              <button
                onClick={() => onSelect(route)}
                className="w-full text-left p-5 rounded-xl border transition-all group"
                style={{ background: "#f2ede5", borderColor: "#d4cfc6" }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#92400e";
                  (e.currentTarget as HTMLElement).style.background = "#ece7de";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#d4cfc6";
                  (e.currentTarget as HTMLElement).style.background = "#f2ede5";
                }}
              >
                <div className="font-bold text-base" style={{ color: "#1c1917" }}>
                  {route.titleJa}
                </div>
                <p className="text-sm mt-1" style={{ color: "#78716c" }}>
                  {ROUTE_DESCRIPTIONS[route.id]}
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {route.themes.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: "#e9e5de", color: "#78716c" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* 本棚へ戻る */}
        <button
          onClick={onOpenBookshelf}
          className="w-full py-3 rounded-xl text-sm font-semibold border transition-colors"
          style={{ borderColor: "#d4cfc6", color: "#78716c", background: "transparent" }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#9ca3af";
            (e.currentTarget as HTMLElement).style.color = "#1c1917";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#d4cfc6";
            (e.currentTarget as HTMLElement).style.color = "#78716c";
          }}
        >
          ← 作品一覧に戻る
        </button>

        <p className="text-center text-xs" style={{ color: "#c4bfb8" }}>
          知識レベル: {reader.knowledgeLevel} ／ ネタバレ: {reader.spoilerTolerance}
        </p>
      </div>
    </div>
  );
}
