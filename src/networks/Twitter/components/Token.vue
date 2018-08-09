<template>
  <div id="token">
    Token
  </div>
</template>

<script>
import Twitter from '../Twitter'

export default {
  data () {
    return {
      Twitter
    }
  },
  computed: {
    user () {
      return this.$store.state.networks.twitter.user
    },
    isAuth () {
      return this.$store.state.networks.twitter.isAuth
    },
    process () {
      return this.$store.state.networks.twitter.process
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
