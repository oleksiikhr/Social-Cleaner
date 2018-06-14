const files = require.context('.', false, /\.js$/)
const media = []

files.keys().forEach(key => {
  if (key === './index.js') return
  media.push(files(key).default.prototype)
})

export default media
