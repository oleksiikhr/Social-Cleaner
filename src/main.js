import 'at-ui-style'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import i18n from './translate'
import AtComponents from 'at-ui'
import * as vk from './heplers/vk'
import * as config from './config'
import VueResource from 'vue-resource'
import 'font-awesome/scss/font-awesome.scss'
import { addLog, COLOR_ERROR, COLOR_INFO, COLOR_SUCCESS } from './heplers/logs'

Vue.use(AtComponents)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.interceptors.push((req, next) => {
  // VK
  if (req.url.indexOf(vk.urlApi) !== -1) {
    const urlSplit = req.url.split('/')

    // Hide params from logs
    let params = []
    Object.keys(req.params).forEach(key => {
      const param = req.params[key]
      switch (key) {
        case 'access_token':
          params.push({ key: key, value: param.substr(0, 3) + '***' + param.substr(-3) })
          break
        default:
          params.push({ key: key, value: param })
      }
    })

    addLog(config.vk, 'Receiving data..', { method: urlSplit[urlSplit.length - 1], params: params }, req.logs.icon, COLOR_INFO)

    next(res => {
      if (res.status >= 200 && res.status < 300) {
        addLog(config.vk, req.logs.msg, res.body, req.logs.icon, res.body.error ? COLOR_ERROR : COLOR_SUCCESS)
      } else {
        addLog(config.vk, 'Server error', '', req.logs.icon, COLOR_ERROR)
      }
    })
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.vk && !store.state.vk.user.id) {
    next({ name: 'vk-token' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
