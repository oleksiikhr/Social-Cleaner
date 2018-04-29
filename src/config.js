export const version = '2.0.0'

/* | ---------------------------------------------------------
 * | Social Networks
 * | ---------------------------------------------------------
 * |
 */

export const facebook = {
  name: 'Facebook',
  to: '/facebook',
  domain: 'facebook.com',
  wallpaper: require('@/assets/twitter/wallpaper.jpg'),
  icon: 'fa-facebook'
}

export const twitter = {
  name: 'Twitter',
  to: '/twitter',
  domain: 'twitter.com',
  wallpaper: require('@/assets/facebook/wallpaper.jpg'),
  icon: 'fa-twitter'
}

export const vk = {
  name: 'Vkontakte',
  to: '/vk',
  domain: 'vk.com',
  wallpaper: require('@/assets/vk/wallpaper.jpg'),
  icon: 'fa-vk'
}

export const networks = [
  facebook,
  twitter,
  vk
]
