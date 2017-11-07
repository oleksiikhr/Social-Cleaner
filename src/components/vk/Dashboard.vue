<template>
  <div id="vk">
    <div class="info" style="padding: 20px" v-if="$route.name === 'vk-dashboard'">
      Info VK
    </div>
    <router-view />
  </div>
</template>

<script>
  import LeftSide from './templates/LeftSide.vue'
  import RightSide from './templates/RightSide.vue'

  export default {
    created () {
      this.$store.dispatch('setTemplateLeftSide', LeftSide)
      this.$store.dispatch('setTemplateRightSide', RightSide)
      this.$store.dispatch('setTemplateSubTitle', 'VK')
    }
  }
</script>
