import Router from 'vue-router'
import store from '../store'
import Vue from 'vue'

Vue.use(Router)

// Import router from social networks
const networks = require.context('../networks', true, /^\.\/([a-z]+)\/router\/index.js$/i)
const networksRouter = networks.keys().map(network => {
  return networks(network).default
})

const load = (component) => {
  return () => import(`@/components/${component}.vue`)
}

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      component: load('layouts/Landing'),
      children: [
        {
          path: '/',
          name: 'home',
          component: load('Home')
        }
      ]
    },
    {
      path: '',
      component: load('layouts/Default'),
      children: [
        {
          path: '/explore',
          name: 'explore',
          component: load('Explore')
        },
        {
          path: '/logs',
          name: 'logs',
          component: load('Logs')
        }
      ].concat(networksRouter)
    }
  ]
})

// TODO Create another template for social networks

router.beforeEach((to, from, next) => {
  Vue.prototype.$Loading.start()

  if (to.meta.auth && !store.state.networks[to.meta.auth].isAuth) {
    next({ name: to.meta.auth })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  Vue.prototype.$Loading.finish()
})

export default router
