import Vue from 'vue'

export function get (method, params) {
  return Vue.http.jsonp('https://api.vk.com/method/' + method, {
    method: 'GET',
    params: params
  })
}
