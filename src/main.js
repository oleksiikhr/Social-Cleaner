import Vue from 'vue'
import App from './App'
import router from './router'
import AtComponents from 'at-ui'
import 'at-ui-style'

Vue.use(AtComponents)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
