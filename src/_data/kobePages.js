/**
 * 神戸業態LP（store-kobe.njk）のページ一覧を組み立てる
 * - stores.json の category === "kobe" の店舗 × languages の数だけページを作る
 * - 英語は /tokyo/kabukicho/ のように言語なし、他言語は /ko/tokyo/kabukicho/ のように言語を前置
 * - 計測値（gaStoreName など）は stores.json 側に持つ
 */
import { readFileSync } from "node:fs";
import { LANGS, MENU_LABEL, CATEGORY, T, joinMenus } from "../_includes/kobe/i18n.js";

const SITE = "https://halal-food-wagyu.com";
const MENU_ORDER = ["burger", "steak", "ramen"];
const CARD_IMAGE = { burger: "card-burger.jpg", steak: "card-steak.jpg", ramen: "card-ramen.jpg" };
// コンボは構成メニューを両方出す店舗だけ（店内POP 10/5版）
const COMBOS = [["burger", "steak"], ["burger", "steak"], ["ramen", "steak"]];

const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

function urlFor(store, lang) {
  const prefix = LANGS[lang].path ? "/" + LANGS[lang].path : "";
  return `${prefix}/${store.permalink}/`;
}

export default function () {
  const data = JSON.parse(readFileSync(new URL("./stores.json", import.meta.url), "utf8"));
  const pages = [];

  for (const store of data.stores.filter((s) => s.category === "kobe")) {
    const menus = MENU_ORDER.filter((m) => (store.menus || []).includes(m));
    const langs = (store.languages || ["en"]).filter((l) => LANGS[l]);
    const hasReserveUrl = Boolean(store.reserveUrl);
    const firstStation = (store.stations || [])[0] || null;
    const walkMin = firstStation ? (String(firstStation.walk).match(/\d+/) || [""])[0] : "";
    const hasCombo = COMBOS.some((c) => c.every((m) => menus.includes(m)));

    for (const lang of langs) {
      const t = T[lang];
      const area = store.areaLabel;
      const menuText = joinMenus(lang, menus.map((m) => MENU_LABEL[lang][m]));
      const vars = { area, menu: menuText, menuCap: menuText.charAt(0).toUpperCase() + menuText.slice(1) };

      pages.push({
        store,
        lang,
        langMeta: LANGS[lang],
        url: urlFor(store, lang),
        canonical: SITE + urlFor(store, lang),
        alternates: langs.map((l) => ({
          code: l,
          hreflang: LANGS[l].hreflang,
          name: LANGS[l].name,
          href: urlFor(store, l),
          abs: SITE + urlFor(store, l),
          current: l === lang
        })),
        xDefault: SITE + urlFor(store, "en"),
        t,
        h1: fill(t.h1, vars),
        reserveTitle: fill(t.reserve, vars),
        aboutBody: fill(t.aboutBody, vars),
        walkText: walkMin ? fill(t.walk, { n: walkMin }) : "",
        firstStation,
        cats: menus.map((m) => ({ key: m, img: CARD_IMAGE[m], ...CATEGORY[m][lang] })),
        hasCombo,
        // 予約CTA：TableCheck URL があればそこへ（UTMなし・最終URL直指定）、無ければ電話
        reserve: {
          href: hasReserveUrl ? store.reserveUrl : store.phoneHref,
          external: hasReserveUrl,
          event: hasReserveUrl ? "reserve_click" : "tel_click",
          label: hasReserveUrl ? t.reserveLabel : t.telLabel,
          short: hasReserveUrl ? t.reserveShort : t.telShort
        },
        hasReserveUrl,
        jsonld: {
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: store.fullName,
          url: SITE + urlFor(store, lang),
          image: `${SITE}/image/kobe/${store.heroImage}`,
          telephone: store.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: String(store.addressHtml || "").replace(/<br\s*\/?>/g, ", "),
            addressCountry: "JP"
          },
          servesCuisine: ["Japanese", "Kobe beef"],
          acceptsReservations: hasReserveUrl ? store.reserveUrl : true,
          inLanguage: LANGS[lang].htmlLang
        }
      });
    }
  }
  return pages;
}
