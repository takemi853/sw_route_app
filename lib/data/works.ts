export type WorkConnection = {
  workId: string;
  relation: string;
};

export type Era = {
  id: string;
  labelJa: string;
  timelineRange: string;
  color: string;
};

export const ERAS: Era[] = [
  { id: "high_republic", labelJa: "ハイ・リパブリック時代", timelineRange: "BBY 400〜100", color: "#7c3aed" },
  { id: "prequel",       labelJa: "ジェダイの没落",           timelineRange: "BBY 100〜19",  color: "#1d4ed8" },
  { id: "imperial",      labelJa: "帝国時代",               timelineRange: "BBY 19〜0",    color: "#b91c1c" },
  { id: "rebellion",     labelJa: "反乱期",                 timelineRange: "BBY 5〜ABY 4", color: "#b45309" },
  { id: "new_republic",  labelJa: "新共和国時代",           timelineRange: "ABY 4〜34",    color: "#15803d" },
  { id: "sequel",        labelJa: "ファースト・オーダーの台頭", timelineRange: "ABY 34〜35",   color: "#0e7490" },
];

export type Work = {
  id: string;
  titleJa: string;
  titleEn: string;
  type: "film" | "series";
  year: number;
  seasons?: number;
  episodes?: number;
  /** 1話あたりの分数（映画は総尺） */
  minutesPerEpisode: number;
  timelineLabel: string;
  timelineOrder: number;
  eraId: string;
  synopsis: string;
  posterUrl: string;
  themes: string[];
  routeIds: string[];
  /** どのルートで必須か（routeIdsのサブセット） */
  essentialForRoutes?: string[];
  /** 入門作品としてトップに出す */
  isEntryPoint?: boolean;
  /** 入門者向けの一言コピー */
  entryNote?: string;
  connections?: WorkConnection[];
  spineColor: string;
  labelColor: string;
};

