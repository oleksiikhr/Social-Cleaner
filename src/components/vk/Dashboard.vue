<template>
  <div id="vk">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  import LeftSide from './templates/LeftSide.vue'
  import RightSide from './templates/RightSide.vue'

  export default {
    activated () {
      this.$store.dispatch('setTemplateLeftSide', LeftSide)
      this.$store.dispatch('setTemplateRightSide', RightSide)
      this.$store.dispatch('setTemplateSubTitle', 'VK')

      if (this.$route.name === 'vk') {
        this.$router.push({ name: 'vk-token' })
      }
    },
    deactivated () {
      this.$store.dispatch('clearTemplateLeftSide')
      this.$store.dispatch('clearTemplateRightSide')
    }
  }
</script>
