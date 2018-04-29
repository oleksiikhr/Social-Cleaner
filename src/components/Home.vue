<template>
  <div id="dashboard">
    <div class="header">
      <at-input v-model="search" placeholder="Find social network" icon="search" />
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
      search: ''
    }
  },
  mounted () {
    this.$store.commit('CLEAR_SOCIAL_NETWORK')
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
  }
}
</script>

<style lang="scss" scoped>
.header {
  max-width: 500px;
  margin: 0 auto 30px;
}
</style>
