/**
 * Large-scale state management.
 * @see https://vuex.vuejs.org/
 */
/* eslint-disable */
'use strict'

import modules from './modules'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
