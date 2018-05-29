<template>
  <div id="vk">
    <at-menu v-if="user.id" mode="horizontal" :activeName="routeName">
      <at-menu-item v-for="item in VK.prototype.sections" :key="item.to" :to="{ name: item.to }"
                    :disabled="isDisabledMenuItem(item.val)">
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
  data () {
    return {
      VK
    }
  },
  activated () {
    this.$store.commit('SET_SOCIAL_NETWORK', VK)
    if (this.$route.name === 'vk') {
      this.$router.push({ name: 'vk-token' })
    }
  },
  computed: {
    user () {
      return this.$store.state.vk.user
    },
    access () {
      return this.$store.state.vk.access
    },
    routeName () {
      return this.$route.name
    }
  },
  methods: {
    isDisabledMenuItem (val) {
      return typeof val !== 'undefined' && !this.access[val]
    }
  }
}
</script>

<style lang="scss" scoped>
.at-menu {
  margin-bottom: 20px;
}
</style>
