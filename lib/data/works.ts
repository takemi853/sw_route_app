export type Work = {
  id: string;
  titleJa: string;
  titleEn: string;
  type: "film" | "series";
  year: number;
  seasons?: number;
  episodes?: number;
  timelineLabel: string;
  synopsis: string;
  posterUrl: string;      // TMDB poster image URL
  themes: string[];
  routeIds: string[];
  spineColor: string;
  labelColor: string;
};

export const works: Work[] = [
  {
    id: "mandalorian",
    titleJa: "マンダロリアン",
    titleEn: "The Mandalorian",
    type: "series",
    year: 2019,
    seasons: 3,
    episodes: 24,
    timelineLabel: "ABY 9〜10",
    synopsis:
      "帝国崩壊後の銀河を舞台に、鉄の兜を外さない賞金稼ぎ・ディン・ジャリンが、謎の子ども「グローグー」を守るために旅する物語。ジェダイでもシスでもない戦士の掟（The Way）と、失われた故郷を取り戻す戦士の民の叙事詩。",
    posterUrl: "https://image.tmdb.org/t/p/w500/89ITO0p4bPTD0Hh4Yuvk3XtHjN2.jpg",
    themes: ["掟と帰属", "失われた故郷", "義父と子"],
    routeIds: ["mandalorian_route"],
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
    synopsis:
      "伝説の賞金稼ぎ・ボバ・フェットがタトゥイーンの支配者として君臨しようとする物語。第5・6話はマンダロリアンの続編エピソードとして機能し、マンダロリアンルートの視聴に必須。",
    posterUrl: "https://image.tmdb.org/t/p/w500/zND8lnBPAOiEvD2TyUifx3eJ6nh.jpg",
    themes: ["権力と信義", "砂漠の掟"],
    routeIds: ["mandalorian_route"],
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
    synopsis:
      "元ジェダイ・アソーカ・タノが行方不明のグランド・アドミラル・スラーンを追う物語。マンダロリアンS3後のサボ・ウォレンとの合流点にあたり、マンダロリアンルートの続きとして位置づけられる。",
    posterUrl: "https://image.tmdb.org/t/p/w500/m4umt8sTfxwqEZCQ3klKNKtFqZZ.jpg",
    themes: ["師と弟子", "銀河の均衡"],
    routeIds: ["mandalorian_route"],
    spineColor: "#1a365d",
    labelColor: "#bee3f8",
  },
  {
    id: "andor",
    titleJa: "アンドー",
    titleEn: "Andor",
    type: "series",
    year: 2022,
    seasons: 2,
    episodes: 24,
    timelineLabel: "BBY 5〜0",
    synopsis:
      "ローグワンの主人公・キャシアン・アンドーの前日譚。帝国の支配下で普通の人々がいかに覚醒し、反乱へと踏み出すかを政治スリラーとして描く。ジェダイもフォースも中心にない、SWで最も人間的な物語。",
    posterUrl: "https://image.tmdb.org/t/p/w500/iea0VuThfDZmhOA4cyj4HBgsOT6.jpg",
    themes: ["覚醒と犠牲", "帝国の支配", "反乱の起源"],
    routeIds: ["rogue_one_andor_route"],
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
    synopsis:
      "帝国の惑星破壊兵器「デス・スター」の設計図を盗み出すために命を懸けた名もなき反乱者たちの物語。希望を次の世代へ繋ぐため、誰も英雄と呼ばれなかった者たちが最後の使命を果たす。",
    posterUrl: "https://image.tmdb.org/t/p/w500/fFWc9VmWtj3fpTYC07h5RDUT3fB.jpg",
    themes: ["犠牲と希望", "名もなき英雄"],
    routeIds: ["rogue_one_andor_route"],
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
    synopsis:
      "砂漠の惑星タトゥイーンで育った青年ルーク・スカイウォーカーが、帝国に立ち向かう反乱同盟軍と出会い、デス・スター破壊に挑む物語。スターウォーズ全シリーズの起点となる第一作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Ukkz0fbIzwpNEGdhzOdXXWSpXe.jpg",
    themes: ["英雄の旅立ち", "希望"],
    routeIds: ["rogue_one_andor_route", "mandalorian_route"],
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
    synopsis:
      "反乱同盟軍が帝国の猛反撃を受ける中、ルークはヨーダのもとでジェダイとしての訓練を積む。ダース・ベイダーとの衝撃の対決が待ち受ける、スターウォーズ最高傑作の呼び声高い第二作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/mbLTbU4zqdY1nOQP9OTxj9LeRTL.jpg",
    themes: ["成長と試練", "闇との対決"],
    routeIds: [],
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
    synopsis:
      "ルークと仲間たちが帝国に最後の決戦を挑む。エンドアの戦いで帝国は崩壊し、銀河に新たな時代が始まる。マンダロリアンはこの約5年後の世界を描く。",
    posterUrl: "https://image.tmdb.org/t/p/w500/tmQ9HzBvXzYuTP1qwVAoYXQvTU1.jpg",
    themes: ["救済と決別", "帝国の終焉"],
    routeIds: ["mandalorian_route"],
    spineColor: "#1f2937",
    labelColor: "#6ee7b7",
  },

  // ── プリクエル三部作 ──────────────────────────────────────────────
  {
    id: "ep1",
    titleJa: "ファントム・メナス",
    titleEn: "The Phantom Menace",
    type: "film",
    year: 1999,
    timelineLabel: "BBY 32",
    synopsis:
      "若きアナキン・スカイウォーカーとの出会い、そして共和国を揺るがすシスの影。ジェダイ・クワイ=ガン・ジンとオビ=ワン・ケノービが銀河の平和を守ろうとするプリクエル三部作の第一作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg",
    themes: ["運命の始まり", "フォースの選ばれし者"],
    routeIds: [],
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
    synopsis:
      "クローン大戦の幕開け。アナキンとパドメの禁じられた愛、そして共和国とジェダイが操られた戦争へと引きずり込まれていく姿を描く。",
    posterUrl: "https://image.tmdb.org/t/p/w500/oZNPzxqM2s5DyVWab09NTQScDQt.jpg",
    themes: ["禁じられた愛", "クローン大戦の始まり"],
    routeIds: [],
    spineColor: "#16213e",
    labelColor: "#c8b6e2",
  },
  {
    id: "ep3",
    titleJa: "シスの復讐",
    titleEn: "Revenge of the Sith",
    type: "film",
    year: 2005,
    timelineLabel: "BBY 19（オーダー66）",
    synopsis:
      "アナキン・スカイウォーカーがダース・ベイダーへと堕ちる悲劇。オーダー66によるジェダイ虐殺と帝国の誕生を描く。アンドーが描く「帝国支配の時代」はこの直後から始まる。",
    posterUrl: "https://image.tmdb.org/t/p/w500/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg",
    themes: ["堕落と悲劇", "帝国の誕生"],
    routeIds: ["rogue_one_andor_route"],
    spineColor: "#0d0d0d",
    labelColor: "#ff6b6b",
  },

  // ── セクエル三部作 ──────────────────────────────────────────────
  {
    id: "ep7",
    titleJa: "フォースの覚醒",
    titleEn: "The Force Awakens",
    type: "film",
    year: 2015,
    timelineLabel: "ABY 34",
    synopsis:
      "帝国崩壊から30年後、ファースト・オーダーが台頭する中、砂漠の惑星ジャクーで生きる少女レイがフォースの力に目覚める。セクエル三部作の第一作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg",
    themes: ["新たな世代", "フォースの覚醒"],
    routeIds: [],
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
    synopsis:
      "レイがルーク・スカイウォーカーのもとで修行を積む一方、レジスタンスはファースト・オーダーの追撃から逃れようとする。ジェダイの遺産と継承を問い直す問題作。",
    posterUrl: "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    themes: ["継承と断絶", "ジェダイの終わりと始まり"],
    routeIds: [],
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
    synopsis:
      "スカイウォーカー・サーガの完結編。パルパティーンの復活という脅威の前に、レイと仲間たちが最後の決戦に臨む。9作に渡るサーガの幕を閉じる。",
    posterUrl: "https://image.tmdb.org/t/p/w500/db32LaOibwEliAmSL2jjDF6oDdj.jpg",
    themes: ["サーガの完結", "光と闇の決着"],
    routeIds: [],
    spineColor: "#0d1117",
    labelColor: "#fbbf24",
  },

  // ── スピンオフ映画 ──────────────────────────────────────────────
  {
    id: "solo",
    titleJa: "ハン・ソロ／スター・ウォーズ・ストーリー",
    titleEn: "Solo: A Star Wars Story",
    type: "film",
    year: 2018,
    timelineLabel: "BBY 10〜9",
    synopsis:
      "ハン・ソロの若き日の冒険と、チューバッカとの出会い、ミレニアム・ファルコン入手の経緯を描くスピンオフ。",
    posterUrl: "https://image.tmdb.org/t/p/w500/4oD6VEccFkorEBTEDXtpLAaz0Rl.jpg",
    themes: ["冒険と友情", "ハンの原点"],
    routeIds: [],
    spineColor: "#1c1c1c",
    labelColor: "#d4af37",
  },

  // ── ディズニー+ ドラマシリーズ（追加） ──────────────────────────
  {
    id: "obi_wan",
    titleJa: "オビ=ワン・ケノービ",
    titleEn: "Obi-Wan Kenobi",
    type: "series",
    year: 2022,
    seasons: 1,
    episodes: 6,
    timelineLabel: "BBY 9",
    synopsis:
      "EP3から10年後、砂漠の惑星タトゥイーンに隠遁するオビ=ワンが、帝国の魔の手からルークを守りながらかつての弟子・ダース・ベイダーと再び向き合う。",
    posterUrl: "https://image.tmdb.org/t/p/w500/4Lok3HBSfbQxibQZBygoVCwKKrZ.jpg",
    themes: ["師と弟子の再会", "罪と贖罪"],
    routeIds: ["rogue_one_andor_route"],
    spineColor: "#1a2744",
    labelColor: "#93c5fd",
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
    synopsis:
      "EP2とEP3の間を埋めるアニメシリーズ。アナキン・スカイウォーカーとアソーカ・タノ、クローン部隊の活躍を描く。マンダロア内戦やオーダー66の経緯も詳細に描写。",
    posterUrl: "https://image.tmdb.org/t/p/w500/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg",
    themes: ["クローン大戦", "師弟の絆"],
    routeIds: ["mandalorian_route"],
    spineColor: "#1a1a2e",
    labelColor: "#38bdf8",
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
    synopsis:
      "帝国支配下の銀河で活動するスペクターズを中心とした反乱前夜の物語。ボ=カターンやマンダロア内戦の描写があり、マンダロリアンのロアを深く理解するために必須のアニメシリーズ。",
    posterUrl: "https://image.tmdb.org/t/p/w500/eLrScs6Bs26JMcS8hiZhf7YRROr.jpg",
    themes: ["反乱の萌芽", "マンダロアの内戦"],
    routeIds: ["mandalorian_route", "rogue_one_andor_route"],
    spineColor: "#1c2e1c",
    labelColor: "#86efac",
  },
  {
    id: "bad_batch",
    titleJa: "バッド・バッチ",
    titleEn: "The Bad Batch",
    type: "series",
    year: 2021,
    seasons: 3,
    episodes: 47,
    timelineLabel: "BBY 19〜18",
    synopsis:
      "オーダー66直後、変異クローン部隊「クローン・フォース99」が帝国誕生後の銀河を生き抜くアニメシリーズ。帝国のクローン兵器計画の廃止と新兵器への移行過程を描く。",
    posterUrl: "https://image.tmdb.org/t/p/w500/5mHus672nuinyaE0FtqvD0AddcY.jpg",
    themes: ["帝国誕生直後", "クローンの尊厳"],
    routeIds: [],
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
    synopsis:
      "アソーカ・タノとカウント・ドゥークーの知られざる過去を描く短編アニメシリーズ。各話10〜15分程度で手軽に視聴できる。",
    posterUrl: "https://image.tmdb.org/t/p/w500/k3nWQb0E8mLSR8acSkJP78VRVMv.jpg",
    themes: ["ジェダイの過去", "選択と運命"],
    routeIds: [],
    spineColor: "#1a1a1a",
    labelColor: "#fde68a",
  },
  {
    id: "acolyte",
    titleJa: "アコライト",
    titleEn: "The Acolyte",
    type: "series",
    year: 2024,
    seasons: 1,
    episodes: 8,
    timelineLabel: "BBY 100（ハイ・リパブリック時代）",
    synopsis:
      "共和国が全盛期を迎えた「ハイ・リパブリック」時代を舞台にした実写ドラマ。シスの影がジェダイの黄金時代に忍び寄る謎を描く、これまでとは異なる時代設定の作品。",
    posterUrl: "https://image.tmdb.org/t/p/w500/yuCKJsbzzadXh6tMUsIwZ2zaKXy.jpg",
    themes: ["ハイ・リパブリック", "シスの起源"],
    routeIds: [],
    spineColor: "#0f0c29",
    labelColor: "#c084fc",
  },
];

export function getWorksByRoute(routeId: string): Work[] {
  return works.filter((w) => w.routeIds.includes(routeId));
}
