import Vue from 'vue'
import store from 'store/index'

export const urlOauth = 'https://oauth.vk.com/authorize/'
export const urlApi = 'https://api.vk.com/method/'
export const redirectUri = 'https://oauth.vk.com/blank.html'
export const clientId = 6244330
export const version = '5.69'

export function jsonp (method, params) {
  params.v = version

  if (!params.access_token) {
    params.access_token = store.state.vk.token
  }

  return Vue.http.jsonp(urlApi + method, {
    method: 'GET',
    params: params
  })
}
