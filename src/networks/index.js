// List of all social networks
// TODO Auto get of all social networks
const networks = ['VK', 'Github', 'Twitter']

// Folders to be imported into storage (index.js file)
const folders = ['class', 'store', 'router', 'locale', 'scss']

// Write all the data here
const storage = {}

const loadClass = (network) => {
  return () => import(`./${network}/${network}.js`).default.prototype
}

const loadFolder = (network, folder) => {
  return () => import(`./${network}/${folder}`).default
}

// Initialize array to every folder
folders.forEach(folder => {
  storage[folder] = []
})

networks.forEach(network => {
  // Import prototype of every class
  storage['class'].push(loadClass(network))

  // Import other folders
  folders.forEach(folder => {
    try {
      storage[folder].push(loadFolder(network, folder))
    } catch (e) { }
  })
})

export default storage
