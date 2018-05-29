import router from '../../router/index'
import store from '../../store/index'
import VK from '../../networks/VK'
import Vue from 'vue'

const state = {
  // TODO Global process
  token: '',
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
  VK_SET_TOKEN (state, str) {
    state.token = str
  },
  VK_CLEAR_TOKEN (state) {
    state.token = ''
  },
  VK_SET_USER (state, obj) {
    state.user = obj
  },
  VK_CLEAR_USER (state) {
    state.user = {}
  },
  VK_SET_PERMISSIONS (state, num) {
    /** @see https://vk.com/dev/permissions Bitmask */
    state.access.friends = !!(num & 2)
    state.access.photos = !!(num & 4)
    state.access.video = !!(num & 16)
    state.access.status = !!(num & 1024)
    state.access.messages = !!(num & 4096)
    state.access.wall = !!(num & 8192)
    state.access.docs = !!(num & 1311072)
    state.access.groups = !!(num & 262144)
  },
  VK_CLEAR_PERMISSIONS (state) {
    Object.keys(state.access).forEach(key => {
      state.access[key] = false
    })
  }
}

const actions = {
  vkInit ({commit}, token) {
    VK.send('account.getAppPermissions', {
      access_token: token
    })
      .then(res => {
        if (res.body.response) {
          store.commit('VK_SET_PERMISSIONS', res.body.response)
          store.commit('VK_SET_TOKEN', token)
          Vue.prototype.$Message.success('Token installed')

          VK.send('users.get', {
            fields: 'has_photo,photo_100,counters'
          })
            .then(res => {
              if (res.body.response) {
                store.commit('VK_SET_USER', res.body.response[0])
              }
            })
        }
      })
  },
  vkExit ({commit}) {
    commit('VK_CLEAR_TOKEN')
    commit('VK_CLEAR_USER')
    commit('VK_CLEAR_PERMISSIONS')
    Vue.prototype.$Message.info('Token deleted')
    router.push({ name: 'vk-token' })
  }
}

export default {
  state, mutations, actions
}
