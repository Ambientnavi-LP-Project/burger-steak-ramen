/* ============================================================
 * store-render.js — 店舗データを DOM に流し込む
 * ------------------------------------------------------------
 * 使い方（HTML 側）:
 *   <span data-store="phone"></span>
 *       → textContent に store.phone が入る
 *   <a data-store-attr="reserveUrl:href">...</a>
 *       → href 属性に store.reserveUrl が入る
 *   <title data-store="title"></title>
 *       → タイトルにも対応
 *
 * stations（駅リスト）だけは構造があるので専用処理。
 *   <ul class="access-stations" data-store-list="stations"></ul>
 * ============================================================ */

(function renderStore() {
  const store = (typeof getCurrentStore === "function") ? getCurrentStore() : null;
  if (!store) {
    console.warn("[store-render] 店舗データが見つかりません。URL のスラッグと stores.js のキーを確認してください。");
    return;
  }

  /* --- 1. textContent 差し込み: data-store="key" --- */
  document.querySelectorAll("[data-store]").forEach((el) => {
    const key = el.getAttribute("data-store");
    if (key in store && typeof store[key] !== "object") {
      el.textContent = store[key];
    }
  });

  /* --- 2. 属性差し込み: data-store-attr="key:attr"（複数可、カンマ区切り） --- */
  document.querySelectorAll("[data-store-attr]").forEach((el) => {
    el.getAttribute("data-store-attr").split(",").forEach((pair) => {
      const [key, attr] = pair.split(":").map((s) => s.trim());
      if (key in store && attr) {
        el.setAttribute(attr, store[key]);
      }
    });
  });

  /* --- 3. innerHTML 差し込み（住所など <br> を含むもの）: data-store-html="key" --- */
  document.querySelectorAll("[data-store-html]").forEach((el) => {
    const key = el.getAttribute("data-store-html");
    if (key in store) el.innerHTML = store[key];
  });

  /* --- 4. 駅リスト: data-store-list="stations" --- */
  document.querySelectorAll('[data-store-list="stations"]').forEach((ul) => {
    if (!Array.isArray(store.stations)) return;
    ul.innerHTML = store.stations.map((s) => `
      <li>
        <span>${s.name}<small style="display:block;color:var(--light-muted);font-size:11px;letter-spacing:0.05em;margin-top:2px;">${s.line}</small></span>
        <span class="walk">${s.walk}</span>
      </li>`).join("");
  });

  /* --- 5. <title> も差し替え（data-store では head 内が拾いにくいので明示） --- */
  if (store.title) document.title = store.title;

  /* --- 6. why セクション背景: storyBgImage があれば画像、無ければ単色のまま --- */
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
