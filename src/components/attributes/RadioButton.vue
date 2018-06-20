<template>
  <div class="block__attr">
    <p>{{ name }}</p>
    <at-radio-group v-model="obj.value">
      <at-radio-button v-for="item in obj.html" :key="item.val" :label="item.val" :disabled="process">
        {{ item.name }}
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
