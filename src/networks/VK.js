import { sleep, randomInteger } from '../heplers/methods'
import * as colors from '../heplers/colors'
import * as icons from '../heplers/icons'
import { addLog } from '../heplers/logs'
import store from '../store'
import Vue from 'vue'

// TODO Global process for block (send)
const network = class VK {
  /* | -----------------------------------------------------------------------------
   * | API
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * Send request to VK.
   */
  static async send (method, params = [], rnd = { min: 0, max: 0 }) {
    params.v = this.prototype.version

    if (!params.access_token) {
      params.access_token = store.state.vk.token
    }

    const result = await Vue.http.jsonp(this.prototype.urlApi + method, {
      params: params
    })

    if (rnd.max > 0 && rnd.min <= rnd.max) {
      await sleep(randomInteger(rnd.min, rnd.max))
    }

    return result
  }
  /**
   * @see https://vk.com/dev/wall.get
   */
  static async fetchWallGet (
    ownerId = store.state.vk.user.id,
    filter = 'all',
    count = this.prototype.COUNT_GET_POSTS_BASIC,
    offset = 0
  ) {
    const result = await this.send('wall.get', {
      owner_id: ownerId,
      filter: filter,
      count: count,
      offset: offset
    })

    return result
  }
  /**
   * @see https://vk.com/dev/users.get
   */
  static async fetchUsersGet (userIds = store.state.vk.user.id, fields = '') {
    const result = await this.send('users.get', {
      user_ids: userIds,
      fields: fields
    })

    return result
  }
  /**
   * @see https://vk.com/dev/groups.getById
   */
  static async fetchGroupsGetById (groupIds, fields = '') {
    const result = await this.send('groups.getById', {
      group_ids: groupIds,
      fields: fields
    })

    return result
  }
  /**
   * @see https://vk.com/dev/status.get
   */
  static async fetchStatusGet (id = store.state.vk.user.id) {
    const result = await this.send('status.get', {
      user_id: id
    })

    return result
  }
  /**
   * @see https://vk.com/dev/status.set
   */
  static async fetchStatusSet (text = '', group_id = null) {
    const result = await this.send('status.set', {
      text: text,
      group_id: group_id
    })

    return result
  }

  /* | -----------------------------------------------------------------------------
   * | LINKS
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * @see https://vk.com/dev/objects/post
   */
  static getLinkWall (item) {
    return `${this.prototype.url}wall${item.from_id}_${item.id}`
  }
  static getLinkUser (id = store.state.vk.user.id) {
    return `${this.prototype.url}id${id}`
  }
  static getLinkGroup (id) {
    return `${this.prototype.url}public${id}`
  }

  /* | -----------------------------------------------------------------------------
   * | Other
   * | -----------------------------------------------------------------------------
   * |
   */
  static logs (req, next) {
    const urlSplit = req.url.split('/')
    const method = urlSplit[urlSplit.length - 1]

    // Hide params from logs
    const params = []
    Object.keys(req.params).forEach(key => {
      const param = req.params[key]
      switch (key) {
        case 'access_token':
          params.push({ key: key, value: param.substr(0, 3) + '***' + param.substr(-3) })
          break
        case 'method':
          break
        default:
          params.push({ key: key, value: param })
      }
    })

    addLog(this, method, { method: method, params: params }, colors.INFO)

    next(res => {
      if (res.status >= 200 && res.status < 300) {
        addLog(this, method, res.body, res.body.error ? colors.ERROR : colors.SUCCESS)
        if (res.body.error) {
          Vue.prototype.$Notify.error({ title: res.body.error.error_msg || 'Error', message: method })
        }
      } else {
        addLog(this, method, 'Server error', colors.ERROR)
        Vue.prototype.$Notify.error({ title: 'Server error', message: method })
      }
    })
  }
}

network.prototype.name = 'Vkontakte'
network.prototype.to = '/vk'
network.prototype.domain = 'vk.com'
network.prototype.icon = 'fa-vk'
network.prototype.sections = [
  { name: 'vk.sections.token', to: 'vk-token', icon: icons.TOKEN },
  { name: 'vk.sections.wall', to: 'vk-wall', icon: icons.WALL },
  { name: 'vk.sections.status', to: 'vk-status', icon: icons.STATUS }
]

network.prototype.url = 'https://vk.com/'
network.prototype.urlOauth = 'https://oauth.vk.com/authorize/'
network.prototype.urlApi = 'https://api.vk.com/method/'
network.prototype.urlRedirect = 'https://oauth.vk.com/blank.html'

network.prototype.clientId = 6244330
network.prototype.version = '5.76'

network.prototype.COUNT_GET_POSTS_BASIC = 25
network.prototype.COUNT_GET_POSTS_MAX = 100

export default network
