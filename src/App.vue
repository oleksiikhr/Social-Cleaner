<template>
  <div id="app">
    <header>
      <router-link to="/" class="brand">
        Social Cleaner
        <span>{{ version }}</span>
      </router-link>
      <i v-if="socialNetwork.icon" :class="'current fa ' + socialNetwork.icon" aria-hidden="true"></i>
      <router-link to="/logs" class="logs">
        <template v-if="firstLog">
          <span :class="firstLog.color">{{ firstLog.method }}</span>
        </template>
        <span v-else>{{ $t('app.no_logs') }}</span>
      </router-link>
    </header>
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <footer>
      <div class="copyright">
        <span>Made with 💖 by: </span>
        <a href="https://github.com/alexeykhr" target="_blank" rel="noreferrer" title="Alexey Khrushch">
          @alexeykhr
        </a>
      </div>
      <a class="lang" @click.prevent="localeModal = true">
        <i class="fa fa-language" aria-hidden="true"></i> Translate
      </a>
      <!--TODO Change-->
      <iframe src="https://ghbtns.com/github-btn.html?user=Alexeykhr&repo=Social-Cleaner&type=star&count=true"
              frameborder="0" scrolling="0" width="110px" height="20px"></iframe>
    </footer>

    <at-modal v-model="localeModal" title="Choose language" :showFooter="false">
      <a class="lang-item" v-for="lang in languages" :key="lang.value" @click="setLocale(lang.value)">
        {{ lang.name }}
      </a>
    </at-modal>
  </div>
</template>

<script>
import { vk, version, languages } from './config'

export default {
  data () {
    return {
      vk,
      version,
      languages,
      localeModal: false
    }
  },
  created () {
    const lang = localStorage.getItem('lang')

    if (lang) {
      this.setLocale(lang)
    } else {
      this.localeModal = true
    }
  },
  computed: {
    socialNetwork () {
      return this.$store.state.template.socialNetwork
    },
    firstLog () {
      return this.$store.state.logs.storage[0]
    }
  },
  methods: {
    setLocale (val) {
      this.localeModal = false
      localStorage.setItem('lang', val)
      this.$i18n.locale = val
    }
  }
}
</script>

<style lang="scss">
body, #app {
  min-height: 100%;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  overflow: hidden;
  .brand, .logs {
    width: 280px;
    color: #333;
    transition: .2s;
    opacity: .7;
    text-align: center;
    &:hover {
      opacity: 1;
    }
  }
  .brand {
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
    > span {
      font-size: 0.7rem;
      vertical-align: top;
      opacity: 0.5;
    }
  }
  .current {
    font-size: 1.5rem;
    line-height: 0;
    color: #444;
  }
  .logs {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: .8rem;
    > span {
      display: block;
      padding: 2px 10px;
      font-weight: bold;
      &.success {
        color: #0dad54;
      }
      &.error {
        color: #ff5b5b;
      }
      &.warning {
        color: #efb30d;
      }
      &.info {
        color: #6c94e1;
      }
    }
  }
}

footer {
  display: flex;
  align-items: center;
  border-top: 1px solid #e7e7e7;
  height: 30px;
  justify-content: space-between;
  color: #a0a0a0;
  a {
    color: #868686;
    font-weight: bold;
    text-indent: 5px;
    transition: .2s;
    &:hover {
      color: #333;
    }
  }
  .copyright, iframe {
    width: 180px;
  }
  .lang {
    text-indent: 0;
    font-size: .8rem;
  }
  .copyright {
    text-indent: 15px;
    font-size: smaller;
  }
}

hr {
  margin: 30px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
}

#app {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  flex-grow: 1;
  padding: 30px 20px;
  #vk {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
}

.lang-item {
  display: inline-block;
  padding: 2px 10px;
  font-size: 1rem;
  margin: 5px;
}
</style>
