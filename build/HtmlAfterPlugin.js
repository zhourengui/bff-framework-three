const pluginName = "HtmlAfterPlugin"
const HtmlWebpackPlugin = require("html-webpack-plugin")

const assetsHelp = (data) => {
  let js = []
  let css = []
  for (let item of data.js) {
    //  lazyload-js 不需要待runtime
    js.push(`<script class="lazyload-js" src="${item}"></script>`)
  }
  return {
    js,
    css,
  }
}

class HtmlAfterPlugin {
  constructor() {
    this.jsArr = []
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // 拿js,css
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
          const { js } = assetsHelp(data.assets)
          this.jsArr = js
          cb(null, data)
        }
      )
      // 拿html
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          let _html = data.html
          _html = _html.replace("<!-- injectjs -->", this.jsArr.join(""))
          _html = _html.replace(/@layouts/, "../../layouts")
          _html = _html.replace(/@components/g, "../../../components")
          data.html = _html
          //  一定要加回调
          cb(null, data)
        }
      )
    })
  }
}

module.exports = HtmlAfterPlugin
