const state = {
  socialNetwork: {}
}

const mutations = {
  SET_SOCIAL_NETWORK (state, obj) {
    state.socialNetwork = obj
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
