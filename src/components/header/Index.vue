<template>
  <header>
    <div class="header__inner">
      <router-link :to="{ name: 'explore' }" class="brand">
        <span class="brand__name brand__full">Social Cleaner</span>
        <span class="brand__name brand__short">SC</span>
        <span class="brand__version">{{ version }}</span>
      </router-link>
      <i v-if="network.icon" :class="`current fa ${network.icon}`" aria-hidden="true"></i>
      <router-link to="/logs" class="logs">
        <div class="logs__full">
          <template v-if="firstLog">
            <span :class="`color--${firstLog.color}`">{{ firstLog.name }}</span>
          </template>
          <span v-else>{{ $t('app.header.query_history') }}</span>
        </div>
        <div class="logs__short">
          <i class="fa fa-folder-open-o" aria-hidden="true"></i>
        </div>
      </router-link>
    </div>
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
    network () {
      return this.$store.state.template.network
    },
    firstLog () {
      return this.$store.state.logs.storage[0]
    }
  }
}
</script>
