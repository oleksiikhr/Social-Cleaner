<template>
  <span>Friends</span>
</template>

<script>
  // TODO: complete in future
  import { jsonp } from '../../helpers/vk'

  export default {
    created () {
      // TODO: If not in the store
      jsonp('friends.get', {
        count: 10000
      })
        .then(res => {
          console.log(res.body)
        })
    }
  }
</script>
