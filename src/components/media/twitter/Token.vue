<template>
  <div id="token">
    Token
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
  computed: {
    user () {
      return this.$store.state.media.twitter.user
    },
    isAuth () {
      return this.$store.state.media.twitter.isAuth
    },
    process () {
      return this.$store.state.media.twitter.process
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
