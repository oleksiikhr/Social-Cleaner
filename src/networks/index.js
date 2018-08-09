const networks = ['VK', 'Github', 'Twitter']
const folders = ['class', 'store', 'router', 'locale', 'scss']

const storage = {}

folders.forEach(folder => {
  storage[folder] = []
})

networks.forEach(network => {
  // Import prototype of every class
  storage['class'].push(require(`./${network}/${network}.js`).default.prototype)

  folders.forEach(folder => {
    try {
      storage[folder].push(require(`./${network}/${folder}`).default)
    } catch (e) { }
  })
})

console.log(storage)

export default storage
