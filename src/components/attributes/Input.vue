<template>
  <div class="block__attr">
    <p>{{ $t(name) }}</p>
    <at-input v-model="input" :disabled="process" />
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
      type: String,
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
  },
  data () {
    return {
      input: this.model
    }
  },
  watch: {
    input () {
      this.$emit('update:model', this.input)
    }
  }
}
</script>
