<template>
  <div class="block__attr">
    <p>{{ $t(name) }}</p>
    <at-radio-group v-model="input">
      <at-radio v-for="item in html" :key="item.val" :label="item.val" :disabled="process">
        {{ $t(item.name) }}
      </at-radio>
    </at-radio-group>
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
      type: Number | String,
      required: true
    },
    html: {
      type: Array,
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
