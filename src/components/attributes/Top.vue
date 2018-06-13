<template>
  <div class="top">
    <p :class="getStyleStatus(obj.items.length)">{{ name }}</p>
    <a class="compare" @click="obj.compareAll = !obj.compareAll" :disabled="!compare">
      {{ obj.compareAll ? 'And' : 'Or' }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    compare: {
      type: Boolean,
      required: false
    }
  }
}
</script>
