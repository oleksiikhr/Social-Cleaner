import store from '../store/index'

export const SOCIAL_FACEBOOK = 'Facebook'
export const SOCIAL_TWITTER = 'Twitter'
export const SOCIAL_VK = 'VK'

export const COLOR_POSITIVE = 'positive'
export const COLOR_NEGATIVE = 'negative'
// export const COLOR_WARNING = 'warning'
export const COLOR_INFO = 'info'

export const ICON_TOKEN = 'vpn_key'
export const ICON_WALL = 'dashboard'
export const ICON_STATUS = 'done'

/**
 * Adding a log item in the right menu.
 *
 * @param socialName - Name of social network (Ex. Facebook)
 * @param header - Top text
 * @param message - bottom text
 * @param icon - section (Ex. wall, image)
 * @param color - for icon
 * @param link
 *
 * @return void
 */
export function addLogs (socialName, header, message, icon, color, link = null) {
  console.log('Add log')

  // TODO: moments.js
  store.dispatch('addLog', {
    social_name: socialName,
    social_icon: getIconForSocial(socialName),
    header: header,
    message: message,
    icon: icon,
    color: color,
    link: link,
    time: null
  })
}

/**
 * Get icon for social network
 *
 * @param name - Social network
 *
 * @return string
 */
export function getIconForSocial (name) {
  switch (name) {
    case SOCIAL_FACEBOOK:
      return 'fa-facebook'

    case SOCIAL_TWITTER:
      return 'fa-twitter'

    case SOCIAL_VK:
      return 'fa-vk'

    default:
      return ''
  }
}
