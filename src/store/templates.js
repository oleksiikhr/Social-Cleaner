import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  leftSide: null,
  rightSide: null
}

const mutations = {
  SET_LEFT_SIDE (state, template) {
    state.leftSide = template
  },
  CLEAR_LEFT_SIDE (state) {
    state.leftSide = null
  },
  SET_RIGHT_SIDE (state, template) {
    state.rightSide = template
  },
  CLEAR_RIGHT_SIDE (state) {
    state.rightSide = null
  }
}

const actions = {
  setTemplateLeftSide: ({commit}, template) => {
    commit('SET_LEFT_SIDE', template)
  },
  setTemplateRightSide: ({commit}, template) => {
    commit('SET_RIGHT_SIDE', template)
  },
  clearTemplateLeftSide: ({commit}) => {
    commit('CLEAR_LEFT_SIDE')
  },
  clearTemplateRightSide: ({commit}) => {
    commit('CLEAR_RIGHT_SIDE')
  }
}

export default {
  state, mutations, actions
}
