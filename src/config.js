import locale from './locale/lang'
import pack from '../package'

/* | -----------------------------------------------------------------------------
 * | List of social networks
 * | -----------------------------------------------------------------------------
 * |
 */
const parse = require.context('./networks', true, /^\.\/([a-z]+)\/[a-z]+.js$/i)
export const networks = parse.keys().map(network => {
  return parse(network).default.prototype
})

/* | -----------------------------------------------------------------------------
 * | Information from package.json
 * | -----------------------------------------------------------------------------
 * |
 */
export const version = pack.version
export const repository = pack.repository.split(':')[1]
export const url = pack.url

/* | -----------------------------------------------------------------------------
 * | Translations. See Locale folder
 * | -----------------------------------------------------------------------------
 * |
 */
export const languages = Object.keys(locale)
  .filter(key => {
    return typeof locale[key].global !== 'undefined' && typeof locale[key].global.name !== 'undefined'
  })
  .map(key => {
    return { name: locale[key].global.name, value: key }
  })
