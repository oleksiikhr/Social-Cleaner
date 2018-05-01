import { addLog, COLOR_ERROR, COLOR_INFO, COLOR_SUCCESS, ICON_TOKEN } from '../../heplers/logs'
import { jsonp } from '../../heplers/vk'
import store from '../../store/index'
import { vk } from '../../config'
import Vue from 'vue'

const state = {
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
  VK_SET_USER (state, obj) {
    state.user = obj
  },
  VK_SET_PERMISSIONS (state, num) {
    state.access.friends = !!(num & 2)
    state.access.photos = !!(num & 4)
    state.access.video = !!(num & 16)
    state.access.status = !!(num & 1024)
    state.access.messages = !!(num & 4096)
    state.access.wall = !!(num & 8192)
    state.access.docs = !!(num & 1311072)
    state.access.groups = !!(num & 262144)
  }
}

const actions = {
  vkInit ({commit}, token) {
    addLog(vk, 'account.getAppPermissions', ICON_TOKEN, COLOR_INFO)

    jsonp('account.getAppPermissions', {
      access_token: token
    })
      .then(res => {
        if (res.body.response) {
          store.commit('VK_SET_PERMISSIONS', res.body.response)
          store.commit('VK_SET_TOKEN', token)
          addLog(vk, 'Token installed', ICON_TOKEN, COLOR_SUCCESS)
          Vue.prototype.$Message.success('Token installed')

          addLog(vk, 'users.get', ICON_TOKEN, COLOR_INFO)
          jsonp('users.get', {
            fields: 'has_photo,photo_100,counters'
          })
            .then(res => {
              if (res.body.response) {
                store.commit('VK_SET_USER', res.body.response[0])
                addLog(vk, 'User installed', ICON_TOKEN, COLOR_SUCCESS)
                Vue.prototype.$Message.success('User installed')
              } else {
                addLog(vk, 'User not installed', ICON_TOKEN, COLOR_ERROR)
              }
            })
            .catch(() => {
              addLog(vk, 'Server error', ICON_TOKEN, COLOR_ERROR)
            })
        } else {
          const msg = res.body.error ? res.body.error.error_msg : 'Token is not installed'
          addLog(vk, msg, ICON_TOKEN, COLOR_ERROR)
          Vue.prototype.$Message.error(msg)
        }
      })
      .catch(() => {
        addLog(vk, 'Server error', ICON_TOKEN, COLOR_ERROR)
      })
  }
}

export default {
  state, mutations, actions
}
