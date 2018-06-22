<template>
  <div class="top">
    <p :class="getStyleStatus(activeStatus)">{{ $t(name) }}</p>
    <a class="compare" @click="obj.compareAll = !obj.compareAll" :disabled="!compare || process">
      {{ obj.compareAll ? $t('app.attributes.top.and') : $t('app.attributes.top.or') }}
    </a>
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
    process: {
      type: Boolean,
      required: true
    },
    compare: {
      type: Boolean,
      required: false
    },
    activeStatus: {
      type: Boolean | Number,
      required: false
    }
  }
}
</script>
