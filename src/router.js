import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: load('Dashboard')
    },
    {
      path: '/vk',
      name: 'vk',
      component: load('vk/Dashboard'),
      children: [
        { path: 'token', name: 'vk-token', component: load('vk/Token') },
        { path: 'friends', name: 'vk-friends', component: load('vk/Friends') },
        { path: 'wall', name: 'vk-wall', component: load('vk/Wall') },
        { path: 'docs', name: 'vk-docs', component: load('vk/Docs') }
      ]
    },
    {
      path: '*',
      name: 'error404',
      component: load('Error404')
    }
  ]
})

// TODO: If the token is not
router.beforeResolve((from, to, next) => {
  next()
})

export default router
