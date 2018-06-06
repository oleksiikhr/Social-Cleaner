const files = require.context('.', true, /\.\/[a-zA-Z-]+\/index\.js/)
const languages = {}

files.keys().forEach(key => {
  languages[key.replace(/(\.\/)|\/index\.js/g, '')] = files(key).default
})

export default languages
