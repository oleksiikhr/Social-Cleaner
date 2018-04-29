import Vue from 'vue'
import App from './App'
import router from './router'
import AtComponents from 'at-ui'
import store from './store/index'
import 'at-ui-style'

Vue.use(AtComponents)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
