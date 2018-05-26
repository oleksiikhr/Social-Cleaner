import Vue from 'vue'

export class Github {
  static domain = 'github.com'
  static icon = 'fa-github'
  static url = 'https://github.com/'
  static urlApi = 'https://api.github.com/'

  static async send (method, params = []) {
    const result = await Vue.http.get(this.urlApi + method, {
      params: params
    })

    return result
  }

  static async fetchGetRepo (name) {
    const result = await this.send('repos/' + name)

    return result
  }
}
