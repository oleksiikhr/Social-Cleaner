import store from '../store/index'

// Font-awesome
export const ICON_TOKEN = 'key'
export const ICON_WALL = 'bars'
export const ICON_STATUS = 'comment-o'

export const COLOR_SUCCESS = 'success'
export const COLOR_WARNING = 'warning'
export const COLOR_ERROR = 'error'
export const COLOR_INFO = 'info'

/**
 * Adding a log item.
 *
 * @param socialNetwork - from config.js
 * @param method
 * @param response
 * @param icon - section (Ex. wall, image)
 * @param color - for icon
 *
 * @return void
 */
export function addLog (socialNetwork, method, response, icon, color) {
  store.commit('ADD_LOG', {
    socialNetwork: socialNetwork,
    method: method,
    response: response,
    icon: icon,
    color: color,
    time: new Date()
  })
}
