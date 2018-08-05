const network = class Twitter {

}

/* | -----------------------------------------------------------------------------
 * | Important properties
 * | -----------------------------------------------------------------------------
 * |
 */
network.prototype.off = false
network.prototype.disabled = true
network.prototype.name = 'Twitter'
network.prototype.to = '/twitter'
network.prototype.domain = 'twitter.com'
network.prototype.icon = 'fa-twitter'
network.prototype.url = 'https://twitter.com/'
network.prototype.urlApi = ''
network.prototype.sections = []

/* | -----------------------------------------------------------------------------
 * | Important methods
 * | -----------------------------------------------------------------------------
 * |
 */
network.prototype.logs = (req, next) => {
  console.log(req)
}
network.prototype.changeLang = (name, value, valueShort) => {
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

export default network
