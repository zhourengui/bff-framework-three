import SafeRequest from "../utils/safeRequest"

class BooksModel {
  getBooksList() {
    return SafeRequest.fetch("http://localhost/basic/web/index.php?r=books")
  }
}
export default BooksModel
