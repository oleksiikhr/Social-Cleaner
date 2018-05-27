const state = {
  socialNetwork: {}
}

const mutations = {
  SET_SOCIAL_NETWORK (state, cls) {
    const prototype = cls.prototype
    state.socialNetwork = {
      icon: prototype.icon
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
