<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  deactivated () {
    this.$store.commit('CLEAR_SOCIAL_NETWORK')
  }
}
</script>
