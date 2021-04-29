import Controller from "./Controller"
import BooksModel from "../models/BooksModel"
import { Readable } from "stream"
import { createGzip } from "zlib"
import { load } from "cheerio"

class BooksController extends Controller {
  constructor() {
    super()
  }
  async actionBooksList(ctx) {
    const booksModel = new BooksModel()
    const result = await booksModel.getBooksList()
    ctx.body = await ctx.render("books/pages/list", {
      data: [
        {
          id: 1,
          name: "图书一",
        },
        {
          id: 2,
          name: "图书二",
        },
      ],
    })
  }
  async actionBooksCreate(ctx) {
    const html = await ctx.render("books/pages/create")
    ctx.status = 200
    ctx.type = "html"
    if (ctx.req.headers["x-pjax"]) {
      console.error("x-pjax")
      const $ = load(html)
      $(".pajaxcontent").each(function () {
        ctx.res.write($(this).html())
      })
      $(".lazyload-js").each(function () {
        ctx.res.write(`<script src="${$(this).attr("src")}"></script>`)
      })
      ctx.res.end()
    } else {
      // 通过流方式读取, 大文件的静态文件 直接输出，这样就开启了bigpipe
      function createSSRStreamPromise() {
        return new Promise((resolve, reject) => {
          const rs = new Readable()
          ctx.res.setHeader("content-encoding", "gzip")
          const gz = createGzip()
          rs.push(html)
          rs.push(null)
          rs.on("error", (err) => reject(err))
            .pipe(gz)
            .pipe(ctx.res)
        })
      }
      await createSSRStreamPromise()
    }
  }
}
export default BooksController
