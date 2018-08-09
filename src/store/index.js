import networks from '../networks'
import modules from './modules'
import Vuex from 'vuex'
import Vue from 'vue'

console.log('STORE', networks)

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
