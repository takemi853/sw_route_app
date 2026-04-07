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
      "ルークと仲間たちが帝国に最後の決戦を挑む。エンドアの戦いで帝国は崩壊し、銀河に新たな時代が始まる。マンダロリアンはこの約5年後の世界を描く。なおアンドーはこれより前、帝国全盛期（EP3〜EP4の間）の物語。",
    posterUrl: "https://image.tmdb.org/t/p/w500/tmQ9HzBvXzYuTP1qwVAoYXQvTU1.jpg",
    themes: ["救済と決別", "帝国の終焉"],
    routeIds: ["mandalorian_route", "rogue_one_andor_route"],
    spineColor: "#1f2937",
    labelColor: "#6ee7b7",
  },
];

export function getWorksByRoute(routeId: string): Work[] {
  return works.filter((w) => w.routeIds.includes(routeId));
}
