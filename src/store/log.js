import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  wall: [],
  docs: []
}

const mutations = {
  ADD_LOG_WALL (state, val) {
    state.wall.append(val)
  },
  CLEAR_LOG_WALL (state) {
    state.wall = []
  },
  ADD_LOG_DOCS (state, val) {
    state.docs.append(val)
  },
  CLEAR_LOG_DOCS (state) {
    state.docs = []
  }
}

const actions = {
  addLogWall: ({commit}, val) => {
    commit('ADD_LOG_WALL', val)
  },
  addLogDocs: ({commit}, val) => {
    commit('ADD_LOG_DOCS', val)
  },
  clearLog: ({commit}) => {
    commit('CLEAR_LOG_WALL')
    commit('CLEAR_LOG_DOCS')
  }
}

export default {
  state, mutations, actions
}
