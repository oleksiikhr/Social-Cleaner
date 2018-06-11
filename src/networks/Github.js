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
}


/* | -----------------------------------------------------------------------------
 * | Important properties
 * | -----------------------------------------------------------------------------
 * |
 */
network.prototype.off = true
network.prototype.disabled = false
network.prototype.name = 'Github'
network.prototype.to = '/github'
network.prototype.domain = 'github.com'
network.prototype.icon = 'fa-github'
network.prototype.url = 'https://github.com/'
network.prototype.urlApi = 'https://api.github.com/'
network.prototype.sections = []

/* | -----------------------------------------------------------------------------
 * | Important methods
 * | -----------------------------------------------------------------------------
 * |
 */
network.prototype.logs = (req, next) => {
  const method = req.url.substr(this.default.prototype.urlApi.length)
  addLog(this.default, method, { method: method, params: req.params }, colors.INFO)

  next(res => {
    // TODO Error type, response code*
  })
}

/* | -----------------------------------------------------------------------------
 * | Other
 * | -----------------------------------------------------------------------------
 * |
 */
export default network
