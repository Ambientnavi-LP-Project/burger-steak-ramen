/* ============================================================
 * stores.js — 全店舗データ
 * ------------------------------------------------------------
 * 新しい店舗を追加するときは、このオブジェクトに 1 ブロック足すだけ。
 * キー（"oshiage" など）= フォルダ名 = URL のスラッグ。
 *
 * template.html 側の data-store="xxx" / data-store-attr="xxx:href" が
 * ここの値で自動的に差し替わる。
 * ============================================================ */

const STORES = {

  /* ===================== 押上店 ===================== */
  "oshiage": {
    /* --- 基本情報 --- */
    slug: "oshiage",
    // 正式店名（nav / promise mark / footer / コピーライトで使用）
    fullName: "Wagyu Beef (Halal) Steak Hamburger & Ramen (Japanese food) Skytree Restaurant 5W-Tokyo 1962",
    // ランドマーク（旧「Tokyo Skytree」。各店ごとに変える変数）
    landmark: "Tokyo Skytree",
    // ランドマークまでの所要時間（「5 min」など。文中に挿入される）
    landmarkWalk: "5 min",

    /* --- メタ情報（<title> / <meta description>） --- */
    title: "Wagyu Beef (Halal) Steak Hamburger & Ramen (Japanese food) Skytree Restaurant 5W-Tokyo 1962 | Muslim-Friendly, 5 min from Tokyo Skytree",
    description: "Real Japanese Wagyu, prepared the Muslim-friendly way. Five minutes from Tokyo Skytree. Vertically integrated wagyu — our own cattle, raised and prepared by us since 1962. No pork, no alcohol — steak, burgers, ramen.",

    /* --- 予約・連絡先 --- */
    reserveUrl: "https://www.tablecheck.com/shops/halal-ramen-skytree-5w-tokyo/reserve",
    phone: "03-6658-5855",
    phoneHref: "tel:+81-3-6658-5855",
    instagramUrl: "https://www.instagram.com/5w_tokyo_official/",

    /* --- 営業時間（hero と access で食い違っていたので一本化） --- */
    hoursFull: "11:00 – 22:00",          // access セクション表示用
    hoursOpenPill: "OPEN NOW · 11:00 – 22:00",   // hero の info-pill（PC）
    hoursOpenPillShort: "OPEN · 11–22",          // hero の info-pill（モバイル）

    /* --- 住所 --- */
    addressHtml: "1-13-1 Narihira, Sumida-ku<br>Tokyo 130-0002, Japan<br>Jukken Dai-8 High Place",

    /* --- 座席 --- */
    seats: "16 seats (no private rooms)",

    /* --- why セクション背景画像 ---
       空文字 = 単色背景のまま。
       店舗別の内装写真を使うときは "../image/oshiage/interior.jpg" のように指定する。 */
    storyBgImage: "",

    /* --- Google マップ --- */
    // access セクションの埋め込み iframe 用
    mapEmbedUrl: "https://www.google.com/maps?q=1-13-1+Narihira,+Sumida+City,+Tokyo&output=embed",
    // reviews セクションの「Read more on Google」リンク用
    mapPlaceUrl: "https://www.google.com/maps/place/Wagyu+Beef+(Halal)+Steak+Hamburger+%26+Ramen+(Japanese+food)+Skytree+Restaurant+5W-Tokyo+1962/@40.6653356,131.9685883,2069963m/data=!3m1!1e3!4m6!3m5!1s0x60188fc341bec67b:0xadef478a8a7aa949!8m2!3d35.7085313!4d139.8087789!16s%2Fg%2F11ygv71mg4!5m1!1e3",

    /* --- 最寄駅リスト（access セクション） --- */
    stations: [
      { name: "Tokyo Skytree Station", line: "Tobu Skytree Line", walk: "5 min walk" },
      { name: "Honjo-Azumabashi Station", line: "Toei Asakusa Line, Exit A4", walk: "7 min walk" },
      { name: "Oshiage Station", line: "Hanzomon / Asakusa / Keisei / Tobu", walk: "10 min walk" },
      { name: "Asakusa Station", line: "Tsukuba Express", walk: "15 min walk" },
      { name: "Kinshicho Station", line: "JR Sobu / Hanzomon", walk: "15–20 min walk" }
    ]
  }

  /* ===================== 次の店舗はここに追記 =====================
  ,"akihabara": {
    slug: "akihabara",
    fullName: "...",
    landmark: "Akihabara Electric Town",
    landmarkWalk: "3 min",
    ...
  }
  ================================================================ */

};

/* ------------------------------------------------------------
 * 現在ページのスラッグ → 該当店舗データを返す
 * URL が /oshiage/ または /oshiage/index.html の形を想定。
 * ------------------------------------------------------------ */
function getCurrentStore() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  // 末尾が index.html ならその手前、そうでなければ末尾をスラッグとみなす
  let slug = parts[parts.length - 1];
  if (slug === "index.html") slug = parts[parts.length - 2];
  return STORES[slug] || null;
}
