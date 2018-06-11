<template>
  <div class="block__attr">
    <p>{{ name }}</p>
    <at-input v-model="input" :disabled="process" />
    <small v-if="info">{{ info }}</small>
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
    }
  },
  data () {
    return {
      input: this.model
    }
  },
  computed: {
    process () {
      return this.$store.state.vk.process
    }
  },
  watch: {
    input () {
      this.$emit('update:model', this.input)
    }
  }
}
</script>
