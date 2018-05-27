const files = require.context('.', false, /\.js$/)
const networks = []

files.keys().forEach(key => {
  if (key === './index.js') return

  const prototype = files(key).default.prototype

  if (prototype.isOff) return

  networks.push({
    name: prototype.name,
    to: prototype.to,
    domain: prototype.domain,
    url: prototype.url,
    icon: prototype.icon,
    sections: prototype.sections,
    disabled: prototype.disabled
  })
})

export default networks
