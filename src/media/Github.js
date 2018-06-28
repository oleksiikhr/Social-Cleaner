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
      .then(res => { return res })
      .catch(err => { return err })

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
  const method = req.url.substr(network.prototype.urlApi.length)
  addLog(network, method, { method: method, params: req.params }, colors.INFO)

  next(res => {
    if (res.status >= 200 && res.status < 300) {
      addLog(network, method, res.body, colors.SUCCESS)
    } else {
      addLog(network, method, res.body || 'Server error', colors.ERROR)
      Vue.prototype.$Notify.error({ title: res.body.message || 'Server error', message: method })
    }
  })
}

/* | -----------------------------------------------------------------------------
 * | Other
 * | -----------------------------------------------------------------------------
 * |
 */
export default network
