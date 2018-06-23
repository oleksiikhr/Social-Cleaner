<template>
  <div class="block__attr">
    <p>{{ $t(name) }}</p>
    <div class="flex">
      <at-input v-model="model.min" :disabled="process" placeholder="От" /> -
      <at-input v-model="model.max" :disabled="process" placeholder="До" />
    </div>
    <small v-if="info">{{ $t(info) }}</small>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    info: {
      type: String,
      required: false
    },
    process: {
      type: Boolean,
      required: false
    }
  }
}
</script>
