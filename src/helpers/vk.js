import Vue from 'vue'

export const urlOauth = 'https://oauth.vk.com/authorize/'
export const urlApi = 'https://api.vk.com/method/'
export const clientId = 6244330
export const version = '5.69'

export function get (method, params) {
  return Vue.http.jsonp(urlApi + method, {
    method: 'GET',
    params: params
  })
}
