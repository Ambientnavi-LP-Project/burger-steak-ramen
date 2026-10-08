/**
 * 既存の全業態ページ（store.njk）用の店舗一覧
 * 神戸業態（category === "kobe"）の店舗は store-kobe.njk で生成するため除外する
 */
import { readFileSync } from "node:fs";

export default function () {
  const data = JSON.parse(readFileSync(new URL("./stores.json", import.meta.url), "utf8"));
  return data.stores.filter((s) => s.category !== "kobe");
}
