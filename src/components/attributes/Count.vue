<template>
  <!--TODO Translate-->
  <div class="block__attr">
    <p>{{ $t(name) }}</p>
    <div class="flex">
      <at-input v-model="min" :disabled="process" placeholder="От" @blur="eventBlurMin" /> -
      <at-input v-model="max" :disabled="process" placeholder="До" @blur="eventBlurMax" />
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
  },
  data () {
    return {
      min: this.model.min,
      max: this.model.max
    }
  },
  methods: {
    replace (attr) {
      this[attr] = this[attr].toString().replace(/(^0|[^0-9])/g, '')

      if (!this[attr]) {
        this[attr] = 1
      } else {
        this[attr] = parseInt(this[attr])
      }
    },
    eventBlurMin () {
      this.replace('min')

      if (this.min > this.max) {
        this.max = this.min
      }

      this.updateCount()
    },
    eventBlurMax () {
      this.replace('max')

      if (this.min > this.max) {
        this.min = this.max
      }

      this.updateCount()
    },
    updateCount () {
      this.$emit('update:model', { min: this.min, max: this.max })
    }
  }
}
</script>
