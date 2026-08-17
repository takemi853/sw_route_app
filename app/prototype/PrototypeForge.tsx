"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { recommendationCandidates } from "@/lib/recommendation/fixtures";
import {
  rankRecommendations,
  recommendNext,
} from "@/lib/recommendation/recommend";
import type {
  Interest,
  Recommendation,
  RecommendationInput,
} from "@/lib/recommendation/types";
import {
  diagnosisPresets,
  recommendAfterFeedback,
  toRecommendationInput,
  type DiagnosisDraft,
} from "@/lib/prototype/session";

import styles from "./prototype.module.css";

type Screen = "diagnosis" | "recommendation" | "feedback";
type PresetId = keyof typeof diagnosisPresets;

const SEEN_OPTIONS = [
  { id: "ep4", label: "EP4／新たなる希望" },
  { id: "rogue_one", label: "ローグ・ワン" },
  { id: "mandalorian_s1", label: "マンダロリアン S1" },
  { id: "mandalorian_s2", label: "マンダロリアン S2" },
  { id: "andor_s1", label: "アンドー S1" },
] as const;

const INTEREST_OPTIONS: readonly { id: Interest; label: string; glyph: string }[] = [
  { id: "family", label: "家族", glyph: "✦" },
  { id: "human_drama", label: "人間ドラマ", glyph: "◐" },
  { id: "politics", label: "政治", glyph: "⌁" },
  { id: "character", label: "キャラクター", glyph: "◎" },
  { id: "lore", label: "世界観", glyph: "◇" },
];

const PRESET_LABELS: Readonly<Record<PresetId, string>> = {
  newcomer: "完全未履修",
  lapsed: "途中離脱",
  partial_fan: "部分的ファン",
};

const SPOILER_OPTIONS = [
  { value: 0 as const, label: "なし" },
  { value: 1 as const, label: "雰囲気まで" },
  { value: 2 as const, label: "結末以外" },
];

function copyDraft(draft: DiagnosisDraft): DiagnosisDraft {
  return {
    ...draft,
    seenWorks: [...draft.seenWorks],
    interests: [...draft.interests],
  };
}

