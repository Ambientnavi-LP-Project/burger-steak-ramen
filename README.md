# Wagyu Steak Hamburger & Ramen (Halal) — 店舗ページ

業態：全業態対応(バーガーステーキラーメン)。ドメイン：halal-food-wagyu.com 
Eleventy(11ty)製の静的サイト。テンプレート1枚 + 店舗データから、全店舗ページを自動生成する。

GTMコンテナID: `GTM-5DGT9H6L`（GA4への送信はGTM側で設定）

---

## ディレクトリ

| ファイル / フォルダ | 役割 |
|---|---|
| `src/_data/stores.json` | **店舗データ。基本ここだけ編集すればOK**（12店舗） |
| `src/store.njk` | 店舗ページのひな型（全店舗で共通） |
| `src/store-render.js` | 背景画像など、ビルド時に埋められない一部の処理だけを担当 |
| `src/image/` `src/movie/` | 写真・動画。そのまま `_site/` にコピーされる |
| `.eleventy.js` | ページ生成の設定 |
| `vercel.json` | 公開設定 |

`store.njk` は1枚しかない。**店舗が増えてもページを作る必要はなく、`stores.json` にデータを足すだけ**。
逆に言うと、`store.njk` を1か所直すと**全店舗のページが同時に変わる**。

## ローカルで動かす

```bash
npm install     # 初回のみ
npm start       # → http://localhost:8080/tokyo/oshiage/
npm run build   # 本番ビルド → _site/
```

本番は Vercel が `main` への push を検知して自動ビルド・配信する。

---

## 計測イベント一覧

このLPで実際に実装しているイベント。
計測は **GTM コンテナ `GTM-5DGT9H6L`** 1本に集約している。

| イベント名 | 発火する場所 | 実装 |
|---|---|---|
| `reserve_click` | ナビ「Reserve a Table」／スマホ下部固定バー「RESERVE」／フローティングCTA／最終CTA「Reserve via TableCheck」／離脱時モーダル「Reserve Now」（計5か所。**`reserveUrl` を入れた店舗でのみ**） | `data-ga-event="{{ reserveEvent }}"` |
| `tel_click` | 最終CTA下の電話リンク。加えて、`reserveUrl` が空の店舗では上記の予約CTA5か所も電話リンクになるため `tel_click` として計測される | `data-ga-event="tel_click"` / `{{ reserveEvent }}` |
| `map_click` | レビュー欄「Read more on Google」／アクセス欄「Open in Google Maps」（**`hideGoogleLinks: true` の店舗では非表示**） | `data-ga-event="map_click"` |
| `outbound_click` | 最終CTA下の Instagram／フッターの Instagram アイコン | `data-ga-event="outbound_click"` |
| `scroll_depth` | ページのスクロール到達率 | GTM組み込みトリガー（コード実装なし） |

### 仕組み

計測方式は **1つだけ**。計測したい要素に `data-ga-event="イベント名"` を付けると、
ページ末尾の委譲リスナー1本が `dataLayer` に push する。

```js
window.dataLayer.push({ event: el.getAttribute('data-ga-event') });
```

店舗名・エリアなどの**パラメータはコード側で組み立てない**。
GTM 側で URL（ホスト名／パス）から解決する。
そのため `stores.json` に店舗を追加しても、計測用の設定を書き足す必要はない。

予約CTAだけはイベント名が動的（`reserveEvent`）になっている。
`reserveUrl` が入っていれば `reserve_click`、空で電話リンクにフォールバックしたときは
`tel_click` を送る。予約サイトへの遷移と電話発信を取り違えないための切り替え。

### 実装していないもの

- **地図の埋め込み（iframe）**は計測対象外。ブラウザの仕様上、iframe 内部のクリックは
  親ページの JavaScript では検知できない。地図の反応は「Open in Google Maps」リンクで見る。
- `reservation_form_submit` / `final_check_view` は自社予約フォームを使うLP用。
  このLPは TableCheck への外部遷移のみのため対象外。
- `course_select` はコース選択UIがあるLP用。このLPのメニュー欄は一覧表示のみで選択操作がない。

---

## 店舗データ（`src/_data/stores.json`）

このリポジトリは他業態より前に作られたため、**フィールド名が他リポジトリと異なる**。
中身は同じものを指している。

| このリポジトリ | 他リポジトリでの名前 | 内容 |
|---|---|---|
| `reserve_system` | 同じ | 予約導線の種類（`"tablecheck"` / `"form"`） |
| `reserveUrl` | `tablecheck_url` | TableCheckの予約URL。空なら電話予約にフォールバック |
| `phone` | `tel_display` | 画面に表示される電話番号 |
| `phoneHref` | `tel_raw` | タップ発信用（`tel:+81-3-...` 形式。こちらは `tel:` を含む） |
| `mapPlaceUrl` | `maps_link` | Googleマップの共有URL |
| `mapEmbedUrl` | `maps_embed` | 地図の埋め込みURL（`<iframe>` の `src=` の中身だけ） |
| `permalink` | — | ページのURL（例: `tokyo/oshiage`） |
| `hideGoogleLinks` | — | `true` にすると地図とGoogleレビューへのリンクを隠す |

### 値によって出たり消えたりするもの

| 項目 | 空 / false のとき | 値を入れたとき |
|---|---|---|
| `reserveUrl` | 予約ボタンが電話リンクになる（計測も `tel_click` に切り替わる） | TableCheckへのリンクになる |
| `hideGoogleLinks: true` | 地図とGoogleレビューのリンクが消える（`map_click` は発火しない） | 地図が出る |
| `storyBgImage` | Why セクションが単色背景 | 指定画像が背景になる |

### 現状

`ueno` のみ `reserveUrl` / `mapPlaceUrl` / `mapEmbedUrl` が空で `hideGoogleLinks: true`。
そのため上野店だけ `reserve_click` と `map_click` が発火しない。
値を入れればテンプレート側は変更不要で計測されるようになる。

## 計測要件

LPの作成・デザイン変更・テンプレート追加を行う際は、必ず以下を参照すること。
CTAの書き方やTableCheckのURL指定を誤ると、広告のコンバージョン計測が停止する。

https://github.com/Ambientnavi-LP-Project/omakase/blob/main/docs/LP%E4%BD%9C%E6%88%90%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88.md
