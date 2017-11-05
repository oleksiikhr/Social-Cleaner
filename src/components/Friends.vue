<template>
  <span>Friends</span>
</template>

<script>
  // TODO: complete in future
  import { get } from '../helpers/vk'

  export default {
    created () {
      // TODO: If not in the store
      get('friends.get', {
        count: 10000,
        access_token: this.$store.state.vk.token
      })
        .then(res => {
          console.log(res.body)
        })
    }
  }
</script>
