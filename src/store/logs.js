import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  storage: []
}

const mutations = {
  ADD_LOG (state, obj) {
    // TOOD: Max length
    state.storage.unshift(obj)
  },
  CLEAR_LOG (state) {
    state.storage = []
  }
}

const actions = {
  addLog: ({commit}, obj) => {
    commit('ADD_LOG', obj)
  },
  clearLog: ({commit}) => {
    commit('CLEAR_LOG')
  }
}

export default {
  state, mutations, actions
}
