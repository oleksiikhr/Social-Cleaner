import { ICON_STATUS, ICON_TOKEN, ICON_WALL } from '../heplers/logs'
import store from '../store'
import Vue from 'vue'

const network = class VK {
  /* | -----------------------------------------------------------------------------
   * | API
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * Send request to VK.
   */
  static async send (method, params = []) {
    params.v = this.prototype.version

    if (!params.access_token) {
      params.access_token = store.state.vk.token
    }

    const result = await Vue.http.jsonp(this.prototype.urlApi + method, {
      params: params
    })

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
}

network.prototype.name = 'Vkontakte'
network.prototype.to = '/vk'
network.prototype.domain = 'vk.com'
network.prototype.icon = 'fa-vk'
network.prototype.sections = [
  { name: 'vk.sections.token', to: 'vk-token', icon: ICON_TOKEN },
  { name: 'vk.sections.wall', to: 'vk-wall', icon: ICON_WALL },
  { name: 'vk.sections.status', to: 'vk-status', icon: ICON_STATUS }
]

network.prototype.url = 'https://vk.com/'
network.prototype.urlOauth = 'https://oauth.vk.com/authorize/'
network.prototype.urlApi = 'https://api.vk.com/method/'

network.prototype.redirectUri = 'https://oauth.vk.com/blank.html'
network.prototype.clientId = 6244330
network.prototype.version = '5.76'

network.prototype.COUNT_GET_POSTS_BASIC = 25
network.prototype.COUNT_GET_POSTS_MAX = 100

export default network
