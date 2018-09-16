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

// Component loading by name.
const load = (component) => {
  return () => import(`@/components/${component}.vue`)
}

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: load('Home')
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
