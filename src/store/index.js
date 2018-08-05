import modules from './modules'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
