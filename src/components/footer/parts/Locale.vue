<template>
  <div :class="color">
    <a class="language" @click.prevent="modal = true">
      <div class="language__icon">
        <i class="fa fa-language" aria-hidden="true"></i>
      </div>
      <div class="language__inner">
        <div class="language__name">Translation</div>
        <div class="language__current">{{ language }}</div>
      </div>
    </a>

    <at-modal v-model="modal" title="Choose language" class="locale-modal" :showFooter="false">
      <a class="lang-item" v-for="lang in languages" :key="lang.value" @click="setLocale(lang)">
        {{ lang.name }}
      </a>
    </at-modal>
  </div>
</template>

<script>
import { languages } from '../../../config'
import media from '../../../media'
import moment from 'moment'

export default {
  props: {
    color: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      languages,
      modal: false,
      language: 'en-US'
    }
  },
  created () {
    const lang = localStorage.getItem('lang')

    if (lang) {
      try {
        const data = JSON.parse(lang)
        this.setLocale(data)
        return
      } catch (e) { }
    }

    this.modal = true
  },
  methods: {
    setLocale (lang) {
      const valueShort = lang.value.split('-')[0]
      this.modal = false

      // Display on site + set global translation in $i18n
      this.language = `${lang.name}, ${lang.value}`
      this.$i18n.locale = lang.value

      // Save choose to localStorage
      localStorage.setItem('lang', JSON.stringify(lang))

      // Set html lang
      document.getElementsByTagName('html')[0].setAttribute('lang', valueShort)

      // Update language in API
      media.forEach(item => {
        if (item.changeLang) {
          item.changeLang(lang.name, lang.value, valueShort)
        }
      })

      // Change language in plugins
      moment.locale(valueShort)
    }
  }
}
</script>

<style lang="scss" scoped>
.language {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #868686;
  font-weight: bold;
  transition: .2s;
  &:hover {
    color: #333;
  }
}

.language__icon {
  font-size: 1.2rem;
}

.language__inner {
  margin-left: 7px;
  .language__name {
    font-size: .8rem;
    color: #555;
  }
  .language__current {
    font-size: .7rem;
    color: #868686;
  }
}

.lang-item {
  display: inline-block;
  padding: 2px 10px;
  font-size: 1rem;
  margin: 5px;
  color: #666;
  font-weight: bold;
  &:hover {
    color: #333;
  }
}

.white {
  .language {
    color: rgba(255, 255, 255, .8);
    &:hover {
      color: #fff;
    }
  }
  .language__name {
    color: rgba(255, 255, 255, .8);
  }
  .language__current {
    color: rgba(255, 255, 255, .7);
  }
}
</style>
