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
.item {
  display: inline-block;
  margin: 10px;
  padding: 5px 10px;
  color: #333;
  opacity: .6;
  transition: .3s;
  &:hover {
    opacity: 1;
  }
  &.disabled {
    opacity: .2;
    pointer-events: none;
  }
  > .name {
    font-weight: bold;
    font-size: 1.3rem;
  }
  > .domain {
    vertical-align: top;
    font-size: .6rem;
  }
}
</style>
