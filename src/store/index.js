import Vue from 'vue'
import Vuex from 'vuex'

import templates from './templates'
import logs from './logs'
import vk from './vk'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    templates, logs, vk
  }
})
