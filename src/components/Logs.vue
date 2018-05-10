<template>
  <div id="logs">
    <!--TODO Temporary-->
    <div v-for="(log, index) in logs" :key="index" style="margin-bottom: 30px">
      {{ log }}
    </div>
  </div>
</template>

<script>
export default {
  activated () {
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
