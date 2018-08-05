import Router from 'vue-router'
import store from '../store'
import Vue from 'vue'

// Media
import vk from './vk'

Vue.use(Router)

/*
 * NOTE: It is important to keep the indexes of the array. See social networking classes.
 */

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
        },
        vk
      ]
    }
  ]
})

function load (component) {
  return () => import(`@/components/${component}.vue`)
}

router.beforeEach((to, from, next) => {
  Vue.prototype.$Loading.start()

  if (to.meta.vk && !store.state.media.vk.user.id) {
    next({ name: 'vk' })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  Vue.prototype.$Loading.finish()
})

export default router
