import * as add from "./add.css"
console.error(add)

export default function () {
  $(document).on("click", "#js-h3-btn", function () {
    alert("段落被电击")
  })
}
