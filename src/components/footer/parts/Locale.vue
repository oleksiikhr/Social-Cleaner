<template>
  <div>
    <a class="language" @click.prevent="modal = true">
      <div class="language__icon">
        <i class="fa fa-language" aria-hidden="true"></i>
      </div>
      <div class="language__inner">
        <div class="language__name">Translation</div>
        <div class="language__current">{{ language }}</div>
      </div>
    </a>

    <at-modal v-model="modal" title="Choose language" :showFooter="false">
      <a class="lang-item" v-for="lang in languages" :key="lang.value" @click="setLocale(lang)">
        {{ lang.name }}
      </a>
    </at-modal>
  </div>
</template>

<script>
import { languages } from '../../../config'

export default {
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
      this.modal = false
      this.language = `${lang.name}, ${lang.value}`
      this.$i18n.locale = lang.value
      localStorage.setItem('lang', JSON.stringify(lang))
      document.getElementsByTagName('html')[0].setAttribute('lang', lang.value.split('-')[0])
    }
  }
}
</script>

<style lang="scss" scoped>
.language {
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
}
</style>
