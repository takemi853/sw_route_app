import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("Route Forgeのroot metadataは日本語の体験を説明する", async () => {
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");

  assert.match(layout, /Route Forge｜次のスター・ウォーズへの入口/);
  assert.match(layout, /視聴歴と今の気分/);
  assert.match(layout, /lang="ja"/);
});

test("プロトタイプは入口選択とその先の道筋を一画面で伝える", async () => {
  const prototype = await readFile(new URL("app/prototype/PrototypeForge.tsx", root), "utf8");

  assert.match(prototype, /スター・ウォーズ、/);
  assert.match(prototype, /最初に見る一本・一話だけを案内/);
  assert.match(prototype, /この先の道筋/);
  assert.match(prototype, /見てみたい/);
  assert.match(prototype, /今は違う/);
  assert.doesNotMatch(prototype, />楽しめた</);
  assert.doesNotMatch(prototype, />合わなかった</);
});

test("プロトタイプはPCとモバイルで段階的にレイアウトを切り替える", async () => {
  const styles = await readFile(new URL("app/prototype/prototype.module.css", root), "utf8");

  assert.match(styles, /grid-template-columns: minmax\(300px, 0\.78fr\) minmax\(570px, 1\.22fr\)/);
  assert.match(styles, /@media \(max-width: 1040px\)/);
  assert.match(styles, /@media \(max-width: 760px\)/);
  assert.match(styles, /\.resultHero \{\s+grid-template-columns: minmax\(0, 1fr\)/);
});
