const state = {
  appClass: '',
  socialNetwork: {}
}

const mutations = {
  SET_SOCIAL_NETWORK (state, cls) {
    state.socialNetwork = {
      name: cls.prototype.name,
      icon: cls.prototype.icon
    }
  },
  CLEAR_SOCIAL_NETWORK (state) {
    state.socialNetwork = {}
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
