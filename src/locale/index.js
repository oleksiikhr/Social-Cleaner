import VueI18n from 'vue-i18n'
import languages from './lang'
import Vue from 'vue'

import networks from '../networks'

console.log('locale', networks)

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en-US',
  messages: languages
})
