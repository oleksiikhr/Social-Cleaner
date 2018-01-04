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
  }
}

const mutations = {
  VK_SET_TOKEN (state, token) {
    state.token = token
  },
  VK_CLEAR_TOKEN (state) {
    state.token = null
  },
  VK_SET_PERMISSIONS (state, number) {
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
  VK_CLEAR_PERMISSIONS (state) {
    state.access.friends = false
    state.access.photos = false
    state.access.video = false
    state.access.status = false
    state.access.messages = false
    state.access.wall = false
    state.access.docs = false
    state.access.groups = false
  },
  VK_SET_USER (state, obj) {
    state.user = obj
  },
  VK_CLEAR_USER (state) {
    state.user = {}
  },
  VK_COUNTER_USER_DECREMENT (state, key) {
    let val = state.user.counters[key]
    Vue.set(state.user.counters, key, val && val > 0 ? --val : 0)
  },
  VK_SET_USER_COUNTER (state, obj) {
    /** @see https://vuejs.org/v2/guide/list.html#Caveats */
    Vue.set(state.user.counters, obj.key, obj.val)
  }
}

const actions = {
  vkSetToken: ({commit}, token) => {
    commit('VK_SET_TOKEN', token)
  },
  vkSetPermissions: ({commit}, number) => {
    commit('VK_SET_PERMISSIONS', number)
  },
  vkSetUser: ({commit}, obj) => {
    commit('VK_SET_USER', obj)
  },
  vkCounterUserDecrement: ({commit}, key) => {
    commit('VK_COUNTER_USER_DECREMENT', key)
  },
  vkSetUserCounter: ({commit}, obj) => {
    commit('VK_SET_USER_COUNTER', obj)
  },
  vkExit: ({commit}) => {
    commit('VK_CLEAR_TOKEN')
    commit('VK_CLEAR_USER')
    commit('VK_CLEAR_PERMISSIONS')
  }
}

export default {
  state, mutations, actions
}
