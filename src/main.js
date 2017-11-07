// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
require(`quasar/dist/quasar.ie`)
require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Quasar from 'quasar'
import router from './router'
import store from 'store/index'

Vue.config.productionTip = false
Vue.use(Quasar)
Vue.use(Vuex)
Vue.use(VueResource)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Vue.http.interceptor.before = (request, next) => {
  request.emulateJSON = true
  request.emulateHTTP = true

  next((res) => {
    var body = res.body

    if (typeof res.body === 'string') {
      try {
        body = JSON.parse(res.body)
      }
      catch (e) {
        return console.log('Error: Response is not JSON format')
      }
    }
    else if (typeof res.body !== 'object') {
      return console.log('Error: Response format')
    }

    if (res.url.indexOf('api.vk.com') > -1) {
      if (body.error && body.error.error_code === 5 && store.state.vk.user) {
        store.dispatch('vkExit')
        return router.push({ name: 'vk-token' })
      }
    }
  })
}

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App').default)
  })
})
