<template>
  <div>Token</div>
</template>

<script>
export default {
  data () {
    return {
      token: ''
    }
  },
  methods: {
    installToken () {
      this.$store.dispatch('vkInit', this.token)
    }
  }
}
</script>
