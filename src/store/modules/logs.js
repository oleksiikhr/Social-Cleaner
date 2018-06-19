const state = {
  storage: []
}

const mutations = {
  ADD_LOG (state, obj) {
    state.storage.unshift(obj)
  }
}

const actions = {

}

export default {
  state, mutations, actions
}
