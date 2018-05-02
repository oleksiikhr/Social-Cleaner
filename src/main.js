import 'at-ui-style'
import Vue from 'vue'
import App from './App'
import router from './router'
import AtComponents from 'at-ui'
import store from './store/index'
import * as vk from './heplers/vk'
import * as config from './config'
import VueResource from 'vue-resource'
import { addLog, COLOR_ERROR, COLOR_INFO, COLOR_SUCCESS } from './heplers/logs'

Vue.use(AtComponents)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.interceptors.push((req, next) => {
  // VK
  if (req.url.indexOf(vk.urlApi) !== -1) {
    const split = req.url.split('/')
    addLog(config.vk, 'Получение данных..', split[split.length - 1], req.logs.icon, COLOR_INFO)

    next(res => {
      if (res.status >= 200 && res.status < 300) {
        addLog(config.vk, req.logs.msg, res.body, req.logs.icon, res.body.error ? COLOR_ERROR : COLOR_SUCCESS)
      } else {
        addLog(config.vk, 'Server error', '', req.logs.icon, COLOR_ERROR)
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
