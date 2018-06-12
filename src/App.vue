<template>
  <div id="app" :class="appClass">
    <header>
      <router-link :to="{ name: 'explore' }" class="brand">
        Social Cleaner
        <span>{{ version }}</span>
      </router-link>
      <i v-if="socialNetwork.icon" :class="'current fa ' + socialNetwork.icon" aria-hidden="true"></i>
      <router-link to="/logs" class="logs">
        <template v-if="firstLog">
          <span :class="firstLog.color">{{ firstLog.method }}</span>
        </template>
        <span v-else>{{ $t('app.query_history') }}</span>
      </router-link>
    </header>
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from './components/footer/Index'
import { version } from './config'

export default {
  components: {
    FooterComponent
  },
  data () {
    return {
      version
    }
  },
  computed: {
    socialNetwork () {
      return this.$store.state.template.socialNetwork
    },
    firstLog () {
      return this.$store.state.logs.storage[0]
    },
    appClass () {
      return this.$store.state.template.appClass
    }
  }
}
</script>

<style lang="scss">
hr {
  margin: 30px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
}

// Component (Block)
.block {
  max-width: 500px;
  margin: 0 auto;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .block__attr {
    margin-bottom: 15px;
    p {
      margin-bottom: 5px;
      font-weight: bold;
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      font-weight: bold;
      .status {
        position: relative;
        margin: 0;
        &:after {
          font-size: .6rem;
          vertical-align: top;
          margin-left: 4px;
        }
        &.status-on:after {
          content: 'ON';
          color: #0dad54;
        }
        &.status-off:after {
          content: 'OFF';
          color: #ff8080;
        }
      }
      .compare {
        font-size: .7rem;
        text-transform: uppercase;
      }
    }
    .flex {
      align-items: center;
      > .at-input {
        margin: 0 10px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .at-checkbox {
      margin: 5px;
    }
    .at-radio {
      margin: 5px;
      > .at-radio__label {
        font-size: 13px;
      }
    }
  }
}

// Home page
#app.landing-page {
  min-height: 100%;
  background: linear-gradient(to left, #525252, #3d72b4);
  max-width: none !important;
  > .content {
    padding: 0;
  }
  > header {
    display: none;
  }
  > footer {
    border: none;
    padding: 10px 0;
  }
  .footer__inner {
    margin: 0 auto;
    max-width: 1600px;
    padding: 0 20px;
    a, span, .github__name, .language__name {
      color: rgba(255, 255, 255, .9);
    }
    .github__start, .github__forks, .language__current {
      color: rgba(255, 255, 255, .7);
    }
    .lang-item {
      color: #868686;
    }
  }
}
</style>

<style lang="scss" scoped>
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
</style>
