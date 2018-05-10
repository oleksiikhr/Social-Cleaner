<template>
  <div id="dashboard">
    <!--TODO Temporary-->
    <select v-model="locale">
      <option>en</option>
      <option>ru</option>
    </select>

    <div class="header">
      <at-input v-model="search" placeholder="Find name" icon="search" />
    </div>
    <div class="result">
      <card v-for="(item, index) in filteredNetworks" :key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import { networks } from '../config'
import Card from './Card'

export default {
  components: {
    Card
  },
  data () {
    return {
      networks,
      search: '',
      locale: 'en'
    }
  },
  activated () {
    this.$store.commit('CLEAR_SOCIAL_NETWORK')
  },
  deactivated () {
    this.search = ''
  },
  computed: {
    filteredNetworks () {
      let search = this.search

      if (!search) {
        return networks
      }

      search = search.toLocaleLowerCase().trim()

      return networks.filter(n => {
        if (n.name.toLowerCase().indexOf(search) !== -1) {
          return n
        }
      })
    }
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  max-width: 500px;
  margin: 0 auto 30px;
}
</style>
