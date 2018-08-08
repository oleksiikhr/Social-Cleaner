const state = {
  appClass: '',
  network: {}
}

const mutations = {
  SET_SOCIAL_NETWORK (state, network) {
    state.network = {
      name: network.prototype.name,
      icon: network.prototype.icon
    }
  },
  CLEAR_SOCIAL_NETWORK (state) {
    state.network = {}
  },
  SET_APP_CLASS (state, str) {
    state.appClass = str
  },
  CLEAR_APP_CLASS (state) {
    state.appClass = ''
  }
}

const actions = {

}

export default {
  state, mutations, actions
}
