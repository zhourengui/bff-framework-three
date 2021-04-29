import axios from "axios"

class SafeRequest {
  static fetch(url) {
    let result = {
      code: 0,
      message: "",
      data: null,
    }
    return new Promise((resolve, reject) => {
      axios(url)
        .then((res) => {
          result.data = res.data
          resolve(result)
        })
        .catch((err) => {
          result.message = err.message
          result.code = -1
          resolve(result)
        })
    })
  }
}
export default SafeRequest
