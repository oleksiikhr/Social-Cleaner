const state = {
  //
}

const mutations = {
  START_PROCESS (state, network) {
    state[network].process = true
  },
  STOP_PROCESS (state, network) {
    state[network].process = false
  },
  SET_CANCEL (state, network) {
    state[network].cancel = true
  },
  CLEAR_CANCEL (state, network) {
    state[network].cancel = false
  }
}

const actions = {
  //
}

export default {
  state, mutations, actions
}
