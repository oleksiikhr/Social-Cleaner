<template>
  <div id="logs">
    {{ logs }}
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('CLEAR_SOCIAL_NETWORK')
  },
  computed: {
    logs () {
      return this.$store.state.logs.storage
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
