import * as colors from '../heplers/colors'
import { addLog } from '../heplers/logs'
import Vue from 'vue'

const media = class Github {
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
media.prototype.off = true
media.prototype.disabled = false
media.prototype.name = 'Github'
media.prototype.to = '/github'
media.prototype.domain = 'github.com'
media.prototype.icon = 'fa-github'
media.prototype.url = 'https://github.com/'
media.prototype.urlApi = 'https://api.github.com/'
media.prototype.sections = []

/* | -----------------------------------------------------------------------------
 * | Important methods
 * | -----------------------------------------------------------------------------
 * |
 */
media.prototype.logs = (req, next) => {
  const name = req.url.substr(media.prototype.urlApi.length)

  next(res => {
    if (res.status >= 200 && res.status < 300) {
      addLog(media, name, { method: name, params: req.params }, res.body, colors.SUCCESS)
    } else {
      addLog(media, name, { method: name, params: req.params }, res.body || 'Server error', colors.ERROR)
      Vue.prototype.$Notify.error({ title: res.body.message || 'Server error', message: name })
    }
  })
}

export default media
