<template>
  <div>
    <a class="lang" @click.prevent="modal = true">
      <i class="fa fa-language" aria-hidden="true"></i> <span>Translate</span>
    </a>

    <at-modal v-model="modal" title="Choose language" :showFooter="false">
      <a class="lang-item" v-for="lang in languages" :key="lang.value" @click="setLocale(lang.value)">
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
      modal: false
    }
  },
  created () {
    const lang = localStorage.getItem('lang')

    if (lang) {
      this.setLocale(lang)
    } else {
      this.modal = true
    }
  },
  methods: {
    setLocale (val) {
      this.modal = false
      this.$i18n.locale = val
      localStorage.setItem('lang', val)
      document.getElementsByTagName('html')[0].setAttribute('lang', val.split('-')[0])
    }
  }
}
</script>

<style lang="scss" scoped>
.lang {
  text-indent: 0;
  font-size: .85rem;
  > span {
    color: #555;
  }
}

.lang-item {
  display: inline-block;
  padding: 2px 10px;
  font-size: 1rem;
  margin: 5px;
}
</style>
