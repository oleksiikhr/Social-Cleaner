<template>
  <router-link :to="item.to" :style="'background: ' + item.image" :class="'item' + classDisabled">
    <span class="name">{{ item.name }}</span>
    <span class="domain">{{ item.domain }}</span>
  </router-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    classDisabled () {
      return this.item.disabled ? ' disabled' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.item {
  display: inline-block;
  min-width: 150px;
  margin: 0 10px 20px;
  padding: 5px 30px;
  background: rgba(0, 0, 0, .1);
  border: 1px solid rgba(0, 0, 0, .1);
  text-align: center;
  transition: .5s;
  &.disabled {
    opacity: .7;
    pointer-events: none;
    color: $color-error;
  }
  > .name {
    font-weight: bold;
    font-size: 1.2rem;
  }
  > .domain {
    vertical-align: top;
    font-size: .6rem;
  }
}
</style>
