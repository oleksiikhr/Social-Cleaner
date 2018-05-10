const files = require.context('.', false, /\.js$/)
const languages = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  languages[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default languages
