import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  subTitle: '',
  leftSide: null,
  rightSide: null
}

const mutations = {
  SET_SUB_TITLE (state, subTitle) {
    state.subTitle = subTitle
  },
  CLEAR_SUB_TITLE (state) {
    state.subTitle = ''
  },
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
  setTemplateSubTitle: ({commit}, subTitle) => {
    commit('SET_SUB_TITLE', subTitle)
  },
  clearTemplateSubTitle: ({commit}) => {
    commit('CLEAR_SUB_TITLE')
  },
  setTemplateLeftSide: ({commit}, template) => {
    commit('SET_LEFT_SIDE', template)
  },
  clearTemplateLeftSide: ({commit}) => {
    commit('CLEAR_LEFT_SIDE')
  },
  setTemplateRightSide: ({commit}, template) => {
    commit('SET_RIGHT_SIDE', template)
  },
  clearTemplateRightSide: ({commit}) => {
    commit('CLEAR_RIGHT_SIDE')
  }
}

export default {
  state, mutations, actions
}
