import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (component) {
  return () => import(`@/components/${component}.vue`)
}

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: load('Home')
    },
    {
      path: '/vk',
      name: 'vk',
      component: load('vk/Home'),
      children: [
        { path: 'token', name: 'vk-token', component: load('vk/Token') }
      ]
    }
  ]
})
