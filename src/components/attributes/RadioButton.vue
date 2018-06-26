<template>
  <div class="block__attr">
    <p>{{ $t(name) }}</p>
    <at-radio-group v-model="obj.value">
      <at-radio-button v-for="item in html" :key="item.val" :label="item.val" :disabled="process">
        {{ $t(item.name) }}
      </at-radio-button>
    </at-radio-group>
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
    process: {
      type: Boolean,
      required: false
    }
  }
}
</script>
