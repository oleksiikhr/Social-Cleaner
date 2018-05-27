import Vue from 'vue'

const network = class Github {
  static async send (method, params = []) {
    const result = await Vue.http.get(this.prototype.urlApi + method, {
      params: params
    })

    return result
  }

  static async fetchGetRepo (name) {
    const result = await this.send('repos/' + name)

    return result
  }
}

network.prototype.isOff = true
network.prototype.domain = 'github.com'
network.prototype.icon = 'fa-github'
network.prototype.url = 'https://github.com/'
network.prototype.urlApi = 'https://api.github.com/'

export default network
