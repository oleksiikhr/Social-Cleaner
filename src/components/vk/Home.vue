<template>
  <div id="vk" class="media">
    <at-menu v-if="isAuth" mode="horizontal" :active-name="route" class="main-menu" @on-select="eventSelectMenuItem">
      <at-menu-item v-for="item in VK.prototype.sections" :name="item.name" :key="item.path"
                    :disabled="isDisabledMenuItem(item.path)">
        <i :class="`fa fa-${item.icon}`" aria-hidden="true"></i> {{ $t(item.title) }}
      </at-menu-item>
    </at-menu>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import VK from '../../media/VK'

export default {
  data () {
    return {
      VK
    }
  },
  activated () {
    this.$store.commit('SET_SOCIAL_NETWORK', VK)
  },
  deactivated () {
    this.$store.commit('CLEAR_SOCIAL_NETWORK')
  },
  computed: {
    isAuth () {
      return this.$store.state.media.vk.isAuth
    },
    access () {
      return this.$store.state.media.vk.access
    },
    route () {
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
