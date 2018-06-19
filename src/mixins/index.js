import Vue from 'vue'

const files = require.context('.', false, /\.js$/)

files.keys().forEach(key => {
  if (key === './index.js') return
  Vue.mixin(files(key).default)
})
