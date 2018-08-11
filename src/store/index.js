import modules from './modules'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// Import social networks
const networks = require.context('../networks', true, /^\.\/[a-z]+\/store\/index.js$/i)
networks.keys().forEach(network => {
  const store = networks(network).default
  const name = network.match(/\.\/([a-z]+)\//i)[1].toLowerCase()

  // Set default values
  const state = {}
  state[name] = store.state
  state[name].token = ''
  state[name].user = {}
  state[name].isAuth = false
  state[name].process = false
  state[name].cancel = false

  Object.assign(modules.networks.actions, store.actions)
  Object.assign(modules.networks.mutations, store.mutations)
  Object.assign(modules.networks.state, state)
})

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
