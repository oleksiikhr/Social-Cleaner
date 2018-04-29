const state = {
  storage: []
}

const mutations = {
  ADD_LOG (state, obj) {
    // TODO Delete > 200 elements
    state.storage.unshift(obj)
  }
}

const actions = {

}

export default {
  state, mutations, actions
}
