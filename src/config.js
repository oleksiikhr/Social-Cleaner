import { ICON_STATUS, ICON_TOKEN, ICON_WALL } from './heplers/logs'

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
  icon: 'fa-facebook',
  disabled: true
}

export const twitter = {
  name: 'Twitter',
  to: '/twitter',
  domain: 'twitter.com',
  url: 'https://twitter.com/',
  icon: 'fa-twitter',
  disabled: true
}

export const vk = {
  name: 'Vkontakte',
  to: '/vk',
  domain: 'vk.com',
  url: 'https://vk.com/',
  icon: 'fa-vk',
  sections: [
    { name: 'vk.sections.token', to: 'vk-token', icon: ICON_TOKEN },
    { name: 'vk.sections.wall', to: 'vk-wall', icon: ICON_WALL },
    { name: 'vk.sections.status', to: 'vk-status', icon: ICON_STATUS }
  ]
}

export const networks = [
  facebook,
  twitter,
  vk
]
