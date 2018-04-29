<template>
  <router-link style="display: block" :to="item.to">{{ item }}</router-link>
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
