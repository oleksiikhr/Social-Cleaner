import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: null
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  CLEAR_TOKEN (state) {
    state.key = null
  }
}

const actions = {
  setToken: ({commit}, token) => {
    commit('SET_TOKEN', token)
  },
  clearToken: ({commit}) => {
    commit('CLEAR_TOKEN')
  }
}

export default {
  state, mutations, actions
}
