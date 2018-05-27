import 'at-ui-style'
import Vue from 'vue'
import App from './App'
import store from './store'
import i18n from './locale'
import router from './router'
import VK from './networks/VK'
import AtComponents from 'at-ui'
import VueResource from 'vue-resource'
import 'font-awesome/scss/font-awesome.scss'
import { addLog, COLOR_ERROR, COLOR_INFO, COLOR_SUCCESS } from './heplers/logs'

Vue.use(AtComponents)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.interceptors.push((req, next) => {
  // VK
  if (req.url.indexOf(VK.prototype.urlApi) !== -1) {
    const urlSplit = req.url.split('/')
    const method = urlSplit[urlSplit.length - 1]

    // Hide params from logs
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

    addLog(VK, method, { method: method, params: params }, COLOR_INFO)

    next(res => {
      if (res.status >= 200 && res.status < 300) {
        addLog(VK, method, res.body, res.body.error ? COLOR_ERROR : COLOR_SUCCESS)
        if (res.body.error) {
          Vue.prototype.$Notify.error({ title: res.body.error.error_msg || 'Error', message: method })
        }
      } else {
        addLog(VK, method, 'Server error', COLOR_ERROR)
        Vue.prototype.$Notify.error({ title: 'Server error', message: method })
      }
    })
  }

  // TODO Github
  // TODO else
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
