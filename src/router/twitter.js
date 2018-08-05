import * as icons from '../heplers/icons'

const load = (component) => {
  return () => import(`@/components/media/twitter/${component}.vue`)
}

const name = (name) => {
  return `twitter.sections.${name}`
}

export default {
  path: '/twitter',
  component: load('Home'),
  children: [
    {
      path: '',
      name: 'twitter',
      component: load('Token'),
      meta: {
        name: name('token'),
        icon: icons.TOKEN
      }
    }
  ]
}
