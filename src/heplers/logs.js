import store from '../store/index'

/**
 * Adding a log item.
 *
 * @param socialNetwork class
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
