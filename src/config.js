import locale from './locale/lang'

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
