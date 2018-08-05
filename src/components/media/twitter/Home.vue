<template>
  <div id="twitter" class="media">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Twitter from '../../../media/Twitter'

export default {
  data () {
    return {
      Twitter
    }
  },
  activated () {
    this.$store.commit('SET_SOCIAL_NETWORK', Twitter)
  },
  deactivated () {
    this.$store.commit('CLEAR_SOCIAL_NETWORK')
  }
}
</script>
