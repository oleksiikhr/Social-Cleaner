/**
 * Vue I18n is internationalization plugin.
 * @see https://kazupon.github.io/vue-i18n/
 */
/* eslint-disable */
'use strict'

import VueI18n from 'vue-i18n'
import languages from './lang'
import Vue from 'vue'

// Import locale from social networks
// const networks = require.context('../networks', true, /^\.\/[a-z]+\/locale\/[a-z-]+\/[a-z]+\.js/i)
// networks.keys().forEach(network => {
//   const [, name, lang, section] = network.match(/^\.\/([a-z]+)\/locale\/([a-z-]+)\/([a-z]+)\.js/i)
//
//   if (typeof languages[lang][name.toLowerCase()] === 'undefined') {
//     languages[lang][name.toLowerCase()] = {}
//   }
//
//   languages[lang][name.toLowerCase()][section] = networks(network).default
// })

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en-US',
  messages: languages
})
