<template>
  <div class="block__attr">
    <h2>{{ $t(name) }}</h2>
    <a v-if="canReverse" :class="reverseClass" @click="model = !model" :disabled="process">
      {{ reverseText }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    canReverse: {
      type: Boolean,
      required: false
    },
    reverse: {
      type: Boolean,
      required: false
    },
    process: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      model: this.reverse
    }
  },
  computed: {
    reverseClass () {
      return `reverse reverse-${this.model ? 'on' : 'off'}`
    },
    reverseText () {
      return this.getT('reverse') + ': ' + this.getT(this.reverse ? 'on' : 'off')
    }
  },
  methods: {
    getT (name) {
      return this.$t(`app.attributes.section.${name}`)
    }
  },
  watch: {
    model () {
      this.$emit('update:reverse', this.model)
    }
  }
}
</script>

<style lang="scss" scoped>
.block__attr {
  margin-bottom: 25px;
  text-align: center;
}

.reverse {
  text-transform: uppercase;
  font-size: .7rem;
  font-weight: bold;
  &-off {
    color: #ff8080;
  }
}
</style>
