<template>
  <router-link style="display: block" :to="item.to">
    {{ item }}
    <img :src="item.image" :alt="item.name" />
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
