const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
module.exports = {
  output: {
    path: path.join(__dirname, "../dist/assets"),
    filename: "scripts/[name].bundle.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "../src/web/views/layouts/layout.html"),
          to: "../views/layouts/layout.html",
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
        },
      ],
    }),
  ],
}
