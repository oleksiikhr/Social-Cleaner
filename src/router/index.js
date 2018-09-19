/**
 * Single-page application routing.
 * @see https://router.vuejs.org/
 */
/* eslint-disable */
'use strict'

import NProgress from 'nprogress'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

// Helpers.
const page = (name) => {
  return () => import(`@/pages/${name}.vue`)
}
const layout = (name) => {
  return () => import(`@/layouts/${name}.vue`)
}

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      component: layout('Empty'),
      children: [
        {
          path: '/',
          name: 'home',
          component: page('Home')
        }
      ]
    },
    {
      path: '',
      component: layout('Default'),
      children: [
        {
          path: '/explore',
          name: 'explore',
          component: page('Explore')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
