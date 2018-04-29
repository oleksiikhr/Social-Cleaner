import store from '../store/index'

export const ICON_TOKEN = 'fa-key'
export const ICON_WALL = 'fa-tasks'

export const COLOR_SUCCESS = 'success'
export const COLOR_ERROR = 'error'
export const COLOR_WARNING = 'warning'
export const COLOR_INFO = 'info0'

/**
 * Adding a log item.
 *
 * @param socialNetwork - from config.js
 * @param message - text
 * @param icon - section (Ex. wall, image)
 * @param color - for icon
 *
 * @return void
 */
export function addLog (socialNetwork, message, icon, color) {
  store.commit('ADD_LOG', {
    social_name: socialNetwork.name,
    social_icon: socialNetwork.icon,
    message: message,
    icon: icon,
    color: color,
    time: new Date()
  })
}
