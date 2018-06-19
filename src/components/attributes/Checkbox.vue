<template>
  <div class="block__attr">
    <top :obj="obj" :name="name" :compare="compare" :process="process" />
    <at-checkbox-group v-model="obj.items">
      <at-checkbox v-for="item in obj.html" :key="item.val" :label="item.val" :disabled="process">
        {{ item.name }}
      </at-checkbox>
    </at-checkbox-group>
    <small v-if="info">{{ info }}</small>
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
  }
}
</script>
