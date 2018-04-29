<template>
  <div class="home">
    <div class="info">
      sd
    </div>
    <router-view />
  </div>
</template>

<script>
import { vk } from '../../config'

export default {
  mounted () {
    this.$store.commit('SET_SOCIAL_NETWORK', vk)
  }
}
</script>

<style lang="scss" scoped>

</style>
