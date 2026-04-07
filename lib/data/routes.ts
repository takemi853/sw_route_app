import type { Route } from "../types";

export const routes: Route[] = [
  {
    id: "mandalorian_route",
    titleJa: "マンダロリアンルート",
    themes: ["掟と帰属", "失われた故郷", "戦士の民", "義父と子"],
    recommendedFor: "ジェダイ/フォース抜きで、シンプルに深いドラマを楽しみたい人",
    blockOrder: [
      "mandalorian_hook",
      "mandalorian_route_why",
      "mandalorian_world",
      "mandalorian_character",
      "mandalorian_theme",
      "mandalorian_cta",
    ],
  },
  {
    id: "rogue_one_andor_route",
    titleJa: "ローグワン・アンドールート",
    themes: ["帝国の支配", "名もなき抵抗", "覚醒と犠牲", "反乱の起源"],
    recommendedFor: "政治ドラマ・人間ドラマとしてSWを楽しみたい人",
    blockOrder: [
      "andor_hook",
      "andor_route_why",
      "andor_world",
      "andor_character",
      "andor_theme",
      "andor_cta_no_spoiler",
      "andor_cta_with_spoiler", // spoilerLevel:2 かつ andor_s1 視聴済みの人だけ表示
    ],
  },
];
