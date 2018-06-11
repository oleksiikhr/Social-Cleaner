<template>
  <div id="dashboard">
    <div class="header">
      <h1>Choose a Social Network</h1>
      <at-input v-model="search" placeholder="Search" icon="search" />
    </div>
    <div class="result">
      <card v-for="(item, index) in filteredNetworks" :key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import networks from '../networks'
import Card from './parts/Card'

export default {
  components: {
    Card
  },
  data () {
    return {
      networks: [],
      search: ''
    }
  },
  created () {
    this.networks = networks.filter(network => {
      return !network.off
    })
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
        return this.networks
      }

      search = search.toLocaleLowerCase().trim()

      return this.networks.filter(n => {
        if (n.name.toLowerCase().indexOf(search) !== -1 || n.domain.indexOf(search) !== -1) {
          return n
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  max-width: 400px;
  margin: 0 auto 30px;
  > h1 {
    text-align: center;
    margin-bottom: 25px;
    text-transform: uppercase;
  }
}
</style>
