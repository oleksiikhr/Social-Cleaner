import router from '../../router/index'
import VK from '../../media/VK'
import Vue from 'vue'

const state = {
  vk: {
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
    },
    info: {
      name: VK.prototype.name,
      icon: VK.prototype.icon,
      to: VK.prototype.to
    },
    process: false,
    cancel: false
  }
}

const mutations = {
  /* | -----------------------------------------------------------------------------
   * | General
   * | -----------------------------------------------------------------------------
   * |
   */
  START_PROCESS (state, media) {
    state[media].process = true
  },
  STOP_PROCESS (state, media) {
    state[media].process = false
  },
  SET_CANCEL (state, media) {
    state[media].cancel = true
  },
  CLEAR_CANCEL (state, media) {
    state[media].cancel = false
  },

  /* | -----------------------------------------------------------------------------
   * | VK
   * | -----------------------------------------------------------------------------
   * |
   */
  VK_SET_TOKEN (state, str) {
    state.vk.token = str
  },
  VK_CLEAR_TOKEN (state) {
    state.vk.token = ''
  },
  VK_SET_USER (state, obj) {
    state.vk.user = obj
  },
  VK_CLEAR_USER (state) {
    state.vk.user = {}
  },
  VK_SET_PERMISSIONS (state, num) {
    /** @see https://vk.com/dev/permissions Bitmask */
    state.vk.access.friends = !!(num & 2)
    state.vk.access.photos = !!(num & 4)
    state.vk.access.video = !!(num & 16)
    state.vk.access.status = !!(num & 1024)
    state.vk.access.messages = !!(num & 4096)
    state.vk.access.wall = !!(num & 8192)
    state.vk.access.docs = !!(num & 1311072)
    state.vk.access.groups = !!(num & 262144)
  },
  VK_CLEAR_PERMISSIONS (state) {
    Object.keys(state.vk.access).forEach(key => {
      state.vk.access[key] = false
    })
  },
  VK_SET_PROCESS (state, bool = true) {
    state.vk.process = bool
  }
}

const actions = {
  /* | -----------------------------------------------------------------------------
   * | VK
   * | -----------------------------------------------------------------------------
   * |
   */
  async vkLogIn ({commit}, token) {
    commit('START_PROCESS', 'vk')
    let res = await VK.fetchAccountGetAppPermissions(token)

    if (res.ok && res.body.response) {
      commit('VK_SET_PERMISSIONS', res.body.response)
      commit('VK_SET_TOKEN', token)
      Vue.prototype.$Message.success('VK - Log In')

      res = await VK.fetchUsersGet(null, 'has_photo,photo_100,counters', 500)

      if (res.ok && res.body.response) {
        commit('VK_SET_USER', res.body.response[0])
      }

      window.scrollTo(0, 0)
    } else {
      Vue.prototype.$Message.error('VK - Log In')
    }

    commit('STOP_PROCESS', 'vk')
  },
  vkLogOut ({commit}) {
    commit('VK_CLEAR_TOKEN')
    commit('VK_CLEAR_USER')
    commit('VK_CLEAR_PERMISSIONS')
    Vue.prototype.$Message.info('VK - Log Out')
    router.push({ name: 'vk' })
  }
}

export default {
  state, mutations, actions
}
