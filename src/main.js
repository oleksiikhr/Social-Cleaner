import 'font-awesome/scss/font-awesome.scss'
import VueResource from 'vue-resource'
import AtComponents from 'at-ui'
import networks from './media'
import router from './router'
import i18n from './locale'
import store from './store'
import App from './App'
import Vue from 'vue'
import 'at-ui-style'
import './mixins'

Vue.use(AtComponents)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.interceptors.push((req, next) => {
  const isFind = networks.some(network => {
    if (req.url.indexOf(network.urlApi) !== -1) {
      network.logs(req, next)
      return true
    }
  })

  if (!isFind) {
    Vue.prototype.$Notify.warning({ title: 'Undefined API', message: req.url })
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.vk && !store.state.media.vk.user.id) {
    next({ name: 'vk' })
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
