/**
 * 神戸業態LP（store-kobe.njk）の多言語テキスト
 * - en が基準。ko / zh-hant / zh-hans / fr は AI 翻訳（ハラル・FAQ は逆翻訳でチェック済み）
 * - メニュー名の訳は店内POP（10/5版）の表記に合わせる
 * - {area} は店舗の areaLabel（GBP 表記のエリア名）、{n} は徒歩分数に置き換わる
 */

export const LANGS = {
  "en":      { path: "",         htmlLang: "en",      hreflang: "en",      short: "EN", name: "English",  cjkFont: "" },
  "ko":      { path: "ko",       htmlLang: "ko",      hreflang: "ko",      short: "KO", name: "한국어",    cjkFont: "Noto Sans KR" },
  "zh-hant": { path: "zh-hant",  htmlLang: "zh-Hant", hreflang: "zh-Hant", short: "繁", name: "繁體中文", cjkFont: "Noto Sans TC" },
  "zh-hans": { path: "zh-hans",  htmlLang: "zh-Hans", hreflang: "zh-Hans", short: "简", name: "简体中文", cjkFont: "Noto Sans SC" },
  "fr":      { path: "fr",       htmlLang: "fr",      hreflang: "fr",      short: "FR", name: "Français", cjkFont: "" }
};

// メニューカテゴリ名
export const MENU_LABEL = {
  "en":      { burger: "Burger", steak: "Steak", ramen: "Ramen" },
  "ko":      { burger: "버거", steak: "스테이크", ramen: "라멘" },
  "zh-hant": { burger: "漢堡", steak: "牛排", ramen: "拉麵" },
  "zh-hans": { burger: "汉堡", steak: "牛排", ramen: "拉面" },
  "fr":      { burger: "burger", steak: "steak", ramen: "ramen" }
};

// メニュー名の並べ方（例: Burger, Steak & Ramen）
export function joinMenus(lang, items) {
  if (items.length === 1) return items[0];
  if (lang === "en") return items.slice(0, -1).join(", ") + " & " + items[items.length - 1];
  if (lang === "fr") return items.slice(0, -1).join(", ") + " et " + items[items.length - 1];
  if (lang === "ko") return items.join(" · ");
  return items.join("、");
}

// カテゴリごとの見出しと概要（メニュー詳細は載せない方針）
export const CATEGORY = {
  burger: {
    "en":      { title: "Kobe Beef Burger", desc: "Truffle cheese burgers and a BBQ burger, all with Kobe beef." },
    "ko":      { title: "고베규 버거", desc: "고베규 트러플 치즈버거와 BBQ 버거" },
    "zh-hant": { title: "神戶牛漢堡", desc: "神戶牛松露起司漢堡與燒肉漢堡" },
    "zh-hans": { title: "神户牛汉堡", desc: "神户牛松露芝士汉堡与烤肉汉堡" },
    "fr":      { title: "Burger au bœuf de Kobe", desc: "Burgers au bœuf de Kobe : truffe et fromage, ou BBQ." }
  },
  steak: {
    "en":      { title: "Kobe Beef Steak", desc: "100% Kobe beef steak and steak rice bowl." },
    "ko":      { title: "고베규 스테이크", desc: "100% 고베규 스테이크와 스테이크 덮밥" },
    "zh-hant": { title: "神戶牛排", desc: "100%神戶牛排與牛排蓋飯" },
    "zh-hans": { title: "神户牛排", desc: "100%神户牛排与牛排盖饭" },
    "fr":      { title: "Steak au bœuf de Kobe", desc: "Steak 100 % bœuf de Kobe et bol de riz au steak." }
  },
  ramen: {
    "en":      { title: "Kobe Beef Ramen", desc: "Kobe beef ramen in miso, soy sauce or spicy broth." },
    "ko":      { title: "고베규 라멘", desc: "미소 · 간장 · 매운맛 국물 중 선택" },
    "zh-hant": { title: "神戶牛拉麵", desc: "可選味噌、醬油或辣味湯頭" },
    "zh-hans": { title: "神户牛拉面", desc: "可选味噌、酱油或辣味汤头" },
    "fr":      { title: "Ramen au bœuf de Kobe", desc: "Ramen au bœuf de Kobe : miso, sauce soja ou épicé." }
  }
};

