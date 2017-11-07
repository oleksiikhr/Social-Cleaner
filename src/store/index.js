import Vue from 'vue'
import Vuex from 'vuex'

import vk from './vk'
import templates from './templates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vk, templates
  }
})
