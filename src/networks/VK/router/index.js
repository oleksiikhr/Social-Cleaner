import * as icons from '../../../heplers/icons'

const load = (component) => {
  return () => import(`../components/${component}.vue`)
}

const name = (name) => {
  return `vk.sections.${name}`
}

export default {
  path: '/vk',
  component: load('Home'),
  children: [
    {
      path: '',
      name: 'vk',
      component: load('Token'),
      meta: {
        name: name('token'),
        icon: icons.TOKEN
      }
    },
    {
      path: 'wall',
      name: 'vk-wall',
      component: load('Wall'),
      meta: {
        auth: 'vk',
        name: name('wall'),
        icon: icons.WALL
      }
    },
    {
      path: 'status',
      name: 'vk-status',
      component: load('Status'),
      meta: {
        auth: 'vk',
        name: name('status'),
        icon: icons.STATUS
      }
    },
    {
      path: 'docs',
      name: 'vk-docs',
      component: load('Docs'),
      meta: {
        auth: 'vk',
        name: name('docs'),
        icon: icons.DOCS
      }
    }
  ]
}
