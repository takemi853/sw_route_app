"use client";

import { useState } from "react";
import type { ReaderProfile, KnowledgeLevel } from "@/lib/types";

// 視聴済み作品の選択肢
const SEEN_WORKS = [
  { id: "sw_ep4_6", label: "スターウォーズ 旧三部作（EP4〜6）" },
  { id: "sw_ep1_3", label: "スターウォーズ 新三部作（EP1〜3）" },
  { id: "sw_ep7_9", label: "スターウォーズ 続三部作（EP7〜9）" },
  { id: "rogue_one", label: "ローグワン" },
  { id: "andor_s1", label: "アンドー シーズン1" },
  { id: "mandalorian_s1", label: "マンダロリアン シーズン1" },
  { id: "mandalorian_s2", label: "マンダロリアン シーズン2" },
  { id: "mandalorian_s3", label: "マンダロリアン シーズン3" },
];

type Step = "seen" | "spoiler" | "result";

type Props = {
  onComplete: (profile: ReaderProfile) => void;
};

export default function ProfileWizard({ onComplete }: Props) {
  const [step, setStep] = useState<Step>("seen");
  const [seenWorks, setSeenWorks] = useState<string[]>([]);
  const [spoilerTolerance, setSpoilerTolerance] = useState<0 | 1 | 2 | 3>(0);

  // 視聴済み作品から知識レベルを自動推定
  function inferKnowledge(seen: string[]): KnowledgeLevel {
    const deepWorks = ["sw_ep1_3", "andor_s1", "mandalorian_s3"];
    const anyWork = seen.length > 0;
    const hasDeep = deepWorks.some((w) => seen.includes(w));
    const hasMany = seen.length >= 4;
    if (hasDeep || hasMany) return "advanced";
    if (anyWork) return "intermediate";
    return "beginner";
  }

  function toggleWork(id: string) {
    setSeenWorks((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  }

  function handleComplete() {
    onComplete({
      seenWorks,
      spoilerTolerance,
      knowledgeLevel: inferKnowledge(seenWorks),
    });
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* ステップ表示 */}
        <div className="flex gap-2 mb-8">
          {(["seen", "spoiler"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                step === s || (step === "result" && i < 2)
                  ? "bg-yellow-400"
                  : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Step 1: 視聴済み作品 */}
        {step === "seen" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">見たことある作品は？</h1>
              <p className="text-gray-400 text-sm">なければそのまま次へ</p>
            </div>
            <ul className="space-y-2">
              {SEEN_WORKS.map((w) => (
                <li key={w.id}>
                  <button
                    onClick={() => toggleWork(w.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                      seenWorks.includes(w.id)
                        ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {w.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setStep("spoiler")}
              className="w-full py-3 bg-yellow-400 text-gray-950 font-bold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              次へ
            </button>
          </div>
        )}

        {/* Step 2: ネタバレ */}
        {step === "spoiler" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">ネタバレは大丈夫？</h1>
              <p className="text-gray-400 text-sm">これから見る作品の内容に関係します</p>
            </div>
            <ul className="space-y-3">
              {(
                [
                  { value: 0, label: "完全にNG", desc: "何も知りたくない" },
                  { value: 1, label: "軽めならOK", desc: "雰囲気・テーマ程度なら" },
                  { value: 2, label: "ある程度OK", desc: "結末以外は知っていい" },
                  { value: 3, label: "全部OK", desc: "全解禁" },
                ] as { value: 0 | 1 | 2 | 3; label: string; desc: string }[]
              ).map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => setSpoilerTolerance(opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                      spoilerTolerance === opt.value
                        ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <span className="font-semibold">{opt.label}</span>
                    <span className="text-gray-400 text-sm ml-2">{opt.desc}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("seen")}
                className="flex-1 py-3 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
              >
                戻る
              </button>
              <button
                onClick={handleComplete}
                className="flex-2 flex-grow py-3 bg-yellow-400 text-gray-950 font-bold rounded-lg hover:bg-yellow-300 transition-colors"
              >
                ルートを見る
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
