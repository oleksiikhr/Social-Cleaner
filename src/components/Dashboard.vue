<template>
  <!-- TODO: Blocks -->
  <span>General Dashboard</span>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('clearTemplateLeftSide')
      this.$store.dispatch('clearTemplateRightSide')
      this.$store.dispatch('clearTemplateSubTitle')
    }
  }
</script>
