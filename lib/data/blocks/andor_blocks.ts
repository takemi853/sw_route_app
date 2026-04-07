import type { PageBlock } from "@/lib/types";

// ────────────────────────────────────────────────
// ローグワン・アンドールート ブロック群
// ────────────────────────────────────────────────

export const andor_hook: PageBlock = {
  id: "andor_hook",
  routeId: "rogue_one_andor_route",
  kind: "hook",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "帝国が銀河を支配していた時代——剣で戦う英雄でも、フォースを持つ者でもない、ただの人々が何かを変えようとしていました。\nこのルートは、その「名もなき者たち」の物語です。",
    intermediate:
      "ジェダイもフォースも中心にない。帝国の支配に抗う、ごく普通の人間たちの反乱前夜——それがアンドー/ローグワンルートの本質です。",
    advanced:
      "反乱同盟軍の成立過程を、草の根の政治的覚醒と個人の倫理的妥協を通じて描く。\n特に『アンドー』は、SWとしてより政治スリラーとして評価されるべき作品。",
  },
};

export const andor_route_why: PageBlock = {
  id: "andor_route_why",
  routeId: "rogue_one_andor_route",
  kind: "route_why",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "「スターウォーズって、結局ジェダイの話でしょ？」と思っていませんか。\nこのルートにジェダイはほぼ登場しません。\nあるのは、支配される側の人間たちが「もう黙っていられない」と気づいていく過程です。",
    intermediate:
      "反乱同盟軍がどうやって生まれたのかを描くルート。\nフォースの神秘より、組織の論理・裏切り・犠牲という現実的なドラマが中心です。SWに政治ドラマとしての深みを感じたい人向け。",
    advanced:
      "カノンにおける反乱の起源を最も丁寧に描くルート。\n『アンドー』はShowrunner Tony GilroyがGareth Edwards版ローグワンと意図的に断絶させたと語っており、SW的文脈を持ちながらジャンルとしては政治スリラーに近い。",
  },
};

export const andor_world: PageBlock = {
  id: "andor_world",
  routeId: "rogue_one_andor_route",
  kind: "world",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "帝国が銀河を治めていた時代——監視、検問、徴税、強制移住。\nフォースを持たない普通の人々は、毎日その重さの下で生きています。\nここはその人たちの話です。",
    intermediate:
      "帝国の全盛期、反乱同盟軍がまだ形になっていない時代。\n星系ごとに帝国の締め付け方が違い、ある星は静かに、ある星は露骨に支配されています。\nキャシアン・アンドーはそんな辺境の星で育ちました。",
    advanced:
      "BBY（Battle of Yavin基準）5年前。ISB（帝国保安局）が内部統制を強化し始めた時期で、反乱の萌芽に対して過剰反応し始めた頃。\nFerrix等の採掘・工業系辺境惑星は帝国の経済収奪の最前線。",
  },
  glossaryTerms: [
    { term: "帝国保安局（ISB）", note: "帝国の秘密警察。反乱分子の監視・逮捕を担う。" },
    { term: "BBY", note: "SWの年代表記。ヤヴィンの戦い（映画第1作の決戦）を基準年とした逆算。" },
  ],
};

export const andor_character: PageBlock = {
  id: "andor_character",
  routeId: "rogue_one_andor_route",
  kind: "character",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "主人公はキャシアン・アンドー。\n故郷を帝国に奪われ、盗み働きで生きてきた男です。\nヒーローではありません。でも、何かを失い続けた人間が、最後に何かを選ぶ話です。",
    intermediate:
      "キャシアン・アンドー：傭兵から反乱同盟員へと変わっていく男。『ローグワン』の結末を知っていると、この物語の重みが倍になります。\nルーセン・レイエル：反乱の組織化を水面下で進める謀略家。",
    advanced:
      "キャシアンの出自はKenari出身の引き取られた子（孤児）。幼少期の植民地的収奪体験がイデオロギー的覚醒の土台。\nルーセンはMon Mothmaとの連携を通じて反乱同盟軍の前身を組織化するが、手段の倫理性については作中で一貫して問われる。",
  },
};

export const andor_theme: PageBlock = {
  id: "andor_theme",
  routeId: "rogue_one_andor_route",
  kind: "theme",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "このルートのテーマは「覚醒」です。\n普通に生きていた人が、ある日「これはおかしい」と気づく瞬間——その積み重ねが反乱を作ります。\n英雄の話ではなく、人間の話です。",
    intermediate:
      "「どこまで妥協できるか」が全編のテーマです。\n反乱に加わるとは、倫理的な汚れを引き受けることでもある。\nアンドー/ローグワンは、その代償を正面から描いています。",
    advanced:
      "個人の政治的覚醒と、組織の目的論的暴力の正当化が並走する構造。\nローグワン本編で「死によって完成する」物語を、アンドーはその前史として「生きながら変容する」物語として機能させている。\n犠牲の意味論がシリーズ全体の通奏低音。",
  },
};

export const andor_cta_no_spoiler: PageBlock = {
  id: "andor_cta_no_spoiler",
  routeId: "rogue_one_andor_route",
  kind: "cta",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "まず見るべきは『アンドー』シーズン1（全12話）。\n1〜3話が第一の事件として繋がっています。3話まで見れば、続きが気になるはずです。\nローグワン本編はその後で見ると、感情の振れ幅が大きくなります。",
    intermediate:
      "推奨順：『アンドー』S1 → 『ローグワン』\n時系列的にはアンドーが先（ローグワンの約5年前から描く）。\nローグワンを先に見ていても、アンドーから入っても楽しめます。",
    advanced:
      "アンドーS1はBBY5〜4年相当。S2はBBY4〜0（ローグワン直前）まで描き、2025年4月に配信済み。\nカノン的補完として『Rebels』S1-2（Mon Mothma / Phoenix Squadron）との接続も有効。",
  },
};

export const andor_cta_with_spoiler: PageBlock = {
  id: "andor_cta_with_spoiler",
  routeId: "rogue_one_andor_route",
  kind: "cta",
  spoilerLevel: 2,
  requiresSeen: ["andor_s1"],
  bodyVariants: {
    beginner:
      "『アンドー』S1を見たなら、次は『ローグワン』へ。\nキャシアンが選んだ道の「終着点」が待っています。",
    intermediate:
      "アンドーS1を完走したなら、ローグワンのジンとキャシアンの関係性が別の重みで見えるはず。\nS2は直接ローグワン本編に繋がります。",
    advanced:
      "アンドーS2の最終エピソードはローグワン冒頭と時系列的に接続する。\nデドラ・ミーロ（Dedra Meero）/ ISBライン、Mon Mothmaの資金調達問題の決着が見どころ。",
  },
};
