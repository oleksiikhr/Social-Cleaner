<template>
  <div id="logs">
    <!--TODO Search method. Select name, color, icon. Open - dialog with response-->
    <div :class="'log ' + log.color" v-for="(log, index) in logs" :key="index">
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
.logs {
  display: flex;
}

.log {
  display: flex;
  margin-bottom: 30px;
}
</style>
