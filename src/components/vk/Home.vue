<template>
  <div id="vk">
    <at-menu v-if="user" mode="horizontal" :activeName="routeName">
      <at-menu-item v-for="item in VK.prototype.sections" :key="item.to" :to="{ name: item.to }">
        <i :class="`fa fa-${item.icon}`" aria-hidden="true"></i> {{ $t(item.name) }}
      </at-menu-item>
    </at-menu>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import VK from '../../networks/VK'

export default {
  activated () {
    this.$store.commit('SET_SOCIAL_NETWORK', VK)
    if (this.$route.name === 'vk') {
      this.$router.push({ name: 'vk-token' })
    }
  },
  computed: {
    user () {
      return this.$store.state.vk.user.id
    },
    routeName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.at-menu {
  margin-bottom: 20px;
}
</style>
