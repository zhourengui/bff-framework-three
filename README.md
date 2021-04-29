# 搭建 BFF 架构（服务于前端的后端）3

原生实现 同构

## 判断路由是站内切还是路由刷来的

通过 http 请求，添加 x-请求头

需要两个库，一个是用来操作 dom jquery，一个是用来生成假路由，jquery-pjax（与 VueRouter 原理一模一样）
jquery-pjax 会在请求头上添加 x-pjax

然后在 server 就可以获取到这个 x-pjax，如果存在就是站内切，如果不存在就是直接刷新页面

##  直接刷新页面的逻辑实现

通过 bigpipe 吐页面

```javascript
const html = await ctx.render("books/pages/create")
function createSSRStreamPromise() {
  return new Promise((resolve, reject) => {
    const rs = new Readable()
    rs.push(html)
    rs.push(null)
    rs.on("error", (err) => reject(err))
    rs.pipe(ctx.res)
  })
}
await createSSRStreamPromise()
```

## 站内切的逻辑实现

```javascript
const html = await ctx.render("books/pages/create")
const $ = cheerio.load(html)
$(".pajaxcontent").each(function () {
  ctx.res.write($(this).html())
})
ctx.res.end()
```

js 加载同样的原理
