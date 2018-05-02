<template>
  <div id="vk">
    <at-menu v-if="user" mode="horizontal" :activeName="routeName">
      <at-menu-item v-for="item in menuItems" :key="item.to" :to="{ name: item.to }">
        <i :class="`fa fa-${item.icon}`" aria-hidden="true"></i> {{ item.name }}
      </at-menu-item>
    </at-menu>

    <router-view />
  </div>
</template>

<script>
import { ICON_TOKEN, ICON_WALL } from '../../heplers/logs'
import { vk } from '../../config'

export default {
  data () {
    return {
      menuItems: [
        { name: 'Token', to: 'vk-token', icon: ICON_TOKEN },
        { name: 'Wall', to: 'vk-wall', icon: ICON_WALL }
      ]
    }
  },
  beforeCreate () {
    this.$store.commit('SET_SOCIAL_NETWORK', vk)

    this.$router.push({ name: 'vk-token' })
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
