<template>
  <router-view />
</template>

<script>
import { vk } from '../../config'

export default {
  beforeCreate () {
    this.$store.commit('SET_SOCIAL_NETWORK', vk)
    this.$router.push({ name: 'vk-token' })
  }
}
</script>
