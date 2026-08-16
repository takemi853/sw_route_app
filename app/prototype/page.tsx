import type { Metadata } from "next";

import PrototypeForge from "./PrototypeForge";

export const metadata: Metadata = {
  title: "次のスター・ウォーズを見つける | Route Forge",
  description: "視聴歴と好みから、次に見る一つを固定ルールで提案するローカルprototype。",
};

export default function PrototypePage() {
  return <PrototypeForge />;
}
