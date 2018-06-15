<template>
  <div id="loading">
    <div class="loading__inner">
      <a class="loading__item" v-for="(item, index) in media" :key="index" @click="item.cancel = true">
        <div class="loading__icon">
          <i :class="`fa ${item.info.icon}`" aria-hidden="true"></i>
        </div>
      </a>
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
  top: 20px;
  right: 20px;
}

.loading__inner {
  border: 1px solid #e7e7e7;
  background: #fff;
}

.loading__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  line-height: 0;
  font-size: 1.7rem;
  color: #444;
  border-bottom: 1px solid #e7e7e7;
  overflow: hidden;
  transition: .2s;
  &:hover {
    background: rgba(0, 0, 0, .05);
  }
  &:last-child {
    border-bottom: 0;
  }
}
</style>
