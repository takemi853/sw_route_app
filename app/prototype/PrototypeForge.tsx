"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { works } from "@/lib/data/works";
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
  recommendAlternative,
  toRecommendationInput,
  type DiagnosisDraft,
} from "@/lib/prototype/session";

import styles from "./prototype.module.css";

type Screen = "diagnosis" | "recommendation" | "feedback";
type PresetId = keyof typeof diagnosisPresets;

const PERSONA_OPTIONS: readonly {
  id: PresetId;
  number: string;
  title: string;
  description: string;
}[] = [
  {
    id: "newcomer",
    number: "01",
    title: "ほぼ初めて",
    description: "予備知識なしで楽しめる入口がほしい",
  },
  {
    id: "lapsed",
    number: "02",
    title: "昔見た・途中で止まった",
    description: "復習しすぎず、気軽に戻りたい",
  },
  {
    id: "partial_fan",
    number: "03",
    title: "好きな作品から広げたい",
    description: "人物や世界観のつながりを辿りたい",
  },
];

const SEEN_OPTIONS = [
  { id: "ep4", label: "新たなる希望" },
  { id: "rogue_one", label: "ローグ・ワン" },
  { id: "mandalorian_s1", label: "マンダロリアン S1" },
  { id: "mandalorian_s2", label: "マンダロリアン S2" },
  { id: "andor_s1", label: "アンドー S1" },
] as const;

const INTEREST_OPTIONS: readonly {
  id: Interest;
  label: string;
  description: string;
}[] = [
  { id: "family", label: "家族・絆", description: "誰かを守る物語" },
  { id: "human_drama", label: "人間ドラマ", description: "迷いと決断" },
  { id: "politics", label: "政治・反乱", description: "支配に抗う人々" },
  { id: "character", label: "人物を深掘り", description: "推しの背景と変化" },
  { id: "lore", label: "世界観", description: "歴史と文化のつながり" },
];

const SPOILER_OPTIONS = [
  { value: 0 as const, label: "完全に伏せる" },
  { value: 1 as const, label: "雰囲気まで" },
  { value: 2 as const, label: "結末以外OK" },
];

const STEP_LABELS: Readonly<Record<Screen, string>> = {
  diagnosis: "今の気分",
  recommendation: "最初の入口",
  feedback: "入口を調整",
};

const workById = new Map(works.map((work) => [work.id, work]));

function copyDraft(draft: DiagnosisDraft): DiagnosisDraft {
  return {
    ...draft,
    seenWorks: [...draft.seenWorks],
    interests: [...draft.interests],
  };
}

function posterFor(recommendation: Recommendation) {
  return workById.get(recommendation.candidate.workId)?.posterUrl;
}

