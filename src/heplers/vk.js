import store from '../store/index'
import Vue from 'vue'

export const urlOauth = 'https://oauth.vk.com/authorize/'
export const urlApi = 'https://api.vk.com/method/'
export const redirectUri = 'https://oauth.vk.com/blank.html'
export const clientId = 6244330
export const version = '5.74'

/**
 * Send request to VK.
 *
 * @param method
 * @param params
 * @param icon
 *
 * @returns {*}
 */
export function send (method, params, icon) {
  params.v = version

  if (!params.access_token) {
    params.access_token = store.state.vk.token
  }

  return Vue.http.jsonp(urlApi + method, {
    params: params,
    icon: icon
  })
}
