import * as add from "./add.css"
import { css, cx } from "@emotion/css"

const color = "white"
const sty = css`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  &:hover {
    color: ${color};
  }
`
console.error(sty)

export default function () {
  $(document).on("click", "#js-h3-btn", function () {
    alert("段落被电击")
  })

  $("#emotion").html(`<div class="${sty}">Hover to change color.</div>`)
}
