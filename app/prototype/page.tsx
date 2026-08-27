import type { Metadata } from "next";

import PrototypeForge from "./PrototypeForge";

export const metadata: Metadata = {
  title: "次に見るスター・ウォーズを見つける | STAR PATH",
  description: "今の気分と使える時間から、次に見るスター・ウォーズの一本・一話と、その先の道筋を案内する非公式ファンガイド。",
};

export default function PrototypePage() {
  return <PrototypeForge />;
}
