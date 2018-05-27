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
 * @param socialNetwork
 * @param method
 * @param response
 * @param color
 *
 * @return void
 */
export function addLog (socialNetwork, method, response, color) {
  store.commit('ADD_LOG', {
    socialNetwork: { name: socialNetwork.prototype.name, icon: socialNetwork.prototype.icon },
    method: method,
    response: response,
    color: color,
    time: new Date()
  })
}
