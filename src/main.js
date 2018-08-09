import VueResource from 'vue-resource'
import networks from './networks'
import AtComponents from 'at-ui'
import router from './router'
import i18n from './locale'
import store from './store'
import App from './App'
import Vue from 'vue'
import './mixins'

// Style
import 'at-ui-style'
import 'font-awesome/scss/font-awesome.scss'
import './assets/scss/index.scss'

console.log('MAIN.js', networks)

// Use modules
Vue.use(AtComponents)
Vue.use(VueResource)

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/Social-Cleaner/service-worker.js')
}

// Configuration modules
AtComponents.i18n((key, value) => i18n.t(key, value))

// Hide message
Vue.config.productionTip = false

// Add logs after each http call
Vue.http.interceptors.push((req, next) => {
  const isFind = networks.class.some(network => {
    if (network.urlApi && req.url.indexOf(network.urlApi) !== -1) {
      network.logs(req, next)
      return true
    }
  })

  if (!isFind) {
    Vue.prototype.$Notify.warning({ title: 'Undefined API', message: req.url })
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
