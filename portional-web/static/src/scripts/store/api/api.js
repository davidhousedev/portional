const port = 8000;
const apiPath ='recipe/api/v1/';

class API {
  constructor() {
    this.url = `http://localhost:${port}/${apiPath}`
  }

  get(endpoint) {
    return fetch(`${this.url}${endpoint}`)
      .then(this.constructor._handleRequestError)
      .then(this.constructor._parseSuccessfulRequest)
  }

  static _handleRequestError(_resp) {
    return _resp.ok
      ? _resp
      : Promise.reject(`${_resp.status} ${_resp.statusText}`)
  }

  static _parseSuccessfulRequest(_resp) {
    return _resp.json()
  }

}

export default API;
