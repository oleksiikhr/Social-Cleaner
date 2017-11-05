<template>
  <div id="wall">
    <h4>Wall</h4>
    <template v-if="'items' in wall">
      <div class="row">
        <div class="col"><q-input v-model="count" type="number" float-label="Count" /></div>
        <div class="col"><q-input v-model="offset" type="number" float-label="Offset" /></div>
      </div>
      <q-field icon="label" count helper="Example: 351, 16" style="margin-bottom: 2rem;">
        <q-chips-input float-label="ID's undelete posts" v-model="noDelete" />
      </q-field>
      <q-btn icon="delete" color="red" outline class="full-width" @click.native="fetchDeleteWall()">Delete</q-btn>
    </template>
    <q-spinner-cube v-else color="primary" :size="60" />
  </div>
</template>

<script>
  import { Toast, QSpinnerCube, QField, QChipsInput, QInput, QBtn } from 'quasar'
  import { get } from '../helpers/vk'

  export default {
    components: {
      QSpinnerCube, QField, QChipsInput, QInput, QBtn
    },
    data () {
      return {
        wall: {},
        noDelete: [],
        count: 1,
        offset: 0
      }
    },
    created () {
      this.fetchGetWall()
    },
    methods: {
      fetchGetWall () {
        get('wall.get', {
          access_token: this.$store.state.vk.token,
          count: 1
        })
          .then(res => {
            if (res.body.response) {
              this.wall = res.body.response
              this.$store.state.vk.user.counters.wall = res.body.response.count
              this.count = res.body.response.count
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
      },
      fetchDeleteWall () {
        // Recursion
      }
    }
  }

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  function randomInteger (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
  }
</script>
