/* ============================================================
 * store-render.js（Eleventy 移行版）
 * ------------------------------------------------------------
 * 店舗データのほとんどはビルド時に Eleventy が HTML に埋め込み済み。
 * このスクリプトは、CSS の background-image など、
 * 動的に当てる必要のあるごく一部の処理だけを担当する。
 *
 * window.__STORE__ に、現在ページの店舗データの一部が
 * Eleventy によって書き出されている前提。
 * ============================================================ */

(function () {
  const store = window.__STORE__;
  if (!store) return;

  // why セクション背景: storyBgImage があれば画像、無ければ単色のまま
  if (store.storyBgImage) {
    const why = document.querySelector(".why");
    if (why) {
      why.style.backgroundImage =
        "linear-gradient(180deg, rgba(10,8,7,0.55) 0%, rgba(10,8,7,0.4) 50%, rgba(10,8,7,0.7) 100%), url('" +
        store.storyBgImage + "')";
      why.style.backgroundSize = "cover";
      why.style.backgroundPosition = "center";
      why.classList.add("why--has-image");
    }
  }
})();
