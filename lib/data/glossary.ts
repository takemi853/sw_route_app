// lib/data/glossary.ts

export type GlossaryEntry = {
  id: string;
  termJa: string; // 日本語公式表記
  termEn: string; // 英語表記
  category: "character" | "organization" | "event" | "place" | "concept";
  routeIds: string[]; // 関連するルートID
  shortNote: string; // beginner向け1文説明
  mediumNote: string; // intermediate向け2-3文説明
  sources: string[]; // 出典URL
};

export const glossary: GlossaryEntry[] = [
  // ─── キャラクター ────────────────────────────────────────────────

  {
    id: "din_djarin",
    termJa: "ディン・ジャリン",
    termEn: "Din Djarin",
    category: "character",
    routeIds: ["mandalorian_route"],
    shortNote:
      "ヘルメットを外さない掟を守るマンダロリアンの賞金稼ぎ。「マンド」の愛称で呼ばれる。",
    mediumNote:
      "幼少期に戦火で両親を失い、マンダロリアンの「ザ・ウェイ」を信条とする秘密集団「チルドレン・オブ・ザ・ウォッチ」に育てられた人間の男性。その後、賞金稼ぎとして活動しながら、ある依頼で出会ったフォース感応者グローグーを守るために旅に出る。やがてクラン・マッドホーンの長となり、マンダロアの解放にも関与していく。",
    sources: [
      "https://starwars.fandom.com/wiki/Din_Djarin",
      "https://www.starwars.com/databank/the-mandalorian",
    ],
  },
  {
    id: "grogu",
    termJa: "グローグー",
    termEn: "Grogu",
    category: "character",
    routeIds: ["mandalorian_route"],
    shortNote:
      "ヨーダと同じ謎の種族のフォース感応者。通称「ザ・チャイルド」や「ベイビー・ヨーダ」。",
    mediumNote:
      "41 BBY 生まれで、かつてコルサントのジェダイ神殿でジェダイ修行生として訓練を受けていた。オーダー66を生き延びたのち、帝国に捕らわれていたところをディン・ジャリンに救われる。フォースを使ったテレキネシスや治癒能力を持ち、ディン・ジャリンに正式に養子として迎えられてからは「ディン・グローグー」の名を持つ。",
    sources: [
      "https://starwars.fandom.com/wiki/Din_Grogu",
      "https://starwars.fandom.com/wiki/Yoda%27s_species",
    ],
  },
  {
    id: "bo_katan_kryze",
    termJa: "ボ＝カターン・クライズ",
    termEn: "Bo-Katan Kryze",
    category: "character",
    routeIds: ["mandalorian_route"],
    shortNote:
      "マンダロアの王家ハウス・クライズ出身の女性戦士で、マンダロアを奪還しようとするリーダー。",
    mediumNote:
      "かつてはデス・ウォッチの分派「ナイト・オウルズ」を率いていたが、後にマンダロア抵抗運動のリーダーへと転身した。ダークセイバーをかつて保有し、マンダロア人全体の指導者「マンド・アロア」の地位を目指し続ける。マンダロア大粛清後は生き残りのマンダロリアンを再結集させ、故郷の星の奪還に尽力した。",
    sources: [
      "https://starwars.fandom.com/wiki/Bo-Katan_Kryze",
      "https://en.wikipedia.org/wiki/Bo-Katan_Kryze",
    ],
  },
  {
    id: "cassian_andor",
    termJa: "キャシアン・アンドー",
    termEn: "Cassian Andor",
    category: "character",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "反乱同盟の情報将校。デス・スターの設計図を奪取したローグ・ワン作戦のリーダー。",
    mediumNote:
      "故郷の惑星ケナリで「カッサ」という名の少年として生まれ、帝国の採掘災害で故郷を失った後、フェリックスの廃品回収コミュニティで育てられた。反乱同盟の結成以前から帝国に反抗的だった彼は、スパイ・破壊工作員として活動するうちに真の革命家へと変貌していく。ローグ・ワンではジン・アーソとともにスカリフでデス・スターの設計図を奪い、命を落とした。",
    sources: [
      "https://starwars.fandom.com/wiki/Cassian_Jeron_Andor",
      "https://en.wikipedia.org/wiki/Cassian_Andor",
      "https://www.starwars.com/databank/captain-cassian-andor",
    ],
  },
  {
    id: "luthen_rael",
    termJa: "ルーセン・レイエル",
    termEn: "Luthen Rael",
    category: "character",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "コルサントで骨董商を装いながら反乱組織を裏で操るスパイマスター。帝国の記録上の暗号名は「アクシス」。",
    mediumNote:
      "表向きはコルサントの骨董商だが、実態は草創期の反乱同盟のネットワークを立ち上げた影の創設者。モン・モスマやソウ・ゲレラら異なる反乱組織と連携しながら、複数のスパイを帝国内部に潜入させていた。彼が全てを捧げる覚悟で動いているのは、誰かが犠牲にならなければ帝国に抵抗する反乱は生まれないという信念からだ。",
    sources: [
      "https://starwars.fandom.com/wiki/Luthen_Rael",
      "https://www.starwars.com/databank/luthen-rael",
    ],
  },
  {
    id: "dedra_meero",
    termJa: "デドラ・ミーロ",
    termEn: "Dedra Meero",
    category: "character",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "帝国保安局（ISB）のスーパーバイザーで、反乱の動きを執拗に追う頭脳派の帝国側主要人物。",
    mediumNote:
      "コルサントで生まれ育ち、帝国の教育施設で帝国体制を内面化した真の信奉者。銀河各地の「バラバラな犯罪行為」が実は組織的な反乱の一部だと看破し、上層部の懐疑的な目線の中で「アクシス」の正体を追い詰めていく。細部への徹底的な注意と野心で帝国の権力構造の中を登っていく、シリーズの主要な対抗勢力。",
    sources: [
      "https://starwars.fandom.com/wiki/Dedra_Meero",
      "https://www.starwars.com/databank/dedra-meero",
    ],
  },
  {
    id: "mon_mothma",
    termJa: "モン・モスマ",
    termEn: "Mon Mothma",
    category: "character",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "チャンドリラ出身の元帝国元老院議員で、反乱同盟の共同創設者・文民リーダー。",
    mediumNote:
      "共和国末期から皇帝パルパティーンの政策に反対し続け、帝国の元老院で表向き合法的な立場を保ちながら、ルーセン・レイエルや従兄弟のヴェル・サーサらと協力して地下反乱ネットワークを構築した。帝国の弾圧を公に非難して上院を辞職したことで正式に反乱同盟が発足し、後に新共和国の初代首相となった。",
    sources: [
      "https://starwars.fandom.com/wiki/Mon_Mothma",
      "https://www.starwars.com/databank/mon-mothma",
    ],
  },
  {
    id: "jyn_erso",
    termJa: "ジン・アーソ",
    termEn: "Jyn Erso",
    category: "character",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "デス・スターを開発させられた科学者の娘。ローグ・ワン作戦でデス・スターの設計図を奪取した反乱軍の兵士。",
    mediumNote:
      "帝国に協力させられた科学者ゲイレン・アーソの娘として生まれ、父が捕らわれた際に独自に生き延びた。ソウ・ゲレラのもとで軍事訓練を受けた後、疎遠になっていた。父から「デス・スターには自分が仕込んだ欠陥がある」という情報を受け取り、キャシアン・アンドーとともにスカリフで設計図を奪取・送信し、その場で命を散らした。",
    sources: [
      "https://starwars.fandom.com/wiki/Jyn_Erso",
      "https://en.wikipedia.org/wiki/Jyn_Erso",
    ],
  },

  // ─── 組織・勢力 ────────────────────────────────────────────────

  {
    id: "mandalorians",
    termJa: "マンダロリアン",
    termEn: "Mandalorian / The Mandalorians",
    category: "organization",
    routeIds: ["mandalorian_route"],
    shortNote:
      "ベスカー製の鎧を纏い、固有の掟と言語（マンド・ア語）を持つ戦士の民族集団。",
    mediumNote:
      "特定の種族ではなく、マンダロリアン・クリードに従う複数の種族から成るクラン制の文化集団。かつては2000以上の星系に政治的影響力を持つ強大な戦士の民として知られた。帝国による「大粛清」で壊滅的な打撃を受け、生存者は銀河各地に散り散りとなったが、「ザ・ウェイ（マンダロア人の道）」と呼ばれる伝統的な信条を守り続ける者たちが散在している。",
    sources: [
      "https://starwars.fandom.com/wiki/Mandalorian",
      "https://en.wikipedia.org/wiki/Mandalorians",
    ],
  },
  {
    id: "the_covert",
    termJa: "ザ・コバート",
    termEn: "The Covert (The Tribe)",
    category: "organization",
    routeIds: ["mandalorian_route"],
    shortNote:
      "ネヴァロの地下に隠れ住む少数のマンダロリアン集団。ディン・ジャリンが所属していた秘密の共同体。",
    mediumNote:
      "「チルドレン・オブ・ザ・ウォッチ」というより広い組織に属する小規模な集団で、帝国による粛清後も絶対にヘルメットを外さないという厳格な掟を守りながら地下生活を続けていた。ディン・ジャリンはここで賞金稼ぎとして稼いだベスカーを組織に提供し、孤児を引き受けるという掟に従ってグローグーを守ろうとする。",
    sources: [
      "https://starwars.fandom.com/wiki/The_Tribe",
      "https://starwars.fandom.com/wiki/Children_of_the_Watch",
    ],
  },
  {
    id: "house_kryze",
    termJa: "ハウス・クライズ",
    termEn: "House Kryze",
    category: "organization",
    routeIds: ["mandalorian_route"],
    shortNote:
      "マンダロアを支配していた王家。ボ＝カターンとその姉サティーヌが最もよく知られた人物。",
    mediumNote:
      "かつてマンダロアを統治した貴族家系。姉サティーヌ・クライズは平和主義的なマンダロアを維持するため共和国に加盟し、妹ボ＝カターンは戦士の伝統復活を求めてデス・ウォッチに加わるという対立があった。帝国の大粛清でマンダロアが荒廃した後、ボ＝カターンが家名を冠するクラン・クライズを率いて故郷奪還を目指している。",
    sources: [
      "https://starwars.fandom.com/wiki/Bo-Katan_Kryze",
      "https://en.wikipedia.org/wiki/Bo-Katan_Kryze",
    ],
  },
  {
    id: "death_watch",
    termJa: "デス・ウォッチ",
    termEn: "Death Watch",
    category: "organization",
    routeIds: ["mandalorian_route"],
    shortNote:
      "マンダロアの平和主義政府に反対し、戦士の伝統復活を掲げたマンダロリアンの過激組織。",
    mediumNote:
      "クローン大戦期にプレ・ヴィズスラが率いたテロ組織で、マンダロア語では「キル・ツァッド」と呼ばれる。サティーヌ・クライズ公爵夫人の平和主義政府打倒を目指し、カウント・ドゥークーとも一時同盟を結んだ。ボ＝カターン・クライズも一時は副官として参加し、後に分裂。「チルドレン・オブ・ザ・ウォッチ」はこの組織から派生したと言われる。",
    sources: [
      "https://starwars.fandom.com/wiki/Death_Watch",
      "https://www.starwars.com/databank/death-watch",
    ],
  },
  {
    id: "rebel_alliance",
    termJa: "反乱同盟",
    termEn: "Rebel Alliance / Alliance to Restore the Republic",
    category: "organization",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "銀河帝国に抵抗するために結成された反乱組織。正式名称は「共和国回復同盟」。",
    mediumNote:
      "2 BBY にモン・モスマが正式に「反乱同盟宣言」を発したことで複数の反乱セルが統合された。ベイル・オーガナやルーセン・レイエルらが地下で長年準備を進めていた。戦闘より諜報・破壊工作・ゲリラ戦を重視し、ヤヴィンの戦いでデス・スターを撃破、エンドアの戦いで帝国軍を決定的に敗北させた後、新共和国の母体となった。",
    sources: [
      "https://starwars.fandom.com/wiki/Alliance_to_Restore_the_Republic",
      "https://en.wikipedia.org/wiki/Rebel_Alliance",
    ],
  },
  {
    id: "isb",
    termJa: "帝国保安局",
    termEn: "ISB / Imperial Security Bureau",
    category: "organization",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "帝国の内部治安・情報機関。反乱分子や市民の不満を摘発・排除することを任務とする。",
    mediumNote:
      "COMPNOR（新秩序保存委員会）傘下の秘密組織で、コルサントの中央局を拠点に銀河各地の「無秩序の兆候」を分析・摘発する。その権限は軍部をも凌ぐことがあり、ストームトルーパーや帝国艦隊を指揮下に置くことも可能。アンドールシリーズではデドラ・ミーロが反乱ネットワーク追跡の担当者として重要な役割を果たす。",
    sources: [
      "https://starwars.fandom.com/wiki/Imperial_Security_Bureau",
      "https://www.starwars.com/databank/imperial-security-bureau",
    ],
  },
  {
    id: "the_way",
    termJa: "ザ・ウェイ",
    termEn: "The Way / Way of the Mandalore",
    category: "concept",
    routeIds: ["mandalorian_route"],
    shortNote:
      "マンダロリアンの伝統的な信条・掟の総称。「This is the Way（これが道だ）」の言葉で知られる。",
    mediumNote:
      "マンダロリアン・クリードとも呼ばれる行動規範で、「生涯ヘルメットを外さない」「仲間のマンダロリアンを守る」「孤児（ファウンドリング）を引き取り成人まで育てる」などの厳格な掟を含む。ディン・ジャリンが所属する「チルドレン・オブ・ザ・ウォッチ」はとりわけ正統派の解釈を守るが、ボ＝カターンら一般的なマンダロリアンは同じ「ザ・ウェイ」でも異なる解釈を持っている。",
    sources: [
      "https://starwars.fandom.com/wiki/Way_of_the_Mandalore",
      "https://starwars.fandom.com/wiki/Mandalorian_Creed",
    ],
  },

  // ─── 出来事・用語 ────────────────────────────────────────────────

  {
    id: "night_of_a_thousand_tears",
    termJa: "千の涙の夜",
    termEn: "Night of a Thousand Tears",
    category: "event",
    routeIds: ["mandalorian_route"],
    shortNote:
      "帝国がマンダロアを壊滅させた一夜。TIEボマーによる都市の絨毯爆撃と地上での虐殺が行われた。",
    mediumNote:
      "「マンダロアの大粛清（グレート・パージ）」の中でも最も凄惨な夜。帝国軍のTIEサ・ボマーが融合爆弾でマンダロアの各都市を壊滅させ、砲艦が地上の生存者を掃討した。首都サンダリも破壊された。ボ＝カターン・クライズは停戦を信じてダークセイバーを差し出したが、モフ・ギデオンは約束を破って攻撃を続行。マンダロア人の大部分が虐殺されたこの出来事がシリーズの根底に流れるトラウマとなっている。",
    sources: [
      "https://starwars.fandom.com/wiki/Night_of_a_Thousand_Tears",
      "https://starwars.fandom.com/wiki/Great_Purge_of_Mandalore",
    ],
  },
  {
    id: "order_66",
    termJa: "オーダー66",
    termEn: "Order 66",
    category: "event",
    routeIds: ["mandalorian_route", "rogue_one_andor_route"],
    shortNote:
      "パルパティーンが発動した緊急命令。全クローン兵士がジェダイ将軍を裏切り一斉虐殺した。",
    mediumNote:
      "クローン兵士の脳内に埋め込まれたバイオチップに仕込まれた秘密命令「オーダー66」が発動すると、兵士たちはジェダイを反逆者と認識して即座に攻撃・殺害した。クローン大戦の最終局面で皇帝となったパルパティーンが下令し、ほぼ全ジェダイが殺害された（生存者は1〜2%程度と推定）。これが帝国成立の決定的な瞬間であり、グローグーもこの迫害を生き延びた生存者の一人。",
    sources: [
      "https://starwars.fandom.com/wiki/Order_66",
      "https://www.theorysabers.com/blogs/article/what-is-order-66",
    ],
  },
  {
    id: "battle_of_yavin",
    termJa: "ヤヴィンの戦い",
    termEn: "Battle of Yavin",
    category: "event",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "反乱同盟が初めてデス・スターを撃破した決定的な戦い。スター・ウォーズ史の基準点「0 BBY/ABY」。",
    mediumNote:
      "キャシアン・アンドーとジン・アーソが命がけで奪取したデス・スターの設計図をもとに、反乱軍がヤヴィン第4衛星から攻撃を敢行。ルーク・スカイウォーカーがフォースの導きにより熱排気口にプロトン魚雷を命中させデス・スターを破壊した。この戦いがスター・ウォーズ年代記の基準点「BBY（ヤヴィン以前）/ABY（ヤヴィン以後）」の原点となっている。",
    sources: [
      "https://starwars.fandom.com/wiki/Battle_of_Yavin",
      "https://en.wikipedia.org/wiki/Battle_of_Yavin",
    ],
  },
  {
    id: "battle_of_endor",
    termJa: "エンドアの戦い",
    termEn: "Battle of Endor",
    category: "event",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "4 ABY に起きた銀河内戦の最大の決戦。ダース・ヴェイダーが皇帝を倒し、帝国の実質的な崩壊が始まった。",
    mediumNote:
      "エンドアの衛星を舞台に、反乱同盟と帝国の艦隊が激突した。ルーク・スカイウォーカーが皇帝の前でヴェイダーと対峙し、ヴェイダーが最後に息子を救うために皇帝を倒した（光の側面への回帰）。地上ではイウォーク族と反乱軍が帝国部隊を撃破し、第2デス・スターも破壊された。この戦いが銀河内戦の事実上の終わりとなり、新共和国樹立の契機となった。",
    sources: [
      "https://starwars.fandom.com/wiki/Battle_of_Endor",
      "https://en.wikipedia.org/wiki/Battle_of_Endor",
    ],
  },
  {
    id: "battle_of_jakku",
    termJa: "ジャックーの戦い",
    termEn: "Battle of Jakku",
    category: "event",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "5 ABY に起きた銀河帝国の最後の抵抗。新共和国がこの戦いで帝国を完全に降伏させた。",
    mediumNote:
      "エンドアの戦いから約1年後、砂漠の惑星ジャックーで帝国残存勢力と新共和国が最後の決戦を行った。新共和国が決定的な勝利を収め、帝国はガラクティック・コンコーダンス（銀河協定）に署名して正式に解体された。このときの残骸が映画「フォースの覚醒」でレイが目にする無数の帝国艦のスケルトンとなっている。",
    sources: [
      "https://starwars.fandom.com/wiki/Battle_of_Jakku",
      "https://www.cbr.com/when-galactic-civil-war-ended-star-wars/",
    ],
  },
  {
    id: "purge_of_mandalore",
    termJa: "マンダロアの大粛清",
    termEn: "The Purge of Mandalore / Great Purge of Mandalore",
    category: "event",
    routeIds: ["mandalorian_route"],
    shortNote:
      "帝国がマンダロア人を組織的に虐殺した一連の出来事。マンダロリアン社会を壊滅させた歴史的惨劇。",
    mediumNote:
      "マンダロアを自分たちのコントロール下に置けないと判断した帝国が、見せしめと支配強化のために実施した計画的な大量虐殺。「千の涙の夜」はこの粛清の最も凄惨な局面にあたる。大粛清の後、マンダロリアンは星系各地に潜伏し、コバート（秘密集団）を形成して生き延びた。大量のベスカー（マンダロリアン鉄）が帝国に没収されたことも、マンダロリアン文化への深刻な打撃となった。",
    sources: [
      "https://starwars.fandom.com/wiki/Great_Purge_of_Mandalore",
      "https://screenrant.com/star-wars-purge-of-mandalore-night-thousand-tears-explained/",
    ],
  },
  {
    id: "bby_aby",
    termJa: "BBY / ABY（年代表記）",
    termEn: "BBY / ABY (Before/After Battle of Yavin)",
    category: "concept",
    routeIds: ["mandalorian_route", "rogue_one_andor_route"],
    shortNote:
      "スター・ウォーズの年代表記。「ヤヴィンの戦い」を基準点（0年）として前後を数える。",
    mediumNote:
      "BBY は「Before the Battle of Yavin（ヤヴィンの戦い以前）」、ABY は「After the Battle of Yavin（ヤヴィンの戦い以後）」の略。現実のBC/ADに相当するスター・ウォーズ独自の暦。アンドールは約5 BBY から 0 BBY を描き、マンダロリアンは約9 ABY を舞台にしている。グローグーは41 BBY 生まれで、50歳にもかかわらず「赤ちゃん」のように見える。",
    sources: [
      "https://starwars.fandom.com/wiki/%27ABY-BBY%27_dating_system",
      "https://www.slashfilm.com/1926161/star-wars-dating-system-explained-bby-aby-meaning/",
    ],
  },

  // ─── 場所 ────────────────────────────────────────────────

  {
    id: "mandalore",
    termJa: "マンダロア",
    termEn: "Mandalore",
    category: "place",
    routeIds: ["mandalorian_route"],
    shortNote:
      "マンダロリアンの故郷惑星。帝国の大粛清により地表の大半が荒廃し、立入禁止とされていた。",
    mediumNote:
      "外縁領域に位置するマンダロリアンの母星で、かつては豊かなジャングルと宝石色の湖を持つ惑星だったが、長年の戦争でドーム都市生活を余儀なくされるまで荒廃した。帝国の大粛清後は表向き立入禁止とされ、地表はベスカーの鉱山採掘跡と荒れ地が広がる。ディン・ジャリンとボ＝カターンがマンダロリアン生存者を束ねて奪還を試みることがマンダロリアン後半の核心となる。",
    sources: [
      "https://starwars.fandom.com/wiki/Mandalore",
      "https://www.starwars.com/databank/mandalore",
    ],
  },
  {
    id: "coruscant",
    termJa: "コルサント",
    termEn: "Coruscant",
    category: "place",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "銀河の首都惑星。惑星全体が一つの巨大都市に覆われ、共和国・帝国・新共和国の政治の中心地。",
    mediumNote:
      "コア・ワールド領域に位置し、数兆の住人を抱えるエキュメノポリス（惑星規模の都市）。上層部の煌びやかな高層ビル街から暗黒の地下都市まで極端な格差社会が広がる。かつては銀河共和国の議事堂とジェダイ神殿があり、帝国成立後も政治の中枢として機能した。アンドールではルーセン・レイエルの骨董商とモン・モスマの議員官邸が重要な舞台となる。",
    sources: [
      "https://starwars.fandom.com/wiki/Coruscant",
      "https://www.starwars.com/databank/coruscant",
    ],
  },
  {
    id: "ferrix",
    termJa: "フェリックス",
    termEn: "Ferrix",
    category: "place",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "廃品回収・スクラップビジネスで成り立つ赤みがかった荒野の惑星。キャシアン・アンドーが育った場所。",
    mediumNote:
      "自由貿易区画のモルラニ星系に位置し、船のスクラップと部品売買で経済が成り立つタフなコミュニティ。煉瓦造りの町フェリックス・シティは結束の強い住民による独特の文化を持つ。帝国の支配が強まるにつれ、この平和なコミュニティもISBの監視と弾圧の対象となっていき、「普通の人々がなぜ反乱に加わるのか」を示す舞台装置としてアンドールの核心を成す。",
    sources: [
      "https://starwars.fandom.com/wiki/Ferrix",
      "https://www.starwars.com/databank/ferrix",
    ],
  },
  {
    id: "kenari",
    termJa: "ケナリ",
    termEn: "Kenari",
    category: "place",
    routeIds: ["rogue_one_andor_route"],
    shortNote:
      "キャシアン・アンドーの故郷。帝国の採掘事故を機に人口が禁止された放棄された森林惑星。",
    mediumNote:
      "ミッド・リム領域パーケル・セクターに位置する森林惑星で、帝国（元は共和国）の採掘が引き起こした災害により住民が消えたとして封鎖された。生き残った先住民族の子どもたちが部族的な生活を続けていたが、キャシアンはそこから連れ出されフェリックスへ移送された。この「帝国に奪われた故郷」という原体験が、彼が反乱へと向かう根本的な動機となっている。",
    sources: [
      "https://starwars.fandom.com/wiki/Kenari",
      "https://collider.com/who-are-the-kenari-andor-what-happened-to-them/",
    ],
  },
];
