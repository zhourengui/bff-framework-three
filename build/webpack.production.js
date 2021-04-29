const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const minify = require("html-minifier").minify
module.exports = {
  output: {
    path: path.join(__dirname, "../dist/assets"),
    filename: "scripts/[name].[contenthash:5].bundle.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "../src/web/views/layouts/layout.html"),
          to: "../views/layouts/layout.html",
          transform(content, absoluteFrom) {
            return minify(content.toString("utf-8"), {
              collapseWhitespace: true,
            })
          },
        },
        {
          from: path.join(__dirname, "../src/web/components/"),
          to: "../components",
          filter: (url) => {
            if (/\.(js|css)$/.test(url)) {
              return false
            }
            return true
          },
          transform(content, absoluteFrom) {
            return minify(content.toString("utf-8"), {
              collapseWhitespace: true,
            })
          },
        },
      ],
    }),
  ],
}
