import VueI18n from 'vue-i18n'
import languages from './lang'
import Vue from 'vue'

const networks = require.context('../networks', true, /^\.\/([a-z]+)\/locale\/index.scss/i)
networks.keys().forEach(network => {
  // TODO structure for social networks
  console.log('locale', network)
})

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en-US',
  messages: languages
})
