<template>
  <div id="vk" class="network">
    <at-menu v-if="isAuth" mode="horizontal" :active-name="routeName" class="main-menu" @on-select="eventSelectMenuItem">
      <at-menu-item v-for="section in sections" :name="section.name" :key="section.path"
                    :disabled="isDisabledMenuItem(section.path)">
        <i :class="`fa fa-${section.icon}`" aria-hidden="true"></i> {{ $t(section.title) }}
      </at-menu-item>
    </at-menu>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import VK from '../VK'

export default {
  data () {
    return {
      sections: VK.prototype.sections
    }
  },
  activated () {
    this.$store.commit('SET_SOCIAL_NETWORK', VK)
  },
  computed: {
    isAuth () {
      return this.$store.state.networks.vk.isAuth
    },
    access () {
      return this.$store.state.networks.vk.access
    },
    routeName () {
      return this.$route.name
    }
  },
  methods: {
    isDisabledMenuItem (val) {
      return !!val && !this.access[val]
    },
    eventSelectMenuItem (to) {
      this.$router.push({ name: to })
    }
  }
}
</script>

<style lang="scss" scoped>
.at-menu {
  margin-bottom: 20px;
}
</style>
