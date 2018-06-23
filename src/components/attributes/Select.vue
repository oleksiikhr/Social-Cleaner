<template>
  <div class="block__attr">
    <p>{{ $t(name) }}</p>
    <at-select v-model="obj.value" :disabled="process" :size="size">
      <at-option v-for="item in html" :key="item.val" :value="item.val">
        {{ $t(item.name) }}
      </at-option>
    </at-select>
    <small v-if="info">{{ $t(info) }}</small>
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
