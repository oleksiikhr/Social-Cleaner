<template>
  <header>
    <router-link :to="{ name: 'explore' }" class="brand">
      <span class="brand__name brand__full">Social Cleaner</span>
      <span class="brand__name brand__short">SC</span>
      <span class="brand__version">{{ version }}</span>
    </router-link>
    <i v-if="socialNetwork.icon" :class="'current fa ' + socialNetwork.icon" aria-hidden="true"></i>
    <router-link to="/logs" class="logs">
      <div class="logs__full">
        <template v-if="firstLog">
          <span :class="firstLog.color">{{ firstLog.method }}</span>
        </template>
        <span v-else>{{ $t('app.query_history') }}</span>
      </div>
      <div class="logs__short">
        <i class="fa fa-folder-open-o" aria-hidden="true"></i>
      </div>
    </router-link>
  </header>
</template>

<script>
import { version } from '../../config'

export default {
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
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  overflow: hidden;
  > a {
    width: 280px;
    color: #333;
    transition: .2s;
    opacity: .7;
    text-align: center;
    &:hover {
      opacity: 1;
    }
    &.brand {
      font-weight: bold;
      font-size: 1.2rem;
      text-transform: uppercase;
      .brand__version {
        font-size: 0.7rem;
        vertical-align: top;
        opacity: 0.5;
      }
      .brand__short {
        display: none;
      }
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
    > .logs__short {
      display: none;
      font-size: 1.2rem;
    }
    span {
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

@media screen and (max-width: 550px) {
  header {
    margin: 0 10px 10px;
    > a {
      width: 70px;
      &.brand {
        > .brand__full {
          display: none;
        }
        > .brand__short {
          display: inline-block;
        }
      }
      &.logs {
        > .logs__full {
          display: none;
        }
        > .logs__short {
          display: inline-block;
        }
      }
    }
  }
}
</style>
