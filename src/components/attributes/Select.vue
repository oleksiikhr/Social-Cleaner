<template>
  <div class="block__attr">
    <p>{{ name }}</p>
    <at-select v-model="input" :disabled="process" :size="size">
      <at-option v-for="item in html" :key="item.val" :value="item.val">
        {{ item.name }}
      </at-option>
    </at-select>
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
    html: {
      type: Array,
      required: true
    },
    info: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false,
      default: 'normal'
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
