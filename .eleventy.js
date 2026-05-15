/**
 * Eleventy 設定
 * - 入力: src/   出力: _site/
 * - image/, movie/, store-render.js はそのままコピー（passthrough）
 * - テンプレート言語は Nunjucks (.njk)
 */
export default function(eleventyConfig) {
  // 静的アセットはそのまま出力にコピー
  eleventyConfig.addPassthroughCopy({ "src/image": "image" });
  eleventyConfig.addPassthroughCopy({ "src/movie": "movie" });
  eleventyConfig.addPassthroughCopy({ "src/store-render.js": "store-render.js" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
