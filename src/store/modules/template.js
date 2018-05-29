const state = {
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
  }
}

const actions = {

}

export default {
  state, mutations, actions
}
