import locale from './locale/lang'
import pack from '../package'

/* | -----------------------------------------------------------------------------
 * | Information from package.json
 * | -----------------------------------------------------------------------------
 * |
 */
export const version = pack.version
export const repository = pack.repository

/* | -----------------------------------------------------------------------------
 * | Translations. See Locale folder
 * | -----------------------------------------------------------------------------
 * |
 */
export const languages = Object.keys(locale)
  .filter(key => {
    return typeof locale[key].global.name !== 'undefined'
  })
  .map(key => {
    return { name: locale[key].global.name, value: key }
  })
