<template>
  <span>{{ docs }}</span>
</template>

<script>
  import { Toast } from 'quasar'
  import { jsonp } from '../../helpers/vk'

  export default {
    data () {
      return {
        docs: {}
      }
    },
    created () {
      this.fetchGetDocs()
    },
    methods: {
      fetchGetDocs () {
        jsonp('docs.get')
          .then(res => {
            if (res.body.response) {
              this.docs = res.body.response
              this.$store.state.vk.user.counters.docs = res.body.response.count
            }
            else {
              Toast.create.negative({
                html: res.body.error.error_msg
              })
            }
          }, res => {
            Toast.create.negative({
              html: 'Error from VK'
            })
          })
      }
    }
  }
</script>
