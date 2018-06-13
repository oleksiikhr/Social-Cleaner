<template>
  <div id="dashboard">
    <div class="header">
      <h1>Social Media</h1>
      <at-input v-model="search" placeholder="Search" icon="search" title="Search" />
    </div>
    <div class="result">
      <card v-for="(item, index) in filteredNetworks" :key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import networks from '../media'
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 800px;
  margin: 0 auto 30px;
  background: #fbfbfb;
  padding: 20px;
  border: 1px solid #e7e7e7;
  > h1 {
    text-align: center;
    color: rgba(0, 0, 0, .6);
    font-size: 1.2rem;
  }
  > .at-input {
    flex-grow: 1;
    margin: 0 40px;
  }
}

@media screen and (max-width: 600px) {
  .header {
    flex-direction: column;
    > h1 {
      margin-bottom: 15px;
    }
    > .at-input {
      width: 100%;
      max-width: 400px;
    }
  }
}
</style>
