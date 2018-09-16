import router from './router'
import store from './store'
import App from './App.vue'
import Vue from 'vue'

// Styles
import './styles/index.scss'
import 'normalize.css'

// Hide message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
