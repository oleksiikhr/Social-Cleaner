import { vk } from '../config'
import store from '../store'
import Vue from 'vue'

export class VK {
  static urlOauth = 'https://oauth.vk.com/authorize/'
  static urlApi = 'https://api.vk.com/method/'
  static redirectUri = 'https://oauth.vk.com/blank.html'
  static clientId = 6244330
  static version = '5.76'

  static COUNT_GET_POSTS_BASIC = 25
  static COUNT_GET_POSTS_MAX = 100

  /* | -----------------------------------------------------------------------------
   * | API
   * | -----------------------------------------------------------------------------
   * |
   */
  /**
   * Send request to VK.
   */
  static async send (method, params = []) {
    params.v = this.version

    if (!params.access_token) {
      params.access_token = store.state.vk.token
    }

    const result = await Vue.http.jsonp(this.urlApi + method, {
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
    count = this.COUNT_GET_POSTS_BASIC,
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
    return `${vk.url}wall${item.from_id}_${item.id}`
  }
  static getLinkUser (id = store.state.vk.user.id) {
    return `${vk.url}id${id}`
  }
  static getLinkGroup (id) {
    return `${vk.url}public${id}`
  }
}
