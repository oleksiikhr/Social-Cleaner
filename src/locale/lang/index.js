// The array of all translations.
const languages = []

// Import of local language translations.
const files = require.context('.', true, /\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return

  const split = key.substring(2).replace(/.js/g, '').split('/')
  const len = split.length - 1
  let current = languages

  for (let i = 0; i < len; i++) {
    if (typeof current[split[i]] === 'undefined') {
      current[split[i]] = {}
    }
    current = current[split[i]]
  }
  current[split[len]] = files(key).default
})

export default languages
