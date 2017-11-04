import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: null,
  access: {
    friends: false,
    photos: false,
    video: false,
    status: false,
    messages: false,
    wall: false,
    docs: false,
    groups: false
  }
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_PERMISSIONS (state, number) {
    /** @see https://vk.com/dev/permissions Bitmask */
    state.access.friends = !!(number & 2)
    state.access.photos = !!(number & 4)
    state.access.video = !!(number & 16)
    state.access.status = !!(number & 1024)
    state.access.messages = !!(number & 4096)
    state.access.wall = !!(number & 8192)
    state.access.docs = !!(number & 1311072)
    state.access.groups = !!(number & 262144)
  },
  CLEAR_TOKEN (state) {
    state.token = null
  }
}

const actions = {
  setToken: ({commit}, token) => {
    commit('SET_TOKEN', token)
  },
  setPermissions: ({commit}, number) => {
    commit('SET_PERMISSIONS', number)
  },
  clearToken: ({commit}) => {
    commit('CLEAR_TOKEN')
  }
}

export default {
  state, mutations, actions
}
