import enUS from 'at-ui/dist/locale/en-US'
import de from 'at-ui/dist/locale/de'
import faIR from 'at-ui/dist/locale/fa-IR'
import koKR from 'at-ui/dist/locale/ko-KR'
import ptBR from 'at-ui/dist/locale/pt-BR'
import zhCN from 'at-ui/dist/locale/zh-CN'

const files = require.context('.', true, /\.js$/)

const languages = {
  'en-US': enUS,
  'de': de,
  'fa-IR': faIR,
  'ko-kr': koKR,
  'pt-BR': ptBR,
  'zh-CN': zhCN
}

files.keys().forEach(key => {
  if (key === './index.js') return

  const split = key.substring(2).replace(/.js/g, '').split('/')
  const len = split.length - 1
  let current = languages

  for (let i = 0; i < len; i++) {
    if (typeof current[split[i]] === 'undefined') {
      current[split[i]] = {}
    }
    current = current[split[i]]
  }
  current[split[len]] = files(key).default
})

export default languages
