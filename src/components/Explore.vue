<template>
  <div id="dashboard">
    <div class="search-block">
      <at-input v-model="search" :placeholder="searchName" icon="search" :title="searchName" />
    </div>
    <div class="content">
      <card v-for="(item, index) in filteredMedia" :key="index" :item="item" />
      <!--TODO Here add 2 or more blocks (pages): How to use, FAQ, Contributors *-->
    </div>
  </div>
</template>

<script>
import { networks } from '../config'
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
  deactivated () {
    this.search = ''
  },
  created () {
    // Get a list of social networks and filter out disabled
    this.networks = networks.filter(item => {
      return !item.off
    })
  },
  computed: {
    filteredMedia () {
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
    },
    searchName () {
      return this.$t('app.explore.search')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-block {
  max-width: 700px;
  margin: 0 auto 30px;
}
</style>
