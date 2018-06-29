import store from '../store/index'

/**
 * Adding a new log item.
 *
 * @param {class} media
 * @param {string} name
 * @param {object} request
 * @param {object} response
 * @param {string} color - success, error
 *
 * @return void
 */
export function addLog (media, name, request, response, color) {
  store.commit('ADD_LOG', {
    media: { name: media.prototype.name, icon: media.prototype.icon },
    name: name,
    request: request,
    response: response,
    color: color,
    time: new Date()
  })
}
