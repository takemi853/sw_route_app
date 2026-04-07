import type { PageBlock } from "@/lib/types";

// ────────────────────────────────────────────────
// マンダロリアンルート ブロック群
// ────────────────────────────────────────────────

export const mandalorian_hook: PageBlock = {
  id: "mandalorian_hook",
  routeId: "mandalorian_route",
  kind: "hook",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "剣と銃を持ち、鉄の仮面を外さない戦士がいます。\n彼はひとりの子どもを守るために、銀河を渡り続けます。\nジェダイでも帝国軍でもない——でも、誰よりも強い意志を持つ男の話です。",
    intermediate:
      "マンダロリアン：掟（The Way）に生きる賞金稼ぎが、グローグーという謎の子どもと旅する物語。\nジェダイ/シスの二項対立の外側で描かれる、帰属と信義の叙事詩です。",
    advanced:
      "ポスト『Return of the Jedi』の権力真空を背景に、マンダロアの文化的継承問題を軸に据えた作品。\nNight of a Thousand Tears（千の涙の夜）以降に断絶した「The Way」信仰者が、ジェダイ・シスとは別軸でどう自己定義するかが主題。",
  },
};

export const mandalorian_route_why: PageBlock = {
  id: "mandalorian_route_why",
  routeId: "mandalorian_route",
  kind: "route_why",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "スターウォーズというと「フォース」や「ジェダイ」が中心のイメージがありますが、このルートはほぼ関係ありません。\n「仮面の戦士と迷子の子ども」という、もっとシンプルで深い話から始められます。",
    intermediate:
      "フォース側の物語に疲れたなら、このルートへ。\nマンダロリアンはジェダイの掟とは別の価値観——「The Way」——で動く人物です。SW知識ゼロでも楽しめますが、知識があるとさらに刺さります。",
    advanced:
      "Legends設定とのカノン整合、マンダロア内戦の背景、Night of a Thousand Tearsへの言及など、ロア知識があると脚本の密度が全く変わります。S3以降は特に。",
  },
};

export const mandalorian_world: PageBlock = {
  id: "mandalorian_world",
  routeId: "mandalorian_route",
  kind: "world",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "舞台は帝国が崩壊してから5年後の銀河。\n帝国軍は消えましたが、その空白に賞金稼ぎ、無法者、残党が入り込んでいます。\n秩序のない荒野で、マンダロリアンは掟だけを頼りに生きています。",
    intermediate:
      "「Return of the Jedi」の約5年後、新共和国が生まれたばかりの混乱期。\n帝国残党が各地で蠢く中、かつての戦士の民・マンダロリアンは散り散りになっています。\nDin Djarinはその生き残りのひとりです。",
    advanced:
      "ジャックーの戦い（ABY 1）から約8年後の権力真空期（ABY 9頃）。新共和国は中央集権を嫌い、地方分権路線を取ったため治安が不安定。\nマンダロア自体はNight of a Thousand Tears後に壊滅状態で、信仰派（The Covert）と政治派（House Kryze系）に分裂したまま。",
  },
  glossaryTerms: [
    { term: "帝国", note: "銀河を支配していた独裁政権。映画『スター・ウォーズ』の主な敵。" },
    { term: "新共和国", note: "帝国崩壊後に建設された民主的な政府組織。" },
  ],
};

export const mandalorian_character: PageBlock = {
  id: "mandalorian_character",
  routeId: "mandalorian_route",
  kind: "character",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "主人公はDin Djarin（ディン・ジャリン）。\n幼少期に戦争で家族を失い、マンダロリアンに育てられた男です。\n感情を表に出さない人物ですが、ある子どもと出会い、何かが変わり始めます。",
    intermediate:
      "Din Djarin：The Covert所属の傭兵。兜を外さない「The Way」の信奉者。\nグローグー（通称Baby Yoda）：種族不明の50歳児で、フォースの使い手。\nこの2人の関係がシリーズ全体の軸です。",
    advanced:
      "Din DjarinはFoundling出身で、宗教的に厳格なThe Covert的解釈のThe Wayに従っている。\nGrogは Order 66 の生き残りで、Coruscantのジェダイ寺院で訓練を受けていたことがS3で示唆される。\n彼らの関係はS2終盤で一度切断され、S3で再接続される構造。",
  },
};

export const mandalorian_theme: PageBlock = {
  id: "mandalorian_theme",
  routeId: "mandalorian_route",
  kind: "theme",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "この話のテーマは「帰属」です。\n家族を失った男が、掟を守り、子どもを守り、自分がどこに属するのかを探し続けます。\n派手な戦いの奥に、静かで重いテーマがあります。",
    intermediate:
      "「The Way」は単なる戦士の掟ではなく、文化的アイデンティティの核です。\n散り散りになったマンダロリアンが「故郷を取り戻す」ことができるのか——それがS3以降の中心命題になります。",
    advanced:
      "信仰の硬直性と文化継承の葛藤が底流にある。Din Djarin がS2終盤に兜を外したことで「The Way」違反者になり、S3でボ＝カターンとの対比を通じて、掟の解釈問題が表面化する。\nマンダロアの再統一は政治的目標であると同時に、信仰的正統性の問い直しでもある。",
  },
};

export const mandalorian_cta: PageBlock = {
  id: "mandalorian_cta",
  routeId: "mandalorian_route",
  kind: "cta",
  spoilerLevel: 0,
  bodyVariants: {
    beginner:
      "まず見るべきは『マンダロリアン』シーズン1（全8話）。\n1話から引き込まれます。スターウォーズを一度も見たことがなくても大丈夫です。",
    intermediate:
      "視聴順の推奨：\n1. マンダロリアン S1 → S2\n2. ボバ・フェットの書（Ch.5-6はマンダロリアンの続き）\n3. マンダロリアン S3\nアソーカとの接続はS3後が自然です。",
    advanced:
      "ロア深掘りをするなら、マンダロア内戦の経緯はTCW S5・S7とRebels S4が必須。\nBo-Katan の文脈を理解するには特に Rebels S4 の「Heroes of Mandalore」を先に押さえてください。",
  },
};
