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

test("プロトタイプはモバイルでグリッドの最小幅を残さない", async () => {
  const styles = await readFile(new URL("app/prototype/prototype.module.css", root), "utf8");

  assert.match(styles, /\.diagnosisPanel > \*, \.resultGrid > \* \{ min-width: 0; \}/);
  assert.match(styles, /\.diagnosisPanel, \.resultGrid \{ grid-template-columns: minmax\(0, 1fr\); \}/);
  assert.match(styles, /\.shell \{ overflow-x: clip; padding: 0 16px 44px; \}/);
});
