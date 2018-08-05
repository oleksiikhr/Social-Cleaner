import * as icons from '../heplers/icons'

const load = (component) => {
  return () => import(`@/components/networks/vk/${component}.vue`)
}

const getTranslateName = (name) => {
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
        name: getTranslateName('token'),
        icon: icons.TOKEN
      }
    },
    {
      path: 'wall',
      name: 'vk-wall',
      component: load('Wall'),
      meta: {
        vk: true,
        name: getTranslateName('wall'),
        icon: icons.WALL
      }
    },
    {
      path: 'status',
      name: 'vk-status',
      component: load('Status'),
      meta: {
        vk: true,
        name: getTranslateName('status'),
        icon: icons.STATUS
      }
    },
    {
      path: 'docs',
      name: 'vk-docs',
      component: load('Docs'),
      meta: {
        vk: true,
        name: getTranslateName('docs'),
        icon: icons.DOCS
      }
    }
  ]
}
