import Vue from 'vue'
import Vuex from 'vuex'

import vk from './vk'
import log from './log'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vk, log
  }
})
