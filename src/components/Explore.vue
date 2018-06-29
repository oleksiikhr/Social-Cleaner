<template>
  <div id="dashboard">
    <div class="header">
      <h1>{{ $t('app.explore.h1') }}</h1>
      <at-input v-model="search" :placeholder="searchName" icon="search" :title="searchName" />
    </div>
    <div class="result">
      <card v-for="(item, index) in filteredMedia" :key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import Card from './parts/Card'
import media from '../media'

export default {
  components: {
    Card
  },
  data () {
    return {
      media: [],
      search: ''
    }
  },
  deactivated () {
    this.search = ''
  },
  created () {
    // Get a list of social media and filter out disabled
    this.media = media.filter(item => {
      return !item.off
    })
  },
  computed: {
    filteredMedia () {
      let search = this.search

      if (!search) {
        return this.media
      }

      search = search.toLocaleLowerCase().trim()

      return this.media.filter(n => {
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
