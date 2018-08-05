import store from '../store/index'

/**
 * Adding a new log item.
 *
 * @param {class} network
 * @param {string} name
 * @param {object} request
 * @param {object} response
 * @param {string} color - success, error
 *
 * @return void
 */
export function addLog (network, name, request, response, color) {
  store.commit('ADD_LOG', {
    network: { name: network.prototype.name, icon: network.prototype.icon },
    name: name,
    request: request,
    response: response,
    color: color,
    time: new Date()
  })
}
