import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: null,
  user: {},
  access: {
    friends: false,
    photos: false,
    video: false,
    status: false,
    messages: false,
    wall: false,
    docs: false,
    groups: false
  },
  log: []
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  CLEAR_TOKEN (state) {
    state.token = null
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
  CLEAR_PERMISSIONS (state) {
    state.access.friends = false
    state.access.photos = false
    state.access.video = false
    state.access.status = false
    state.access.messages = false
    state.access.wall = false
    state.access.docs = false
    state.access.groups = false
  },
  SET_USER (state, obj) {
    state.user = obj
  },
  CLEAR_USER (state) {
    state.user = {}
  },
  ADD_LOG (state, obj) {
    state.log.unshift(obj)
  },
  CLEAR_LOG (state) {
    state.log = []
  },
  COUNTER_USER_DECREMENT (state, key) {
    let val = state.user.counters[key]
    Vue.set(state.user.counters, key, val && val > 0 ? --val : 0)
  },
  SET_USER_COUNTER (state, obj) {
    /** @see https://vuejs.org/v2/guide/list.html#Caveats */
    Vue.set(state.user.counters, obj.key, obj.val)
  }
}

const actions = {
  setToken: ({commit}, token) => {
    commit('SET_TOKEN', token)
  },
  setPermissions: ({commit}, number) => {
    commit('SET_PERMISSIONS', number)
  },
  setUser: ({commit}, obj) => {
    commit('SET_USER', obj)
  },
  counterUserDecrement: ({commit}, key) => {
    commit('COUNTER_USER_DECREMENT', key)
  },
  setUserCounter: ({commit}, obj) => {
    commit('SET_USER_COUNTER', obj)
  },
  addLog: ({commit}, obj) => {
    commit('ADD_LOG', obj)
  },
  exit: ({commit}) => {
    commit('CLEAR_TOKEN')
    commit('CLEAR_USER')
    commit('CLEAR_PERMISSIONS')
    commit('CLEAR_LOG')
  }
}

export default {
  state, mutations, actions
}
