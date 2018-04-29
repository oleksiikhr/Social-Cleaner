<template>
  <router-link :to="item.to" :style="'background: ' + item.image" class="item">
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
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  margin: 10px 20px;
  color: #333;
  opacity: .6;
  transition: .3s;
  &:hover {
    opacity: 1;
  }
  > .name {
    font-weight: bold;
    font-size: 1.5rem;
  }
  > .domain {
    vertical-align: top;
    font-size: .6rem;
  }
}
</style>
