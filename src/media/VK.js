import { sleep, randomInteger } from '../heplers/methods'
import * as colors from '../heplers/colors'
import { addLog } from '../heplers/logs'
import router from '../router'
import store from '../store'
import Vue from 'vue'

/** @see router - Position in array */
const ROUTE_INDEX = [1, 2]

const DEFAULT_LANG = 'en'

/** @see https://vk.com/dev/api_requests - lang param */
const LIST_OF_LANG = [
  'ru', 'uk', 'be', 'en', 'es', 'fi', 'de', 'it'
]

const media = class VK {
  /* | -----------------------------------------------------------------------------
   * | Process
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * Run the process, clear the results (if any)
   *
   * @param component
   */
  static defaultStart (component) {
    store.commit('START_PROCESS', 'vk')
    component.loading = true
    component.result = []
  }
  /**
   * Stop the process. Remove the global "Stop" button
   *
   * @param component
   */
  static defaultStop (component) {
    store.commit('STOP_PROCESS', 'vk')
    store.commit('CLEAR_CANCEL', 'vk')
    component.loading = false
  }
  /**
   * Process:
   * Get the maximum number of records. Pass through each record and check.
   * If the check is successful - delete. No - skip.
   * We get a trace. a lot of posts and go through again.
   * If there are any errors or items are empty - we stop.
   *
   * NOTE: Callbacks are required in the component!
   * callbackGet - get the data from the server.
   * callbackCheck - Checking the recording of filters.
   * callbackDelete - send a request to the server for deletion.
   *
   * @param component
   * @param {number} maxCountApi
   * @return {Promise<void>}
   */
  static async doStartDefault (component, maxCountApi) {
    this.defaultStart(component)

    const countLoop = component.getCountLoop(component.main.count, maxCountApi)

    for (let i = 0; i < countLoop; i++) {
      const res = await component.callbackGet(component.getMaxCountItems(component.main.count, maxCountApi))
      if (res.ok && res.body.response) {
        const len = res.body.response.items.length
        for (let j = 0; j < len; j++) {
          const item = res.body.response.items[j]
          if (component.callbackCheck(item, true)) {
            const resDelete = await component.callbackDelete(item)
            if (resDelete.ok && resDelete.body.response) {
              component.main.count.max--
            } else {
              component.result.splice(component.result.length - 1, 1)
              return this.defaultStop(component)
            }
          } else {
            component.main.count.min++
          }
        }
      } else {
        return this.defaultStop(component)
      }
    }

    return this.defaultStop(component)
  }
  /**
   * Process:
   * Get the maximum number of records. Pass through each record and check.
   * Check each entry and resend requests to the server.
   *
   * NOTE: Callbacks are required in the component!
   * callbackGet - get the data from the server.
   * callbackCheck - Checking the recording of filters.
   *
   * @param component
   * @param {number} maxCountApi
   * @return {Promise<void>}
   */
  static async doPreviewDefault (component, maxCountApi) {
    this.defaultStart(component)

    const countLoop = component.getCountLoop(component.main.count, maxCountApi)

    for (let i = 0; i < countLoop; i++) {
      const offset = i * maxCountApi
      const leftItems = component.main.count.max - offset
      const res = await component.callbackGet(leftItems > maxCountApi ? maxCountApi : leftItems, offset)

      if (res.ok && res.body.response && res.body.response.items.length) {
        res.body.response.items.forEach(item => component.callbackCheck(item))
      } else {
        return this.defaultStop(component)
      }
    }

    return this.defaultStop(component)
  }
  /**
   * Stop process delete.
   */
  static doStopDefault () {
    store.commit('SET_CANCEL', 'vk')
  }

  /* | -----------------------------------------------------------------------------
   * | API
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * Send request to VK.
   */
  static async send (method, params = [], rnd = { min: 0, max: 0 }) {
    // if the user canceled the data cleaning
    if (store.state.media.vk.cancel) {
      return {}
    }

    // Delete unused attributes from object
    Object.keys(params).forEach(key => {
      if (params[key] === null) {
        delete params[key]
      }
    })

    // Set the required parameters for each request
    params.v = this.prototype.version
    params.lang = this.prototype.lang

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
   * @see https://vk.com/dev/wall.getComments
   */
  static async fetchWallGetComments (
    postId,
    ownerId = store.state.media.vk.user.id,
    count = this.prototype.COUNT_WALL_COMMENTS,
    offset = 0,
    needLikes = true,
    sleepMin = 0,
    sleepMax = sleepMin
  ) {
    const result = await this.send('wall.getComments', {
      owner_id: ownerId,
      post_id: postId,
      count: count,
      offset: offset,
      need_likes: needLikes
    }, { min: sleepMin, max: sleepMax })

    return result
  }
  /**
   * @see https://vk.com/dev/wall.deleteComment
   */
  static async fetchWallDeleteComment (commentId, ownerId = store.state.media.vk.user.id, sleepMin = 0, sleepMax = sleepMin) {
    const result = await this.send('wall.deleteComment', {
      owner_id: ownerId,
      comment_id: commentId
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
media.prototype.off = false
media.prototype.disabled = false
media.prototype.name = 'VK'
media.prototype.to = '/vk'
media.prototype.domain = 'vk.com'
media.prototype.icon = 'fa-vk'
media.prototype.url = 'https://vk.com/'
media.prototype.urlApi = 'https://api.vk.com/method/'
media.prototype.sections = router.options.routes[ROUTE_INDEX[0]].children[ROUTE_INDEX[1]].children.map(route => {
  return { title: route.meta.name, name: route.name, icon: route.meta.icon, path: route.path }
})

/* | -----------------------------------------------------------------------------
 * | Important methods
 * | -----------------------------------------------------------------------------
 * |
 */
media.prototype.logs = (req, next) => {
  const urlSplit = req.url.split('/')
  const name = urlSplit[urlSplit.length - 1]

  // Hide important information in the logs
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

  next(res => {
    if (res.status >= 200 && res.status < 300) {
      addLog(media, name, { method: name, params: params }, res.body, res.body.error ? colors.ERROR : colors.SUCCESS)
      if (res.body.error) {
        Vue.prototype.$Notify.error({ title: res.body.error.error_msg || 'Error', message: name })
      }
    } else {
      addLog(media, name, { method: name, params: params }, 'Server error', colors.ERROR)
      Vue.prototype.$Notify.error({ title: 'Server error', message: name })
    }
  })
}
media.prototype.changeLang = (name, value, valueShort) => {
  media.prototype.lang = LIST_OF_LANG.includes(valueShort) ? valueShort : DEFAULT_LANG
}

/* | -----------------------------------------------------------------------------
 * | Other properties
 * | -----------------------------------------------------------------------------
 * |
 */
// API params
media.prototype.clientId = 6244330
media.prototype.version = '5.80'
media.prototype.lang = DEFAULT_LANG
media.prototype.urlOauth = 'https://oauth.vk.com/authorize/'
media.prototype.urlRedirect = 'https://oauth.vk.com/blank.html'

// Information about methods
media.prototype.COUNT_WALL = 100
media.prototype.COUNT_DOCS = 2000
media.prototype.COUNT_WALL_COMMENTS = 100

/* | -----------------------------------------------------------------------------
 * | Other methods
 * | -----------------------------------------------------------------------------
 * |
 */
// ..

export default media
