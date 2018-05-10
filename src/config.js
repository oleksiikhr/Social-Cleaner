import { ICON_TOKEN, ICON_WALL } from './heplers/logs'

export const version = require('../package').version

export const languages = [
  { name: 'English', value: 'en-US' },
  { name: 'Русский', value: 'ru-RU' }
]

/* | ---------------------------------------------------------
 * | Social Networks
 * | ---------------------------------------------------------
 * |
 */

export const facebook = {
  name: 'Facebook',
  to: '/facebook',
  domain: 'facebook.com',
  url: 'https://facebook.com/',
  wallpaper: require('@/assets/twitter/wallpaper.jpg'),
  icon: 'fa-facebook',
  disabled: true
}

export const twitter = {
  name: 'Twitter',
  to: '/twitter',
  domain: 'twitter.com',
  url: 'https://twitter.com/',
  wallpaper: require('@/assets/facebook/wallpaper.jpg'),
  icon: 'fa-twitter',
  disabled: true
}

export const vk = {
  name: 'Vkontakte',
  to: '/vk',
  domain: 'vk.com',
  url: 'https://vk.com/',
  wallpaper: require('@/assets/vk/wallpaper.jpg'),
  icon: 'fa-vk',
  sections: [
    { name: 'vk.sections.token', to: 'vk-token', icon: ICON_TOKEN },
    { name: 'vk.sections.wall', to: 'vk-wall', icon: ICON_WALL }
  ]
}

export const networks = [
  facebook,
  twitter,
  vk
]
