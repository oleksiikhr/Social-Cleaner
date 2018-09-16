import router from './router'
import store from './store'
import i18n from './locale'
import App from './App.vue'
import Vue from 'vue'

// Styles
import 'normalize.css'
import './styles/index.scss'

// Hide message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
