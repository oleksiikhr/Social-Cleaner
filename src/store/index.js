import Vue from 'vue'
import Vuex from 'vuex'

import vk from './vk'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vk
  }
})
