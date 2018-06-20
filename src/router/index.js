import * as icons from '../heplers/icons'
import NProgress from 'nprogress'
import Router from 'vue-router'
import store from '../store'
import Vue from 'vue'

Vue.use(Router)

function load (component) {
  return () => import(`@/components/${component}.vue`)
}

/*
 * NOTE: It is important to keep the indexes of the array. See social networking classes.
 */

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: load('Home')
    },
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
    {
      path: '/vk',
      component: load('vk/Home'),
      children: [
        {
          path: '',
          name: 'vk',
          component: load('vk/Token'),
          meta: {
            name: 'vk.sections.token',
            icon: icons.TOKEN
          }
        },
        {
          path: 'wall',
          name: 'vk-wall',
          component: load('vk/Wall'),
          meta: {
            vk: true,
            name: 'vk.sections.wall',
            icon: icons.WALL
          }
        },
        {
          path: 'status',
          name: 'vk-status',
          component: load('vk/Status'),
          meta: {
            vk: true,
            name: 'vk.sections.status',
            icon: icons.STATUS
          }
        },
        {
          path: 'docs',
          name: 'vk-docs',
          component: load('vk/Docs'),
          meta: {
            vk: true,
            name: 'vk.sections.docs',
            icon: icons.DOCS
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.meta.vk && !store.state.media.vk.user.id) {
    next({ name: 'vk' })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