export default function PrototypeForge() {
  const [screen, setScreen] = useState<Screen>("diagnosis");
  const [presetId, setPresetId] = useState<PresetId>("newcomer");
  const [draft, setDraft] = useState<DiagnosisDraft>(() =>
    copyDraft(diagnosisPresets.newcomer),
  );
  const [input, setInput] = useState<RecommendationInput | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [alternateIndex, setAlternateIndex] = useState(0);
  const [feedback, setFeedback] = useState<"want_to_watch" | "not_now" | null>(null);
  const [feedbackInterest, setFeedbackInterest] = useState<Interest | undefined>();
  const [routeAccepted, setRouteAccepted] = useState(false);

  const ranked = useMemo(
    () => (input ? rankRecommendations(input, recommendationCandidates) : []),
    [input],
  );

  const routePreview = useMemo(() => {
    if (!recommendation) return [];
    return [
      recommendation,
      ...ranked.filter((item) => item.candidate.id !== recommendation.candidate.id),
    ].slice(0, 3);
  }, [ranked, recommendation]);

  function applyPreset(id: PresetId) {
    setPresetId(id);
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
    setRouteAccepted(false);
    setScreen("feedback");
  }

  function continueFromFeedback() {
    if (!input || !recommendation) return;
    if (feedback === "want_to_watch") {
      setRouteAccepted(true);
      return;
    }
    const next = recommendAlternative(
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
      <div className={styles.stars} aria-hidden="true" />
      <header className={styles.header}>
        <button
          className={styles.brand}
          onClick={() => setScreen("diagnosis")}
          type="button"
        >
          <span className={styles.brandMark}>SP</span>
          <span>
            <strong>STAR PATH</strong>
            <small>あなた専用の入口案内</small>
          </span>
        </button>
        <span className={styles.fanBadge}>非公式ファンガイド</span>
      </header>

      <nav className={styles.steps} aria-label="体験の進行状況">
        {(Object.keys(STEP_LABELS) as Screen[]).map((step, index) => {
          const current = (Object.keys(STEP_LABELS) as Screen[]).indexOf(screen);
          return (
            <span
              className={index <= current ? styles.stepActive : ""}
              key={step}
              aria-current={step === screen ? "step" : undefined}
            >
              <b>{index + 1}</b>
              {STEP_LABELS[step]}
            </span>
          );
        })}
      </nav>

      {screen === "diagnosis" && (
        <section className={styles.diagnosis} aria-labelledby="diagnosis-title">
          <div className={styles.hero}>
            <p className={styles.kicker}>YOUR NEXT STORY, NOT THE WHOLE GALAXY</p>
            <h1 id="diagnosis-title">
              スター・ウォーズ、
              <br />
              <em>次はどれを見る？</em>
            </h1>
            <p className={styles.heroLead}>
              知識ゼロでも、途中からでも大丈夫。今の気分と使える時間から、
              最初に見る一本・一話だけを案内します。
            </p>
            <div className={styles.promiseRow}>
              <span>約30秒</span>
              <span>ネタバレ調整</span>
              <span>登録不要</span>
            </div>
          </div>

          <div className={styles.questionStack}>
            <section className={styles.questionCard} aria-labelledby="persona-title">
              <div className={styles.questionHeading}>
                <span>01</span>
                <div>
                  <h2 id="persona-title">今のあなたに近いのは？</h2>
                  <p>ここを選ぶだけでも入口を出せます</p>
                </div>
              </div>
              <div className={styles.personaGrid}>
                {PERSONA_OPTIONS.map((option) => (
                  <button
                    aria-pressed={presetId === option.id}
                    className={presetId === option.id ? styles.selectedCard : ""}
                    key={option.id}
                    onClick={() => applyPreset(option.id)}
                    type="button"
                  >
                    <span>{option.number}</span>
                    <strong>{option.title}</strong>
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.questionCard} aria-labelledby="interest-title">
              <div className={styles.questionHeading}>
                <span>02</span>
                <div>
                  <h2 id="interest-title">今日は、どんな物語が見たい？</h2>
                  <p>気になるものを2つまで</p>
                </div>
                <b className={styles.selectionCount}>{draft.interests.length}/2</b>
              </div>
              <div className={styles.interestGrid}>
                {INTEREST_OPTIONS.map((option) => (
                  <button
                    aria-pressed={draft.interests.includes(option.id)}
                    className={draft.interests.includes(option.id) ? styles.selectedChip : ""}
                    key={option.id}
                    onClick={() => toggleInterest(option.id)}
                    type="button"
                  >
                    <strong>{option.label}</strong>
                    <small>{option.description}</small>
                  </button>
                ))}
              </div>
            </section>

            <details className={styles.tuningCard}>
              <summary>
                <span>
                  <b>03</b>
                  時間・視聴済み・ネタバレを調整
                </span>
                <small>任意</small>
              </summary>
              <div className={styles.tuningBody}>
                <fieldset>
                  <legend>見たことがある作品</legend>
                  <div className={styles.compactChoices}>
                    {SEEN_OPTIONS.map((option) => (
                      <button
                        aria-pressed={draft.seenWorks.includes(option.id)}
                        className={draft.seenWorks.includes(option.id) ? styles.selectedChip : ""}
                        key={option.id}
                        onClick={() => toggleSeen(option.id)}
                        type="button"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className={styles.tuningColumns}>
                  <fieldset>
                    <legend>使える時間</legend>
                    <div className={styles.segmented}>
                      <button
                        aria-pressed={draft.timeChoice === "60m"}
                        className={draft.timeChoice === "60m" ? styles.selectedChip : ""}
                        onClick={() => setDraft((current) => ({ ...current, timeChoice: "60m" }))}
                        type="button"
                      >
                        60分まで
                      </button>
                      <button
                        aria-pressed={draft.timeChoice === "one_film"}
                        className={draft.timeChoice === "one_film" ? styles.selectedChip : ""}
                        onClick={() => setDraft((current) => ({ ...current, timeChoice: "one_film" }))}
                        type="button"
                      >
                        映画1本
                      </button>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>アニメ作品</legend>
                    <div className={styles.segmented}>
                      <button
                        aria-pressed={draft.animationAllowed}
                        className={draft.animationAllowed ? styles.selectedChip : ""}
                        onClick={() => setDraft((current) => ({ ...current, animationAllowed: true }))}
                        type="button"
                      >
                        候補に含める
                      </button>
                      <button
                        aria-pressed={!draft.animationAllowed}
                        className={!draft.animationAllowed ? styles.selectedChip : ""}
                        onClick={() => setDraft((current) => ({ ...current, animationAllowed: false }))}
                        type="button"
                      >
                        実写だけ
                      </button>
                    </div>
                  </fieldset>
                </div>

                <fieldset>
                  <legend>ネタバレ</legend>
                  <div className={styles.segmented}>
                    {SPOILER_OPTIONS.map((option) => (
                      <button
                        aria-pressed={draft.spoilerTolerance === option.value}
                        className={draft.spoilerTolerance === option.value ? styles.selectedChip : ""}
                        key={option.value}
                        onClick={() => setDraft((current) => ({
                          ...current,
                          spoilerTolerance: option.value,
                        }))}
                        type="button"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </details>

            <button
              className={styles.primaryButton}
              disabled={draft.interests.length === 0}
              onClick={runDiagnosis}
              type="button"
            >
              <span>
                <small>あなた向けの</small>
                最初の入口を見る
              </span>
              <b>→</b>
            </button>
          </div>
        </section>
      )}

      {screen === "recommendation" && (
        <section className={styles.result} aria-labelledby="result-title">
          <div className={styles.resultToolbar}>
            <button onClick={() => setScreen("diagnosis")} type="button">
              ← 条件を選び直す
            </button>
            <span>あなたの入口が見つかりました</span>
          </div>

          {recommendation ? (
            <>
              <div className={styles.resultHero}>
                <div className={styles.posterFrame}>
                  {posterFor(recommendation) ? (
                    <Image
                      alt={`${recommendation.candidate.titleJa}のポスター`}
                      fill
                      priority
                      sizes="(max-width: 760px) 78vw, 360px"
                      src={posterFor(recommendation) ?? ""}
                    />
                  ) : null}
                  <span>最初に見る</span>
                  <div className={styles.posterShade} />
                </div>

                <div className={styles.recommendationCopy}>
                  <p className={styles.kicker}>YOUR FIRST STOP</p>
                  <h1 id="result-title">{recommendation.candidate.titleJa}</h1>
                  <p className={styles.unitLabel}>{recommendation.candidate.unitLabel}</p>

                  <div className={styles.metaRow}>
                    <span>{recommendation.candidate.minutes}分</span>
                    <span>{recommendation.candidate.animated ? "アニメーション" : "実写"}</span>
                    <span>ネタバレ調整済み</span>
                  </div>

                  <section className={styles.reasonPanel}>
                    <h2>これを入口にした理由</h2>
                    <ul>
                      {recommendation.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  </section>

                  <section className={styles.watchNote}>
                    <span>見るときのポイント</span>
                    <p>{recommendation.attentionPoint}</p>
                  </section>

                  <div className={styles.resultActions}>
                    <button className={styles.primaryButton} onClick={openFeedback} type="button">
                      <span>
                        <small>この提案を</small>
                        今の気分でレビューする
                      </span>
                      <b>→</b>
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
                </div>
              </div>

              <section className={styles.routeSection} aria-labelledby="route-title">
                <div className={styles.sectionHeading}>
                  <div>
                    <p className={styles.kicker}>YOUR PERSONAL ROUTE</p>
                    <h2 id="route-title">この先の道筋</h2>
                  </div>
                  <p>まずは一番左だけでOK。感想によって次は変わります。</p>
                </div>
                <ol className={styles.routeRail}>
                  {routePreview.map((item, index) => (
                    <li key={item.candidate.id}>
                      <span className={styles.routeIndex}>0{index + 1}</span>
                      <div className={styles.routeThumb}>
                        {posterFor(item) ? (
                          <Image
                            alt=""
                            fill
                            sizes="96px"
                            src={posterFor(item) ?? ""}
                          />
                        ) : null}
                      </div>
                      <div>
                        <small>{index === 0 ? "NOW" : index === 1 ? "NEXT" : "LATER"}</small>
                        <strong>{item.candidate.titleJa}</strong>
                        <span>{item.candidate.unitLabel}・{item.candidate.minutes}分</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </>
          ) : (
            <div className={styles.emptyState}>
              <span>条件に合う入口が見つかりませんでした</span>
              <h1 id="result-title">時間かアニメ設定を少し広げてみてください。</h1>
              <button className={styles.primaryButton} onClick={() => setScreen("diagnosis")} type="button">
                条件を調整する
              </button>
            </div>
          )}
        </section>
      )}

      {screen === "feedback" && recommendation && (
        <section className={styles.feedback} aria-labelledby="feedback-title">
          <button className={styles.backButton} onClick={() => setScreen("recommendation")} type="button">
            ← 入口へ戻る
          </button>
          {routeAccepted ? (
            <div className={styles.acceptedCard}>
              <span className={styles.acceptedMark}>✓</span>
              <p className={styles.kicker}>ROUTE DECIDED</p>
              <h1 id="feedback-title">最初の入口は、これで決まり。</h1>
              <p>
                「{recommendation.candidate.titleJa}」{recommendation.candidate.unitLabel}から始めます。
                実際に見たあとの感想は、保存・再開できる将来版で扱います。
              </p>
              <button className={styles.secondaryButton} onClick={() => setScreen("recommendation")} type="button">
                入口の情報をもう一度見る
              </button>
            </div>
          ) : (
            <>
              <p className={styles.kicker}>ONE QUICK DECISION</p>
              <h1 id="feedback-title">
                この入口、
                <br />
                見てみたい？
              </h1>
              <p className={styles.feedbackLead}>
                作品を見た感想ではなく、今のあなたにとって提案が魅力的かだけを教えてください。
              </p>

              <div className={styles.sentimentGrid}>
                <button
                  aria-pressed={feedback === "want_to_watch"}
                  className={feedback === "want_to_watch" ? styles.sentimentActive : ""}
                  onClick={() => setFeedback("want_to_watch")}
                  type="button"
                >
                  <span>↗</span>
                  <strong>見てみたい</strong>
                  <small>この作品を最初の入口にする</small>
                </button>
                <button
                  aria-pressed={feedback === "not_now"}
                  className={feedback === "not_now" ? styles.sentimentActive : ""}
                  onClick={() => setFeedback("not_now")}
                  type="button"
                >
                  <span>↘</span>
                  <strong>今は違う</strong>
                  <small>別の方向から提案してほしい</small>
                </button>
              </div>

              {feedback === "not_now" && (
                <fieldset className={styles.feedbackInterests}>
                  <legend>次はどの方向へ？ <small>任意</small></legend>
                  <div className={styles.interestGrid}>
                    {INTEREST_OPTIONS.map((option) => (
                      <button
                        aria-pressed={feedbackInterest === option.id}
                        className={feedbackInterest === option.id ? styles.selectedChip : ""}
                        key={option.id}
                        onClick={() => setFeedbackInterest(option.id)}
                        type="button"
                      >
                        <strong>{option.label}</strong>
                        <small>{option.description}</small>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <button
                className={styles.primaryButton}
                disabled={!feedback}
                onClick={continueFromFeedback}
                type="button"
              >
                <span>
                  <small>{feedback === "not_now" ? "方向を変えて" : "この提案で"}</small>
                  {feedback === "not_now" ? "別の入口を見る" : "最初の入口に決める"}
                </span>
                <b>→</b>
              </button>
              <p className={styles.privacyNote}>回答はこの画面の中だけで使い、保存・送信しません。</p>
            </>
          )}
        </section>
      )}

      <footer className={styles.footer}>
        <span>STAR PATH</span>
        <p>スター・ウォーズ公式とは関係のない、個人制作の非公式プロトタイプです。</p>
      </footer>
    </main>
  );
}
