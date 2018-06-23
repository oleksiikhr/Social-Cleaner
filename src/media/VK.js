import { sleep, randomInteger } from '../heplers/methods'
import * as colors from '../heplers/colors'
import { addLog } from '../heplers/logs'
import router from '../router'
import store from '../store'
import Vue from 'vue'

const ROUTE_INDEX = 3

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
    // Delete unused attributes from object
    Object.keys(params).forEach(key => {
      if (params[key] === null) {
        delete params[key]
      }
    })

    params.v = this.prototype.version

    if (!params.access_token) {
      params.access_token = store.state.media.vk.token
    }

    const result = await Vue.http.jsonp(this.prototype.urlApi + method, {
      params: params
    })
      .then(res => { return res })
      .catch(err => { return err })

    // Bypass the limit of exceeding requests to the API
    if (rnd.max > 0 && rnd.min <= rnd.max) {
      await sleep(randomInteger(rnd.min, rnd.max))
    }

    return result
  }
  /**
   * @see https://vk.com/dev/account.getAppPermissions
   */
  static async fetchAccountGetAppPermissions (token) {
    const result = await this.send('account.getAppPermissions', {
      access_token: token
    })

    return result
  }
  /**
   * @see https://vk.com/dev/wall.get
   */
  static async fetchWallGet (
    ownerId = store.state.media.vk.user.id,
    filter = 'all',
    count = this.prototype.COUNT_WALL,
    offset = 0,
    sleepMin = 0,
    sleepMax = sleepMin
  ) {
    const result = await this.send('wall.get', {
      owner_id: ownerId,
      filter: filter,
      count: count,
      offset: offset
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/wall.delete
   */
  static async fetchWallDelete (postId, ownerId = store.state.media.vk.user.id, sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('wall.delete', {
      owner_id: ownerId,
      post_id: postId
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/users.get
   */
  static async fetchUsersGet (userIds = store.state.media.vk.user.id, fields = '', sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('users.get', {
      user_ids: userIds,
      fields: fields
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/groups.getById
   */
  static async fetchGroupsGetById (groupIds, fields = '', sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('groups.getById', {
      group_ids: groupIds,
      fields: fields
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/status.get
   */
  static async fetchStatusGet (id = store.state.media.vk.user.id, sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('status.get', {
      user_id: id
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/status.set
   */
  static async fetchStatusSet (text = '', groupId = null, sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('status.set', {
      text: text,
      group_id: groupId
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/docs.get
   */
  static async fetchDocsGet (
    count = this.prototype.COUNT_DOCS,
    offset = 0,
    type = 0,
    ownerId = store.state.media.vk.user.id,
    sleepMin = 0,
    sleepMax = sleepMin
  ) {
    const result = await this.send('docs.get', {
      owner_id: ownerId,
      count: count,
      offset: offset,
      type: type
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/docs.delete
   */
  static async fetchDocsDelete (docId, ownerId = store.state.media.vk.user.id, sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('docs.delete', {
      owner_id: ownerId,
      doc_id: docId
    }, { min: sleepMin, max: sleepMax })

    return result
  }

  /* | -----------------------------------------------------------------------------
   * | LINKS
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * Returns a ling to wall post (user or public)
   *
   * @param {number|string} fromId
   * @param {number|string} id
   *
   * @return string
   *
   * @see https://vk.com/dev/objects/post
   */
  static getLinkWall (fromId, id) {
    return `${this.prototype.url}wall${fromId}_${id}`
  }
  /**
   * Returns a link to a user or community page.
   *
   * @param {number|string} id
   *
   * @return string
   */
  static getLinkPage (id) {
    if (typeof id === 'number') {
      id = id.toString()
    }

    if (id.charAt(0) === '-') {
      return this.getLinkGroup(id.slice(1))
    }

    return this.getLinkUser(id)
  }
  static getLinkUser (id = store.state.media.vk.user.id) {
    return `${this.prototype.url}id${id}`
  }
  static getLinkGroup (id) {
    return `${this.prototype.url}public${id}`
  }
  static getLinkDoc (docId, userId = store.state.media.vk.user.id) {
    return `${this.prototype.url}doc${userId}_${docId}`
  }
}

/* | -----------------------------------------------------------------------------
 * | Important properties
 * | -----------------------------------------------------------------------------
 * |
 */
network.prototype.off = false
network.prototype.disabled = false
network.prototype.name = 'VK'
network.prototype.to = '/vk'
network.prototype.domain = 'vk.com'
network.prototype.icon = 'fa-vk'
network.prototype.url = 'https://vk.com/'
network.prototype.urlApi = 'https://api.vk.com/method/'
network.prototype.sections = router.options.routes[ROUTE_INDEX].children.map(route => {
  return { title: route.meta.name, name: route.name, icon: route.meta.icon, path: route.path }
})

/* | -----------------------------------------------------------------------------
 * | Important methods
 * | -----------------------------------------------------------------------------
 * |
 */
network.prototype.logs = (req, next) => {
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

  addLog(this.default, method, { method: method, params: params }, colors.INFO)

  next(res => {
    if (res.status >= 200 && res.status < 300) {
      addLog(this.default, method, res.body, res.body.error ? colors.ERROR : colors.SUCCESS)
      if (res.body.error) {
        Vue.prototype.$Notify.error({ title: res.body.error.error_msg || 'Error', message: method })
      }
    } else {
      addLog(this.default, method, 'Server error', colors.ERROR)
      Vue.prototype.$Notify.error({ title: 'Server error', message: method })
    }
  })
}

/* | -----------------------------------------------------------------------------
 * | Other
 * | -----------------------------------------------------------------------------
 * |
 */
// API params
// TODO lang request + change (as the site)
network.prototype.clientId = 6244330
network.prototype.version = '5.76'
network.prototype.urlOauth = 'https://oauth.vk.com/authorize/'
network.prototype.urlRedirect = 'https://oauth.vk.com/blank.html'

// Information about methods
network.prototype.COUNT_WALL = 100
network.prototype.COUNT_DOCS = 2000

export default network
