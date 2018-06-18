<template>
  <!--FIXME Design-->
  <!--TODO disabled process-->
  <div class="reverse">
    <a @click="reverse = !reverse">Reverse: {{ reverse }}</a>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Boolean,
      required: true
    },
    process: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      reverse: this.model
    }
  },
  watch: {
    reverse () {
      this.$emit('update:model', this.reverse)
    }
  }
}
</script>
