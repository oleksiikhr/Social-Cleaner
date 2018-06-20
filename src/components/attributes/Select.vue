<template>
  <div class="block__attr">
    <p>{{ name }}</p>
    <at-select v-model="obj.value" :disabled="process" :size="size">
      <at-option v-for="item in obj.html" :key="item.val" :value="item.val">
        {{ item.name }}
      </at-option>
    </at-select>
    <small v-if="info">{{ info }}</small>
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
    info: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false,
      default: 'normal'
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
