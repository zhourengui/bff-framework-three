const { argv } = require("yargs")
const path = require("path")
const _mode = argv.mode || "development"
const envConfig = require(`./build/webpack.${_mode}.js`)
const { merge } = require("webpack-merge")
const glob = require("glob")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlAfterPlugin = require("./build/HtmlAfterPlugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

/* 文件遍历 入口 模板 */
const files = glob.sync("./src/web/views/**/*.entry.js")
const entries = {}
const htmlPlugins = []
files.forEach((url) => {
  if (/([a-zA-Z]+-[a-zA-Z]+)\.entry\.js/.test(url)) {
    const entryKey = RegExp.$1
    const [pagesName, template] = entryKey.split("-")
    entries[entryKey] = url
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: `../views/${pagesName}/pages/${template}.html`,
        template: `./src/web/views/${pagesName}/pages/${template}.html`,
        chunks: ["runtime", entryKey],
        inject: false,
      })
    )
  }
})
const baseConfig = {
  output: {
    publicPath: "/",
  },
  mode: _mode,
  entry: entries,
  optimization: {
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        enforce: "pre",
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "typed-css-modules-loader",
        // or in case you want to use parameters:
        // loader: 'typed-css-modules?outDir=/tmp'
        // or in case you want to use noEmit:
        // loader: 'typed-css-modules?noEmit'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
              importLoaders: 1,
              // modules: true,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    ...htmlPlugins,
    new HtmlAfterPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src/web"),
    },
  },
}
module.exports = merge(baseConfig, envConfig)
