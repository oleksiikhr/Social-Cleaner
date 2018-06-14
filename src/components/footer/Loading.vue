<template>
  <div id="loading">
    <div class="loading__inner">
      <div class="loading__item" v-for="(item, index) in media" :key="index">
        {{ item.process }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    media () {
      return this.$store.state.media
    }
  }
}
</script>

<style lang="scss" scoped>
#loading {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

.loading__inner {
  padding: 10px;
  border: 1px solid #e7e7e7;
  background: #fff;
}

.loading__item {
  padding: 10px 0;
  border-bottom: 1px solid #e7e7e7;
}
</style>
