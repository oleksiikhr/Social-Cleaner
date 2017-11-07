<template>
  <div id="vk">
    <router-view />
  </div>
</template>

<script>
  import LeftSide from './modules/LeftSide.vue'
  import RightSide from './modules/RightSide.vue'

  export default {
    created () {
      this.$store.dispatch('setTemplateLeftSide', LeftSide)
      this.$store.dispatch('setTemplateRightSide', RightSide)
    }
  }
</script>
