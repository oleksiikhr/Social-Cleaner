<template>
  <span>{{ wall }}</span>
</template>

<script>
  import { Toast } from 'quasar'
  import { get } from '../helpers/vk'

  export default {
    data () {
      return {
        wall: {}
      }
    },
    created () {
      this.fetchGetWall()
    },
    methods: {
      fetchGetWall () {
        get('wall.get', {
          access_token: this.$store.state.vk.token
        })
          .then(res => {
            if (res.body.response) {
              this.wall = res.body.response
              this.$store.state.vk.user.counters.wall = res.body.response.count
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
