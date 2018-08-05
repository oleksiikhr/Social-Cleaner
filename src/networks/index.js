const files = require.context('.', false, /\.js$/)
const networks = []

files.keys().forEach(key => {
  if (key === './index.js') return
  networks.push(files(key).default.prototype)
})

export default networks
