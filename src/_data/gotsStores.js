/**
 * GOTS 業態LP（store-gots.njk）用の店舗一覧
 * - stores.json の category === "gots" の店舗を1店舗1ページで生成する（英語のみ）
 * - gotsType: "burger" | "ramen" でロゴ・配色・メニュー表示を切り替える
 * - 予約導線は reserveUrl が空なら全CTAが tel: + tel_click（TableCheck開設後は /en/{slug}/reserve/landing|message を直指定・UTMなし）
 */
import { readFileSync } from "node:fs";

const SITE = "https://halal-food-wagyu.com";

export default function () {
  const data = JSON.parse(readFileSync(new URL("./stores.json", import.meta.url), "utf8"));
  return data.stores
    .filter((s) => s.category === "gots")
    .map((store) => {
      const hasReserveUrl = Boolean(store.reserveUrl);
      const directionsUrl =
        store.mapPlaceUrl ||
        "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(store.addressPlain);
      return {
        store,
        url: `/${store.permalink}/`,
        canonical: `${SITE}/${store.permalink}/`,
        directionsUrl,
        hasReserveUrl,
        reserve: hasReserveUrl
          ? { href: store.reserveUrl, event: "reserve_click", label: "Book a Table", short: "Book", external: true }
          : { href: store.phoneHref, event: "tel_click", label: "Call to Reserve", short: "Call", external: false },
        jsonld: {
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: store.fullName,
          url: `${SITE}/${store.permalink}/`,
          telephone: store.phoneHref.replace("tel:", ""),
          servesCuisine: store.gotsType === "ramen" ? ["Ramen", "Japanese"] : ["Burgers", "Steak", "Japanese"],
          address: {
            "@type": "PostalAddress",
            streetAddress: store.streetAddress,
            addressLocality: store.addressLocality,
            postalCode: store.postalCode,
            addressCountry: "JP"
          },
          openingHoursSpecification: [{
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: store.opens,
            closes: store.closes
          }]
        }
      };
    });
}