// 画面の文言
export const T = {
  "en": {
    navMenu: "Menu", navHalal: "Halal", navAccess: "Access", navBooking: "Booking",
    language: "Language",
    city: "Tokyo",
    h1: "Kobe Beef {menu} in {area}",
    halalBadge: "Halal-certified Kobe beef available",
    seeReviews: "See reviews on Google",
    reserveLabel: "Reserve a table", reserveShort: "Reserve",
    telLabel: "Call to reserve", telShort: "Call",
    reserveNote: "Online booking via TableCheck",
    call: "Call", directions: "Directions",
    hours: "Hours", walk: "{n} min walk", dietary: "Dietary", dietaryValue: "Halal-certified option",
    menu: "Menu",
    comboNote: "Combo sets also available.",
    halalNote: "Halal-certified Kobe beef is available for our Kobe beef dishes (priced separately). Please ask our staff for details.",
    about: "Halal & dietary options",
    aboutBody: "Enjoy genuine Kobe beef in {area}. Halal-certified Kobe beef is available for our Kobe beef dishes (priced separately). Please let our staff know about any dietary requirements.",
    aboutCards: [
      ["Halal-certified Kobe beef", "Available, priced separately"],
      ["Ask our staff", "We'll explain which dishes can be halal"],
      ["Multilingual menu", "English, Korean, Chinese and Arabic"],
      ["Dietary requests", "Tell us when you book"]
    ],
    reviews: "Reviews", reviewsBody: "Read what our guests say on Google Maps.",
    access: "Hours & Access", openMaps: "Open in Google Maps",
    reserve: "Reserve your table at {area}",
    dietNote: "Add halal, vegan or allergy notes when you book.",
    preferCall: "Prefer to call?",
    faq: [
      ["Do I need a reservation?", "Walk-ins are welcome subject to availability. To be sure of a table, please reserve online."],
      ["Is the food halal?", "Halal-certified Kobe beef is available for our Kobe beef dishes (priced separately). Please choose the Halal-certified option when you order, and ask our staff if you are unsure."],
      ["Can I change or cancel my booking?", "Please see the TableCheck booking page for how to change or cancel your booking and for the cancellation policy."]
    ]
  },
  "ko": {
    navMenu: "메뉴", navHalal: "할랄", navAccess: "오시는 길", navBooking: "예약",
    language: "언어",
    city: "도쿄",
    h1: "{area}의 고베규 {menu}",
    halalBadge: "할랄 인증 고베규 선택 가능",
    seeReviews: "Google 리뷰 보기",
    reserveLabel: "테이블 예약하기", reserveShort: "예약",
    telLabel: "전화로 예약하기", telShort: "전화",
    reserveNote: "TableCheck 온라인 예약 (영어 페이지)",
    call: "전화", directions: "길찾기",
    hours: "영업시간", walk: "도보 {n}분", dietary: "식단", dietaryValue: "할랄 인증 옵션",
    menu: "메뉴",
    comboNote: "콤보 세트도 있습니다.",
    halalNote: "고베규 메뉴는 할랄 인증 고베규로 주문하실 수 있습니다(별도 요금). 자세한 내용은 직원에게 문의해 주세요.",
    about: "할랄 · 식단 옵션",
    aboutBody: "{area}에서 정통 고베규를 즐겨 보세요. 고베규 메뉴는 할랄 인증 고베규로 주문하실 수 있습니다(별도 요금). 식단 관련 요청이 있으시면 직원에게 말씀해 주세요.",
    aboutCards: [
      ["할랄 인증 고베규", "선택 가능 (별도 요금)"],
      ["직원에게 문의", "할랄 대응 메뉴를 안내해 드립니다"],
      ["다국어 메뉴", "영어 · 한국어 · 중국어 · 아랍어"],
      ["식단 요청", "예약 시 알려 주세요"]
    ],
    reviews: "리뷰", reviewsBody: "Google 지도에서 고객 리뷰를 확인하세요.",
    access: "영업시간 · 오시는 길", openMaps: "Google 지도에서 열기",
    reserve: "{area} 예약하기",
    dietNote: "예약 시 할랄 · 비건 · 알레르기 요청을 남길 수 있습니다.",
    preferCall: "전화 예약을 원하시나요?",
    faq: [
      ["예약이 꼭 필요한가요?", "자리가 있으면 예약 없이도 이용하실 수 있습니다. 확실하게 자리를 잡으시려면 온라인으로 예약해 주세요."],
      ["음식은 할랄인가요?", "고베규 메뉴는 할랄 인증 고베규로 주문하실 수 있습니다(별도 요금). 주문 시 할랄 인증 옵션을 선택해 주시고, 궁금한 점은 직원에게 문의해 주세요."],
      ["예약을 변경하거나 취소할 수 있나요?", "예약 변경 · 취소 방법과 취소 규정은 TableCheck 예약 페이지에서 확인해 주세요."]
    ]
  },
  "zh-hant": {
    navMenu: "菜單", navHalal: "清真", navAccess: "交通", navBooking: "訂位",
    language: "語言",
    city: "東京",
    h1: "{area}・神戶牛{menu}",
    halalBadge: "可選清真認證神戶牛",
    seeReviews: "查看 Google 評論",
    reserveLabel: "立即訂位", reserveShort: "訂位",
    telLabel: "電話訂位", telShort: "電話",
    reserveNote: "透過 TableCheck 線上訂位（英文頁面）",
    call: "致電", directions: "路線",
    hours: "營業時間", walk: "步行{n}分鐘", dietary: "飲食", dietaryValue: "可選清真認證",
    menu: "菜單",
    comboNote: "另有套餐組合。",
    halalNote: "神戶牛餐點可選用清真認證神戶牛（另行計價）。詳情請洽詢店員。",
    about: "清真與飲食需求",
    aboutBody: "在{area}品嚐正宗神戶牛。神戶牛餐點可選用清真認證神戶牛（另行計價）。如有飲食需求，請告知店員。",
    aboutCards: [
      ["清真認證神戶牛", "可選（另行計價）"],
      ["歡迎洽詢店員", "為您說明可提供清真的餐點"],
      ["多語言菜單", "英文、韓文、中文、阿拉伯文"],
      ["飲食需求", "訂位時請告知"]
    ],
    reviews: "評論", reviewsBody: "在 Google 地圖查看顧客評論。",
    access: "營業時間與交通", openMaps: "在 Google 地圖開啟",
    reserve: "預約{area}店",
    dietNote: "訂位時可備註清真、純素或過敏需求。",
    preferCall: "想用電話訂位？",
    faq: [
      ["需要訂位嗎？", "有空位時歡迎直接入店。若想確保座位，請線上訂位。"],
      ["餐點是清真的嗎？", "神戶牛餐點可選用清真認證神戶牛（另行計價）。點餐時請選擇清真認證選項，如有疑問請洽詢店員。"],
      ["可以變更或取消訂位嗎？", "變更或取消訂位的方式及取消規定，請參閱 TableCheck 訂位頁面。"]
    ]
  },
  "zh-hans": {
    navMenu: "菜单", navHalal: "清真", navAccess: "交通", navBooking: "预订",
    language: "语言",
    city: "东京",
    h1: "{area}・神户牛{menu}",
    halalBadge: "可选清真认证神户牛",
    seeReviews: "查看 Google 评价",
    reserveLabel: "立即预订", reserveShort: "预订",
    telLabel: "电话预订", telShort: "电话",
    reserveNote: "通过 TableCheck 在线预订（英文页面）",
    call: "致电", directions: "路线",
    hours: "营业时间", walk: "步行{n}分钟", dietary: "饮食", dietaryValue: "可选清真认证",
    menu: "菜单",
    comboNote: "另有套餐组合。",
    halalNote: "神户牛餐点可选用清真认证神户牛（另行计价）。详情请咨询店员。",
    about: "清真与饮食需求",
    aboutBody: "在{area}品尝正宗神户牛。神户牛餐点可选用清真认证神户牛（另行计价）。如有饮食需求，请告知店员。",
    aboutCards: [
      ["清真认证神户牛", "可选（另行计价）"],
      ["欢迎咨询店员", "为您说明可提供清真的餐点"],
      ["多语言菜单", "英文、韩文、中文、阿拉伯文"],
      ["饮食需求", "预订时请告知"]
    ],
    reviews: "评价", reviewsBody: "在 Google 地图查看顾客评价。",
    access: "营业时间与交通", openMaps: "在 Google 地图打开",
    reserve: "预订{area}店",
    dietNote: "预订时可备注清真、纯素或过敏需求。",
    preferCall: "想电话预订？",
    faq: [
      ["需要预订吗？", "有空位时欢迎直接到店。如想确保座位，请在线预订。"],
      ["餐点是清真的吗？", "神户牛餐点可选用清真认证神户牛（另行计价）。点餐时请选择清真认证选项，如有疑问请咨询店员。"],
      ["可以更改或取消预订吗？", "更改或取消预订的方法及取消规定，请参阅 TableCheck 预订页面。"]
    ]
  },
  "fr": {
    navMenu: "Menu", navHalal: "Halal", navAccess: "Accès", navBooking: "Réserver",
    language: "Langue",
    city: "Tokyo",
    h1: "{menuCap} au bœuf de Kobe à {area}",
    halalBadge: "Bœuf de Kobe certifié halal disponible",
    seeReviews: "Voir les avis Google",
    reserveLabel: "Réserver une table", reserveShort: "Réserver",
    telLabel: "Réserver par téléphone", telShort: "Appeler",
    reserveNote: "Réservation en ligne via TableCheck (page en anglais)",
    call: "Appeler", directions: "Itinéraire",
    hours: "Horaires", walk: "{n} min à pied", dietary: "Régime", dietaryValue: "Option halal certifiée",
    menu: "Menu",
    comboNote: "Formules combinées également disponibles.",
    halalNote: "Nos plats au bœuf de Kobe peuvent être préparés avec du bœuf de Kobe certifié halal (avec supplément). Renseignez-vous auprès de notre équipe.",
    about: "Halal et régimes alimentaires",
    aboutBody: "Savourez un authentique bœuf de Kobe à {area}. Nos plats au bœuf de Kobe peuvent être préparés avec du bœuf de Kobe certifié halal (avec supplément). N'hésitez pas à informer notre équipe de vos besoins alimentaires.",
    aboutCards: [
      ["Bœuf de Kobe certifié halal", "Disponible, avec supplément"],
      ["Demandez à notre équipe", "Nous vous indiquerons les plats halal"],
      ["Menu multilingue", "Anglais, coréen, chinois et arabe"],
      ["Demandes alimentaires", "Précisez-les lors de la réservation"]
    ],
    reviews: "Avis", reviewsBody: "Découvrez les avis de nos clients sur Google Maps.",
    access: "Horaires et accès", openMaps: "Ouvrir dans Google Maps",
    reserve: "Réservez votre table à {area}",
    dietNote: "Précisez vos besoins halal, végans ou allergies lors de la réservation.",
    preferCall: "Vous préférez appeler ?",
    faq: [
      ["Faut-il réserver ?", "Vous êtes les bienvenus sans réservation dans la limite des places disponibles. Pour être sûr d'avoir une table, réservez en ligne."],
      ["La cuisine est-elle halal ?", "Nos plats au bœuf de Kobe peuvent être préparés avec du bœuf de Kobe certifié halal (avec supplément). Choisissez l'option certifiée halal lors de la commande et, en cas de doute, demandez à notre équipe."],
      ["Puis-je modifier ou annuler ma réservation ?", "Consultez la page de réservation TableCheck pour savoir comment modifier ou annuler votre réservation et connaître les conditions d'annulation."]
    ]
  }
};
