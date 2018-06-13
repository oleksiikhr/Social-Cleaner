const state = {
  list: {
    vk: { process: false, stop: false }
  }
}

const mutations = {
  SET_PROCESS (state, media) {
    state.list[media].process = true
  },
  CLEAR_PROCESS (state, media) {
    state.list[media].process = false
  },
  SET_STOP (state, media) {
    state.list[media].stop = true
  },
  CLEAR_STOP (state, media) {
    state.list[media].stop = false
  }
}

const actions = {

}

export default {
  state, mutations, actions
}