export const works: Work[] = [
  // ── ハイ・リパブリック時代 ──────────────────────────────────────
  {
    id: "acolyte",
    titleJa: "アコライト",
    titleEn: "The Acolyte",
    type: "series",
    year: 2024,
    seasons: 1,
    episodes: 8,
    timelineLabel: "BBY 100",
    timelineOrder: -100,
    eraId: "high_republic",
    synopsis:
      "共和国が全盛期を迎えた「ハイ・リパブリック」時代を舞台にした実写ドラマ。シスの影がジェダイの黄金時代に忍び寄る謎を描く、これまでとは異なる時代設定の作品。",
    posterUrl: "https://image.tmdb.org/t/p/w500/yuCKJsbzzadXh6tMUsIwZ2zaKXy.jpg",
    themes: ["ハイ・リパブリック", "シスの起源"],
    routeIds: [],
    connections: [
      { workId: "ep1", relation: "約70年後がEP1" },
    ],
    minutesPerEpisode: 45,
    spineColor: "#0f0c29",
    labelColor: "#c084fc",
  },

  // ── プリクエル時代 ──────────────────────────────────────────────
  {
    id: "ep1",
    titleJa: "ファントム・メナス",
    titleEn: "The Phantom Menace",
    type: "film",
    year: 1999,
    timelineLabel: "BBY 32",
    timelineOrder: -32,
    eraId: "prequel",
    synopsis:
      "若きアナキン・スカイウォーカーとの出会い、そして共和国を揺るがすシスの影。ジェダイ・クワイ=ガン・ジンとオビ=ワン・ケノービが銀河の平和を守ろうとするプリクエル三部作の第一作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg",
    themes: ["運命の始まり", "フォースの選ばれし者"],
    routeIds: [],
    connections: [
      { workId: "ep2", relation: "直接続く" },
    ],
    minutesPerEpisode: 136,
    spineColor: "#1a1a2e",
    labelColor: "#e0aaff",
  },
  {
    id: "ep2",
    titleJa: "クローンの攻撃",
    titleEn: "Attack of the Clones",
    type: "film",
    year: 2002,
    timelineLabel: "BBY 22",
    timelineOrder: -22,
    eraId: "prequel",
    synopsis:
      "クローン大戦の幕開け。アナキンとパドメの禁じられた愛、そして共和国とジェダイが操られた戦争へと引きずり込まれていく姿を描く。",
    posterUrl: "https://image.tmdb.org/t/p/w500/oZNPzxqM2s5DyVWab09NTQScDQt.jpg",
    themes: ["禁じられた愛", "クローン大戦の始まり"],
    routeIds: [],
    connections: [
      { workId: "clone_wars", relation: "この直後からクローン大戦が展開" },
      { workId: "ep3", relation: "直接続く" },
    ],
    minutesPerEpisode: 142,
    spineColor: "#16213e",
    labelColor: "#c8b6e2",
  },
  {
    id: "clone_wars",
    titleJa: "クローン・ウォーズ",
    titleEn: "Star Wars: The Clone Wars",
    type: "series",
    year: 2008,
    seasons: 7,
    episodes: 133,
    timelineLabel: "BBY 22〜19",
    timelineOrder: -21,
    eraId: "prequel",
    synopsis:
      "EP2とEP3の間を埋めるアニメシリーズ。アナキン・スカイウォーカーとアソーカ・タノ、クローン部隊の活躍を描く。マンダロア内戦やオーダー66の経緯も詳細に描写。",
    posterUrl: "https://image.tmdb.org/t/p/w500/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg",
    themes: ["クローン大戦", "師弟の絆"],
    routeIds: ["mandalorian_route"],
    connections: [
      { workId: "ep2", relation: "EP2直後から始まる" },
      { workId: "ep3", relation: "最終章はEP3と並行" },
      { workId: "bad_batch", relation: "最終章の直後がバッド・バッチ" },
      { workId: "rebels", relation: "アソーカがRebelでも活躍" },
    ],
    minutesPerEpisode: 22,
    spineColor: "#1a1a2e",
    labelColor: "#38bdf8",
  },
  {
    id: "ep3",
    titleJa: "シスの復讐",
    titleEn: "Revenge of the Sith",
    type: "film",
    year: 2005,
    timelineLabel: "BBY 19（オーダー66）",
    timelineOrder: -19,
    eraId: "prequel",
    synopsis:
      "アナキン・スカイウォーカーがダース・ベイダーへと堕ちる悲劇。オーダー66によるジェダイ虐殺と帝国の誕生を描く。アンドーが描く「帝国支配の時代」はこの直後から始まる。",
    posterUrl: "https://image.tmdb.org/t/p/w500/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg",
    themes: ["堕落と悲劇", "帝国の誕生"],
    routeIds: ["rogue_one_andor_route"],
    connections: [
      { workId: "bad_batch", relation: "オーダー66直後がバッド・バッチ" },
      { workId: "obi_wan", relation: "10年後がオビ=ワン" },
      { workId: "andor", relation: "この後の帝国時代をアンドーが描く" },
    ],
    minutesPerEpisode: 140,
    spineColor: "#0d0d0d",
    labelColor: "#ff6b6b",
  },

  // ── 帝国時代 ──────────────────────────────────────────────────
  {
    id: "bad_batch",
    titleJa: "バッド・バッチ",
    titleEn: "The Bad Batch",
    type: "series",
    year: 2021,
    seasons: 3,
    episodes: 47,
    timelineLabel: "BBY 19〜18",
    timelineOrder: -18,
    eraId: "imperial",
    synopsis:
      "オーダー66直後、変異クローン部隊「クローン・フォース99」が帝国誕生後の銀河を生き抜くアニメシリーズ。帝国のクローン兵器計画の廃止と新兵器への移行過程を描く。",
    posterUrl: "https://image.tmdb.org/t/p/w500/5mHus672nuinyaE0FtqvD0AddcY.jpg",
    themes: ["帝国誕生直後", "クローンの尊厳"],
    routeIds: [],
    connections: [
      { workId: "ep3", relation: "EP3直後から始まる" },
      { workId: "rebels", relation: "一部キャラがRebelに繋がる" },
    ],
    minutesPerEpisode: 30,
    spineColor: "#1c2840",
    labelColor: "#67e8f9",
  },
  {
    id: "tales_of_jedi",
    titleJa: "テイルズ・オブ・ジェダイ",
    titleEn: "Tales of the Jedi",
    type: "series",
    year: 2022,
    seasons: 1,
    episodes: 6,
    timelineLabel: "BBY 54〜19",
    timelineOrder: -17,
    eraId: "imperial",
    synopsis:
      "アソーカ・タノとカウント・ドゥークーの知られざる過去を描く短編アニメシリーズ。各話10〜15分程度で手軽に視聴できる。",
    posterUrl: "https://image.tmdb.org/t/p/w500/k3nWQb0E8mLSR8acSkJP78VRVMv.jpg",
    themes: ["ジェダイの過去", "選択と運命"],
    routeIds: [],
    connections: [
      { workId: "clone_wars", relation: "クローン大戦期のアソーカが登場" },
      { workId: "rebels", relation: "Rebelsのアソーカへ繋がる" },
    ],
    minutesPerEpisode: 14,
    spineColor: "#1a1a1a",
    labelColor: "#fde68a",
  },
  {
    id: "solo",
    titleJa: "ハン・ソロ",
    titleEn: "Solo: A Star Wars Story",
    type: "film",
    year: 2018,
    timelineLabel: "BBY 10〜9",
    timelineOrder: -10,
    eraId: "imperial",
    synopsis:
      "ハン・ソロの若き日の冒険と、チューバッカとの出会い、ミレニアム・ファルコン入手の経緯を描くスピンオフ。",
    posterUrl: "https://image.tmdb.org/t/p/w500/4oD6VEccFkorEBTEDXtpLAaz0Rl.jpg",
    themes: ["冒険と友情", "ハンの原点"],
    routeIds: [],
    connections: [
      { workId: "ep4", relation: "EP4でハン・ソロとして登場" },
    ],
    minutesPerEpisode: 135,
    spineColor: "#1c1c1c",
    labelColor: "#d4af37",
  },
  {
    id: "obi_wan",
    titleJa: "オビ=ワン・ケノービ",
    titleEn: "Obi-Wan Kenobi",
    type: "series",
    year: 2022,
    seasons: 1,
    episodes: 6,
    timelineLabel: "BBY 9",
    timelineOrder: -9,
    eraId: "imperial",
    synopsis:
      "EP3から10年後、砂漠の惑星タトゥイーンに隠遁するオビ=ワンが、帝国の魔の手からルークを守りながらかつての弟子・ダース・ベイダーと再び向き合う。",
    posterUrl: "https://image.tmdb.org/t/p/w500/4Lok3HBSfbQxibQZBygoVCwKKrZ.jpg",
    themes: ["師と弟子の再会", "罪と贖罪"],
    routeIds: ["rogue_one_andor_route"],
    connections: [
      { workId: "ep3", relation: "EP3の10年後" },
      { workId: "andor", relation: "ほぼ同時代（帝国全盛期）" },
      { workId: "ep4", relation: "EP4へ繋がる" },
    ],
    minutesPerEpisode: 45,
    spineColor: "#1a2744",
    labelColor: "#93c5fd",
  },
  {
    id: "rebels",
    titleJa: "反乱者たち",
    titleEn: "Star Wars Rebels",
    type: "series",
    year: 2014,
    seasons: 4,
    episodes: 75,
    timelineLabel: "BBY 5〜0",
    timelineOrder: -5,
    eraId: "imperial",
    synopsis:
      "帝国支配下の銀河で活動するスペクターズを中心とした反乱前夜の物語。ボ=カターンやマンダロア内戦の描写があり、マンダロリアンのロアを深く理解するために必須のアニメシリーズ。",
    posterUrl: "https://image.tmdb.org/t/p/w500/eLrScs6Bs26JMcS8hiZhf7YRROr.jpg",
    themes: ["反乱の萌芽", "マンダロアの内戦"],
    routeIds: ["mandalorian_route", "rogue_one_andor_route"],
    connections: [
      { workId: "andor", relation: "同時代の別視点" },
      { workId: "rogue_one", relation: "最終章はローグ・ワン直前" },
      { workId: "ahsoka", relation: "エズラ・ブリッジャーがアソーカへ続く" },
    ],
    minutesPerEpisode: 22,
    spineColor: "#1c2e1c",
    labelColor: "#86efac",
  },

  // ── 反乱期 ──────────────────────────────────────────────────────
  {
    id: "andor",
    titleJa: "アンドー",
    titleEn: "Andor",
    type: "series",
    year: 2022,
    seasons: 2,
    episodes: 24,
    timelineLabel: "BBY 5〜0",
    timelineOrder: -4,
    eraId: "rebellion",
    synopsis:
      "ローグワンの主人公・キャシアン・アンドーの前日譚。帝国の支配下で普通の人々がいかに覚醒し、反乱へと踏み出すかを政治スリラーとして描く。ジェダイもフォースも中心にない、SWで最も人間的な物語。",
    posterUrl: "https://image.tmdb.org/t/p/w500/iea0VuThfDZmhOA4cyj4HBgsOT6.jpg",
    themes: ["覚醒と犠牲", "帝国の支配", "反乱の起源"],
    routeIds: ["rogue_one_andor_route"],
    connections: [
      { workId: "rogue_one", relation: "直接続く（S2の最終章がローグワン直前）" },
      { workId: "rebels", relation: "同時代の別視点" },
    ],
    minutesPerEpisode: 43,
    isEntryPoint: true,
    essentialForRoutes: ["rogue_one_andor_route"],
    entryNote: "1〜3話で一気に引き込まれる。映画を見たことがなくても大丈夫。",
    spineColor: "#1c3047",
    labelColor: "#e2e8f0",
  },
  {
    id: "rogue_one",
    titleJa: "ローグ・ワン",
    titleEn: "Rogue One: A Star Wars Story",
    type: "film",
    year: 2016,
    timelineLabel: "BBY 0",
    timelineOrder: -0.5,
    eraId: "rebellion",
    synopsis:
      "帝国の惑星破壊兵器「デス・スター」の設計図を盗み出すために命を懸けた名もなき反乱者たちの物語。希望を次の世代へ繋ぐため、誰も英雄と呼ばれなかった者たちが最後の使命を果たす。",
    posterUrl: "https://image.tmdb.org/t/p/w500/fFWc9VmWtj3fpTYC07h5RDUT3fB.jpg",
    themes: ["犠牲と希望", "名もなき英雄"],
    routeIds: ["rogue_one_andor_route"],
    connections: [
      { workId: "andor", relation: "アンドーの直後" },
      { workId: "ep4", relation: "EP4の直前（設計図がEP4へ渡る）" },
    ],
    minutesPerEpisode: 133,
    essentialForRoutes: ["rogue_one_andor_route"],
    spineColor: "#2d3748",
    labelColor: "#fed7aa",
  },
  {
    id: "ep4",
    titleJa: "新たなる希望",
    titleEn: "A New Hope",
    type: "film",
    year: 1977,
    timelineLabel: "BBY 0（ヤヴィンの戦い）",
    timelineOrder: 0,
    eraId: "rebellion",
    synopsis:
      "砂漠の惑星タトゥイーンで育った青年ルーク・スカイウォーカーが、帝国に立ち向かう反乱同盟軍と出会い、デス・スター破壊に挑む物語。スターウォーズ全シリーズの起点となる第一作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Ukkz0fbIzwpNEGdhzOdXXWSpXe.jpg",
    themes: ["英雄の旅立ち", "希望"],
    routeIds: ["rogue_one_andor_route", "mandalorian_route"],
    connections: [
      { workId: "rogue_one", relation: "ローグ・ワンの直後" },
      { workId: "ep5", relation: "直接続く" },
    ],
    minutesPerEpisode: 121,
    spineColor: "#374151",
    labelColor: "#fbbf24",
  },
  {
    id: "ep5",
    titleJa: "帝国の逆襲",
    titleEn: "The Empire Strikes Back",
    type: "film",
    year: 1980,
    timelineLabel: "ABY 3",
    timelineOrder: 3,
    eraId: "rebellion",
    synopsis:
      "反乱同盟軍が帝国の猛反撃を受ける中、ルークはヨーダのもとでジェダイとしての訓練を積む。ダース・ベイダーとの衝撃の対決が待ち受ける、スターウォーズ最高傑作の呼び声高い第二作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/mbLTbU4zqdY1nOQP9OTxj9LeRTL.jpg",
    themes: ["成長と試練", "闇との対決"],
    routeIds: [],
    connections: [
      { workId: "ep4", relation: "EP4の3年後" },
      { workId: "ep6", relation: "直接続く" },
    ],
    minutesPerEpisode: 124,
    spineColor: "#1f2937",
    labelColor: "#f9fafb",
  },
  {
    id: "ep6",
    titleJa: "ジェダイの帰還",
    titleEn: "Return of the Jedi",
    type: "film",
    year: 1983,
    timelineLabel: "ABY 4（エンドアの戦い）",
    timelineOrder: 4,
    eraId: "rebellion",
    synopsis:
      "ルークと仲間たちが帝国に最後の決戦を挑む。エンドアの戦いで帝国は崩壊し、銀河に新たな時代が始まる。マンダロリアンはこの約5年後の世界を描く。",
    posterUrl: "https://image.tmdb.org/t/p/w500/tmQ9HzBvXzYuTP1qwVAoYXQvTU1.jpg",
    themes: ["救済と決別", "帝国の終焉"],
    routeIds: ["mandalorian_route"],
    connections: [
      { workId: "ep5", relation: "EP5の直後" },
      { workId: "mandalorian", relation: "この約5年後がマンダロリアン" },
    ],
    minutesPerEpisode: 131,
    spineColor: "#1f2937",
    labelColor: "#6ee7b7",
  },

  // ── 新共和国時代 ──────────────────────────────────────────────
  {
    id: "mandalorian",
    titleJa: "マンダロリアン",
    titleEn: "The Mandalorian",
    type: "series",
    year: 2019,
    seasons: 3,
    episodes: 24,
    timelineLabel: "ABY 9〜10",
    timelineOrder: 9,
    eraId: "new_republic",
    synopsis:
      "帝国崩壊後の銀河を舞台に、鉄の兜を外さない賞金稼ぎ・ディン・ジャリンが、謎の子ども「グローグー」を守るために旅する物語。ジェダイでもシスでもない戦士の掟（The Way）と、失われた故郷を取り戻す戦士の民の叙事詩。",
    posterUrl: "https://image.tmdb.org/t/p/w500/89ITO0p4bPTD0Hh4Yuvk3XtHjN2.jpg",
    themes: ["掟と帰属", "失われた故郷", "義父と子"],
    routeIds: ["mandalorian_route"],
    connections: [
      { workId: "ep6", relation: "EP6の約5年後" },
      { workId: "boba_fett", relation: "並行して描かれる（Ch.5-6は本作の続き）" },
      { workId: "ahsoka", relation: "S3後にアソーカへ続く" },
    ],
    minutesPerEpisode: 40,
    isEntryPoint: true,
    essentialForRoutes: ["mandalorian_route"],
    entryNote: "1話から完結している。SWを全く知らなくても楽しめる。",
    spineColor: "#2d3748",
    labelColor: "#e2e8f0",
  },
  {
    id: "boba_fett",
    titleJa: "ボバ・フェットの書",
    titleEn: "The Book of Boba Fett",
    type: "series",
    year: 2021,
    seasons: 1,
    episodes: 7,
    timelineLabel: "ABY 9〜10",
    timelineOrder: 9.5,
    eraId: "new_republic",
    synopsis:
      "伝説の賞金稼ぎ・ボバ・フェットがタトゥイーンの支配者として君臨しようとする物語。第5・6話はマンダロリアンの続編エピソードとして機能し、マンダロリアンルートの視聴に必須。",
    posterUrl: "https://image.tmdb.org/t/p/w500/zND8lnBPAOiEvD2TyUifx3eJ6nh.jpg",
    themes: ["権力と信義", "砂漠の掟"],
    routeIds: ["mandalorian_route"],
    connections: [
      { workId: "mandalorian", relation: "並行して描かれる（Ch.5-6は実質マンダロリアン）" },
      { workId: "ahsoka", relation: "アソーカが登場" },
    ],
    minutesPerEpisode: 40,
    essentialForRoutes: ["mandalorian_route"],
    spineColor: "#744210",
    labelColor: "#fefce8",
  },
  {
    id: "ahsoka",
    titleJa: "アソーカ",
    titleEn: "Ahsoka",
    type: "series",
    year: 2023,
    seasons: 1,
    episodes: 8,
    timelineLabel: "ABY 9〜10",
    timelineOrder: 10,
    eraId: "new_republic",
    synopsis:
      "元ジェダイ・アソーカ・タノが行方不明のグランド・アドミラル・スラーンを追う物語。マンダロリアンS3後のサボ・ウォレンとの合流点にあたり、マンダロリアンルートの続きとして位置づけられる。",
    posterUrl: "https://image.tmdb.org/t/p/w500/m4umt8sTfxwqEZCQ3klKNKtFqZZ.jpg",
    themes: ["師と弟子", "銀河の均衡"],
    routeIds: ["mandalorian_route"],
    connections: [
      { workId: "mandalorian", relation: "マンダロリアンS3の後" },
      { workId: "rebels", relation: "Rebelsのエズラ・ブリッジャーが再登場" },
    ],
    minutesPerEpisode: 45,
    spineColor: "#1a365d",
    labelColor: "#bee3f8",
  },

  // ── セクエル時代 ──────────────────────────────────────────────
  {
    id: "ep7",
    titleJa: "フォースの覚醒",
    titleEn: "The Force Awakens",
    type: "film",
    year: 2015,
    timelineLabel: "ABY 34",
    timelineOrder: 34,
    eraId: "sequel",
    synopsis:
      "帝国崩壊から30年後、ファースト・オーダーが台頭する中、砂漠の惑星ジャクーで生きる少女レイがフォースの力に目覚める。セクエル三部作の第一作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg",
    themes: ["新たな世代", "フォースの覚醒"],
    routeIds: [],
    connections: [
      { workId: "ep6", relation: "EP6の30年後" },
      { workId: "ep8", relation: "直接続く" },
    ],
    minutesPerEpisode: 138,
    spineColor: "#1a1a2e",
    labelColor: "#f9fafb",
  },
  {
    id: "ep8",
    titleJa: "最後のジェダイ",
    titleEn: "The Last Jedi",
    type: "film",
    year: 2017,
    timelineLabel: "ABY 34",
    timelineOrder: 34.5,
    eraId: "sequel",
    synopsis:
      "レイがルーク・スカイウォーカーのもとで修行を積む一方、レジスタンスはファースト・オーダーの追撃から逃れようとする。ジェダイの遺産と継承を問い直す問題作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    themes: ["継承と断絶", "ジェダイの終わりと始まり"],
    routeIds: [],
    connections: [
      { workId: "ep7", relation: "EP7の直後" },
      { workId: "ep9", relation: "直接続く" },
    ],
    minutesPerEpisode: 152,
    spineColor: "#1c1c2e",
    labelColor: "#f9fafb",
  },
  {
    id: "ep9",
    titleJa: "スカイウォーカーの夜明け",
    titleEn: "The Rise of Skywalker",
    type: "film",
    year: 2019,
    timelineLabel: "ABY 35",
    timelineOrder: 35,
    eraId: "sequel",
    synopsis:
      "スカイウォーカー・サーガの完結編。パルパティーンの復活という脅威の前に、レイと仲間たちが最後の決戦に臨む。9作に渡るサーガの幕を閉じる。",
    posterUrl: "https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg",
    themes: ["サーガの完結", "光と闇の決着"],
    routeIds: [],
    connections: [
      { workId: "ep8", relation: "EP8の1年後" },
    ],
    minutesPerEpisode: 141,
    spineColor: "#0d1117",
    labelColor: "#fbbf24",
  },
];

export function getWorksByRoute(routeId: string): Work[] {
  return works.filter((w) => w.routeIds.includes(routeId));
}

export function getWorksSortedByTimeline(): Work[] {
  return [...works].sort((a, b) => a.timelineOrder - b.timelineOrder);
}

export function getWorksByEra(): { era: Era; works: Work[] }[] {
  return ERAS.map((era) => ({
    era,
    works: works
      .filter((w) => w.eraId === era.id)
      .sort((a, b) => a.timelineOrder - b.timelineOrder),
  })).filter((e) => e.works.length > 0);
}
