const media = class Twitter {

}

/* | -----------------------------------------------------------------------------
 * | Important properties
 * | -----------------------------------------------------------------------------
 * |
 */
media.prototype.off = false
media.prototype.disabled = false
media.prototype.name = 'Twitter'
media.prototype.to = '/twitter'
media.prototype.domain = 'twitter.com'
media.prototype.icon = 'fa-twitter'
media.prototype.url = 'https://twitter.com/'
media.prototype.urlApi = ''
media.prototype.sections = []

/* | -----------------------------------------------------------------------------
 * | Important methods
 * | -----------------------------------------------------------------------------
 * |
 */
media.prototype.logs = (req, next) => {
  console.log(req)
}
media.prototype.changeLang = (name, value, valueShort) => {
  //
}

/* | -----------------------------------------------------------------------------
 * | Other properties
 * | -----------------------------------------------------------------------------
 * |
 */
// ..

/* | -----------------------------------------------------------------------------
 * | Other methods
 * | -----------------------------------------------------------------------------
 * |
 */
// ..

export default media
