<template>
  <div class="code">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.code {
  background: rgba(0, 0, 0, .2);
  padding: 5px;
  color: $color-warning;
  overflow: auto;
}
</style>
