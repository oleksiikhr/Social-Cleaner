<template>
  <div class="block__attr">
    <top :obj="obj" :name="nameAttribute" :compare="compare" :process="process" />
    <at-checkbox-group v-model="obj.items">
      <at-checkbox v-for="item in html" :key="item.val" :label="item.val" :disabled="process">
        {{ $t(item.name) }}
      </at-checkbox>
    </at-checkbox-group>
    <small v-if="info">{{ $t(info) }}</small>
  </div>
</template>

<script>
import Top from './Top'

export default {
  components: {
    Top
  },
  props: {
    obj: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    html: {
      type: Array,
      required: true
    },
    compare: {
      type: Boolean,
      required: false
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
      nameAttribute: ''
    }
  },
  mounted () {
    if (this.name) {
      this.nameAttribute = this.name
    } else if (this.obj.name) {
      this.nameAttribute = this.obj.name
    }
  }
}
</script>
