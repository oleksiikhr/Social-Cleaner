<template>
  <div id="wall" style="padding: 0 20px 20px;">
    <h4 style="margin: 0; padding: 15px 0 10px">Wall</h4>
    <template v-if="'items' in wall">
      <div class="row">
        <div class="col">
          <q-input v-model="count" :disabled="processDelete" type="number" float-label="Count" />
        </div>
        <div class="col">
          <q-input v-model="offset" :disabled="processDelete" type="number" float-label="Offset" />
        </div>
      </div>
      <q-field icon="label" count helper="Press: Enter" style="margin-bottom: 2rem;">
        <q-chips-input :disabled="processDelete" float-label="ID's undelete posts" v-model="itemsNoDelete" />
      </q-field>
      <q-btn icon="delete" color="red" loader outline class="full-width" v-model="processDelete"
             :disabled="count < 1" @click.native="fetchDeleteWall(offset)">
        Delete
      </q-btn>
    </template>
    <q-spinner-cube v-else color="primary" :size="60" />
  </div>
</template>

<script>
  import { Toast, QSpinnerCube, QField, QChipsInput, QInput, QBtn } from 'quasar'
  import { get } from '../../helpers/vk'

  export default {
    components: {
      QSpinnerCube, QField, QChipsInput, QInput, QBtn
    },
    data () {
      return {
        wall: {},
        itemsNoDelete: [],
        count: 1,
        offset: 0,
        processDelete: false
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
              this.count = res.body.response.count
              this.$store.dispatch('setUserCounter', { key: 'wall', val: this.count })
            }
            else {
              Toast.create.negative({ html: res.body.error ? res.body.error.error_msg : 'Error from VK' })
            }
          }, res => {
            Toast.create.negative({ html: 'Error from VK' })
          })
      },
      fetchDeleteWall (offset) {
        this.processDelete = true

        if (offset >= this.offset + this.count) {
          this.processDelete = false
          return Toast.create.positive({ html: 'Posts deleted' })
        }

        sleep(randomInteger(500, 3000)).then(() => {
          get('wall.get', {
            access_token: this.$store.state.vk.token,
            offset: offset + 1,
            count: 1
          })
            .then(res => {
              if (res.body.response && res.body.response.items.length) {
                let id = res.body.response.items[0].id
                if (this.itemsNoDelete.indexOf(id.toString()) > -1) {
                  this.$store.dispatch('addLog', { message: 'Saved id: ' + id, section: 'wall' })
                  return this.fetchDeleteWall(offset)
                }
                get('wall.delete', {
                  access_token: this.$store.state.vk.token,
                  post_id: id
                })
                  .then(res => {
                    if (res.body.response) {
                      this.$store.dispatch('counterUserDecrement', 'wall')
                      this.$store.dispatch('addLog', { message: 'Deleted id: ' + id, section: 'wall' })
                      this.count--
                      return this.fetchDeleteWall(offset)
                    }
                    this.processDelete = false
                    return Toast.create.negative({ html: res.body.error ? res.body.error.error_msg : 'No deleted' })
                  }, res => {
                    this.processDelete = false
                  })
              }
              else {
                this.processDelete = false
                return Toast.create.negative({ html: res.body.error ? res.body.error.error_msg : 'No items' })
              }
            }, res => {
              this.processDelete = false
            })
        })
      }
    }
  }

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  function randomInteger (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
  }
</script>