export default function PrototypeForge() {
  const [screen, setScreen] = useState<Screen>("diagnosis");
  const [draft, setDraft] = useState<DiagnosisDraft>(() =>
    copyDraft(diagnosisPresets.newcomer),
  );
  const [input, setInput] = useState<RecommendationInput | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [alternateIndex, setAlternateIndex] = useState(0);
  const [feedback, setFeedback] = useState<"enjoyed" | "missed" | null>(null);
  const [feedbackInterest, setFeedbackInterest] = useState<Interest | undefined>();

  const ranked = useMemo(
    () => (input ? rankRecommendations(input, recommendationCandidates) : []),
    [input],
  );

  function applyPreset(id: PresetId) {
    setDraft(copyDraft(diagnosisPresets[id]));
  }

  function toggleSeen(id: string) {
    setDraft((current) => ({
      ...current,
      seenWorks: current.seenWorks.includes(id)
        ? current.seenWorks.filter((work) => work !== id)
        : [...current.seenWorks, id],
    }));
  }

  function toggleInterest(id: Interest) {
    setDraft((current) => {
      if (current.interests.includes(id)) {
        return {
          ...current,
          interests: current.interests.filter((interest) => interest !== id),
        };
      }
      if (current.interests.length >= 2) return current;
      return { ...current, interests: [...current.interests, id] };
    });
  }

  function runDiagnosis() {
    const nextInput = toRecommendationInput(draft);
    setInput(nextInput);
    setRecommendation(recommendNext(nextInput, recommendationCandidates));
    setAlternateIndex(0);
    setScreen("recommendation");
  }

  function showAlternate() {
    if (ranked.length < 2) return;
    const nextIndex = (alternateIndex + 1) % ranked.length;
    setAlternateIndex(nextIndex);
    setRecommendation(ranked[nextIndex]);
  }

  function openFeedback() {
    setFeedback(null);
    setFeedbackInterest(undefined);
    setScreen("feedback");
  }

  function continueFromFeedback() {
    if (!input || !recommendation) return;
    const next = recommendAfterFeedback(
      input,
      recommendation,
      recommendationCandidates,
      feedbackInterest,
    );
    const nextInput: RecommendationInput = {
      ...input,
      seenWorks: [...input.seenWorks, ...recommendation.candidate.seenAliases],
      interests: feedbackInterest
        ? [
            feedbackInterest,
            ...input.interests.filter((interest) => interest !== feedbackInterest),
          ].slice(0, 2)
        : input.interests,
    };
    setInput(nextInput);
    setRecommendation(next);
    setAlternateIndex(0);
    setScreen("recommendation");
  }

  return (
    <main className={styles.shell}>
      <div className={styles.ambient} aria-hidden="true" />
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="既存アプリへ戻る">
          <span className={styles.brandMark}>RF</span>
          <span>
            <strong>ROUTE FORGE</strong>
            <small>STAR WARS ENTRY LAB</small>
          </span>
        </Link>
        <span className={styles.prototypeBadge}>LOCAL PROTOTYPE</span>
      </header>

      <div className={styles.progress} aria-label="進行状況">
        {(["diagnosis", "recommendation", "feedback"] as Screen[]).map(
          (item, index) => {
            const current = ["diagnosis", "recommendation", "feedback"].indexOf(screen);
            return (
              <div
                className={`${styles.progressItem} ${index <= current ? styles.progressActive : ""}`}
                key={item}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{["診断", "次の一つ", "視聴後"][index]}</small>
              </div>
            );
          },
        )}
      </div>

      {screen === "diagnosis" && (
        <section className={styles.diagnosisPanel} aria-labelledby="diagnosis-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>30 SECOND ROUTE SCAN</p>
            <h1 id="diagnosis-title">
              全部見なくていい。
              <br />
              <em>次の一つ</em>を見つけよう。
            </h1>
            <p>
              年表でも百科事典でもなく、今のあなたに刺さる入口を固定ルールで選びます。
            </p>
            <div className={styles.signalCard}>
              <span className={styles.signalPulse} />
              外部送信なし・AI生成なし・再読み込みでリセット
            </div>
          </div>

          <div className={styles.formCard}>
            <div className={styles.presetRow} aria-label="受入シナリオを読み込む">
              <span>QUICK TEST</span>
              {(Object.keys(PRESET_LABELS) as PresetId[]).map((id) => (
                <button key={id} onClick={() => applyPreset(id)} type="button">
                  {PRESET_LABELS[id]}
                </button>
              ))}
            </div>

            <fieldset className={styles.fieldset}>
              <legend><span>01</span> 見たことがある作品</legend>
              <p>未履修なら選択なしでOK</p>
              <div className={styles.choiceGrid}>
                {SEEN_OPTIONS.map((option) => (
                  <button
                    aria-pressed={draft.seenWorks.includes(option.id)}
                    className={draft.seenWorks.includes(option.id) ? styles.selected : ""}
                    key={option.id}
                    onClick={() => toggleSeen(option.id)}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend><span>02</span> 今ほしい物語</legend>
              <p>{draft.interests.length}/2 選択中</p>
              <div className={styles.interestGrid}>
                {INTEREST_OPTIONS.map((option) => (
                  <button
                    aria-pressed={draft.interests.includes(option.id)}
                    className={draft.interests.includes(option.id) ? styles.selected : ""}
                    key={option.id}
                    onClick={() => toggleInterest(option.id)}
                    type="button"
                  >
                    <span>{option.glyph}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className={styles.twoColumnFields}>
              <fieldset className={styles.fieldset}>
                <legend><span>03</span> 使える時間</legend>
                <div className={styles.segmented}>
                  <button
                    aria-pressed={draft.timeChoice === "60m"}
                    className={draft.timeChoice === "60m" ? styles.selected : ""}
                    onClick={() => setDraft((current) => ({ ...current, timeChoice: "60m" }))}
                    type="button"
                  >
                    60分まで
                  </button>
                  <button
                    aria-pressed={draft.timeChoice === "one_film"}
                    className={draft.timeChoice === "one_film" ? styles.selected : ""}
                    onClick={() => setDraft((current) => ({ ...current, timeChoice: "one_film" }))}
                    type="button"
                  >
                    映画1本
                  </button>
                </div>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend><span>04</span> アニメ</legend>
                <div className={styles.segmented}>
                  <button
                    aria-pressed={draft.animationAllowed}
                    className={draft.animationAllowed ? styles.selected : ""}
                    onClick={() => setDraft((current) => ({ ...current, animationAllowed: true }))}
                    type="button"
                  >
                    OK
                  </button>
                  <button
                    aria-pressed={!draft.animationAllowed}
                    className={!draft.animationAllowed ? styles.selected : ""}
                    onClick={() => setDraft((current) => ({ ...current, animationAllowed: false }))}
                    type="button"
                  >
                    実写のみ
                  </button>
                </div>
              </fieldset>
            </div>

            <fieldset className={styles.fieldset}>
              <legend><span>05</span> ネタバレ許容</legend>
              <div className={styles.segmented}>
                {SPOILER_OPTIONS.map((option) => (
                  <button
                    aria-pressed={draft.spoilerTolerance === option.value}
                    className={draft.spoilerTolerance === option.value ? styles.selected : ""}
                    key={option.value}
                    onClick={() => setDraft((current) => ({ ...current, spoilerTolerance: option.value }))}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              className={styles.primaryButton}
              disabled={draft.interests.length === 0}
              onClick={runDiagnosis}
              type="button"
            >
              <span>次の一つを出す</span>
              <b>→</b>
            </button>
          </div>
        </section>
      )}

      {screen === "recommendation" && (
        <section className={styles.resultPanel} aria-labelledby="result-title">
          <button className={styles.textButton} onClick={() => setScreen("diagnosis")} type="button">
            ← 診断を調整
          </button>
          {recommendation ? (
            <div className={styles.resultGrid}>
              <div className={styles.posterCard}>
                <div className={styles.posterOrbit} aria-hidden="true" />
                <span className={styles.matchLabel}>ROUTE MATCH</span>
                <strong>{recommendation.score}</strong>
                <small>RULE SCORE</small>
                <div className={styles.posterTitle}>
                  <span>YOUR NEXT</span>
                  <b>ONE</b>
                </div>
              </div>
              <div className={styles.resultCopy}>
                <p className={styles.eyebrow}>RECOMMENDATION LOCKED</p>
                <h1 id="result-title">{recommendation.candidate.titleJa}</h1>
                <div className={styles.metaRow}>
                  <span>{recommendation.candidate.unitLabel}</span>
                  <span>{recommendation.candidate.minutes} MIN</span>
                  <span>{recommendation.candidate.animated ? "ANIMATION" : "LIVE ACTION"}</span>
                </div>

                <div className={styles.reasonBlock}>
                  <h2>あなた向けの理由</h2>
                  <ul>
                    {recommendation.reasons.map((reason) => <li key={reason}>{reason}</li>)}
                  </ul>
                </div>

                <div className={styles.attentionBlock}>
                  <span>WATCH SIGNAL</span>
                  <p>{recommendation.attentionPoint}</p>
                </div>

                <div className={styles.resultActions}>
                  <button className={styles.primaryButton} onClick={openFeedback} type="button">
                    <span>これを見た</span><b>→</b>
                  </button>
                  <button
                    className={styles.secondaryButton}
                    disabled={ranked.length < 2}
                    onClick={showAlternate}
                    type="button"
                  >
                    別の入口を見る
                  </button>
                </div>
                <p className={styles.counter}>{alternateIndex + 1} / {ranked.length} CANDIDATES</p>
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span>NO ROUTE</span>
              <h1 id="result-title">条件に合う入口がありません</h1>
              <p>使える時間かアニメ設定を少し広げてください。</p>
            </div>
          )}
        </section>
      )}

      {screen === "feedback" && recommendation && (
        <section className={styles.feedbackPanel} aria-labelledby="feedback-title">
          <p className={styles.eyebrow}>POST-WATCH SIGNAL</p>
          <h1 id="feedback-title">どうだった？</h1>
          <p className={styles.feedbackLead}>
            「{recommendation.candidate.titleJa}」の感触だけ、次の入口に反映します。
          </p>

          <div className={styles.sentimentGrid}>
            <button
              aria-pressed={feedback === "enjoyed"}
              className={feedback === "enjoyed" ? styles.sentimentActive : ""}
              onClick={() => setFeedback("enjoyed")}
              type="button"
            >
              <span>↗</span><strong>楽しめた</strong><small>同じ温度で続ける</small>
            </button>
            <button
              aria-pressed={feedback === "missed"}
              className={feedback === "missed" ? styles.sentimentActive : ""}
              onClick={() => setFeedback("missed")}
              type="button"
            >
              <span>↘</span><strong>合わなかった</strong><small>入口を切り替える</small>
            </button>
          </div>

          <fieldset className={styles.feedbackAxes}>
            <legend>刺さった軸があれば一つ</legend>
            <div className={styles.interestGrid}>
              {INTEREST_OPTIONS.map((option) => (
                <button
                  aria-pressed={feedbackInterest === option.id}
                  className={feedbackInterest === option.id ? styles.selected : ""}
                  key={option.id}
                  onClick={() => setFeedbackInterest(option.id)}
                  type="button"
                >
                  <span>{option.glyph}</span>{option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className={styles.feedbackActions}>
            <button
              className={styles.primaryButton}
              disabled={!feedback}
              onClick={continueFromFeedback}
              type="button"
            >
              <span>{feedback === "missed" ? "別の入口へ" : "同じ方向へ続ける"}</span><b>→</b>
            </button>
            <button className={styles.textButton} onClick={() => setScreen("recommendation")} type="button">
              ひとつ前へ戻る
            </button>
          </div>
          <p className={styles.privacyNote}>この回答はブラウザ内だけで使われ、保存・送信されません。</p>
        </section>
      )}
    </main>
  );
}
