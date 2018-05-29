import * as colors from '../heplers/colors'
import { addLog } from '../heplers/logs'
import Vue from 'vue'

const network = class Github {
  /* | -----------------------------------------------------------------------------
   * | API
   * | -----------------------------------------------------------------------------
   * |
   */
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

  /* | -----------------------------------------------------------------------------
   * | Other
   * | -----------------------------------------------------------------------------
   * |
   */
  static logs (req, next) {
    const method = req.url.substr(this.prototype.urlApi.length)
    addLog(this, method, { method: method, params: req.params }, colors.INFO)

    next(res => {
      // TODO Error type, response code*
    })
  }
}

network.prototype.isOff = true
network.prototype.domain = 'github.com'
network.prototype.icon = 'fa-github'
network.prototype.url = 'https://github.com/'
network.prototype.urlApi = 'https://api.github.com/'

export default network
