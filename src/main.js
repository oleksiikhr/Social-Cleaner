import 'font-awesome/scss/font-awesome.scss'
import VueResource from 'vue-resource'
import Github from './networks/Github'
import AtComponents from 'at-ui'
import VK from './networks/VK'
import router from './router'
import i18n from './locale'
import store from './store'
import App from './App'
import Vue from 'vue'
import 'at-ui-style'

Vue.use(AtComponents)
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.interceptors.push((req, next) => {
  if (req.url.indexOf(VK.prototype.urlApi) !== -1) {
    VK.logs(req, next)
  } else if (req.url.indexOf(Github.prototype.urlApi) !== -1) {
    Github.logs(req, next)
  } else {
    Vue.prototype.$Notify.warning({ title: 'API', message: req.url })
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

Vue.mixin({
  methods: {
    /**
     * Add a new, unique and sorted number to an array from the input.
     *
     * @param obj - {input, numbers}
     */
    pushNumber (obj) {
      const id = parseInt(obj.input)

      if (id) {
        obj.items.push(id)
        obj.items = Array.from(new Set(obj.items.sort((a, b) => a - b)))
      }

      obj.input = ''
    },
    /**
     * Add a new, unique, and sorted string to an array from the input.
     *
     * @param obj - {input, items}
     */
    pushString (obj) {
      const value = obj.input.toLowerCase().trim()

      if (value) {
        obj.items.push(value)
        obj.items = Array.from(new Set(obj.items.sort()))
      }

      obj.input = ''
    },
    /**
     * HTML (on / off).
     *
     * @param {int|boolean} inner
     *
     * @return string
     */
    getStyleStatus (inner) {
      return 'status status-' + (inner ? 'on' : 'off')
    }
  }
})
