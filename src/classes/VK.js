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

  /**
   * Send request to VK.
   *
   * @param method
   * @param params
   *
   * @returns {*}
   */
  static async send (method, params) {
    params.v = this.version

    if (!params.access_token) {
      params.access_token = store.state.vk.token
    }

    const result = await Vue.http.jsonp(this.urlApi + method, {
      params: params
    })

    return result
  }

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

  static getLinkWall (item) {
    return vk.url + 'wall' + item.from_id + '_' + item.id
  }
}
