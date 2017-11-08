<template>
  <div id="wall" style="padding: 0 20px 20px;">
    <!-- TODO: Btn for update count -->
    <!-- TODO: Design -->
    <!-- TODO: Show post  -->
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
             :disabled="count < 1" @click.native="fetchGetPostsForDelete(offset, count)">
        Delete
      </q-btn>
    </template>
    <q-spinner-cube v-else color="primary" :size="60" />
  </div>
</template>

<script>
  import { Toast, QSpinnerCube, QField, QChipsInput, QInput, QBtn } from 'quasar'
  import { jsonp } from '../../helpers/vk'

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
        pass: 50,
        processDelete: false
      }
    },
    created () {
      this.fetchGetPosts()
    },
    methods: {
      fetchGetPosts (count) {
        jsonp('wall.get', {
          count: count
        })
          .then(res => {
            if (res.body.response) {
              this.wall = res.body.response
              this.count = res.body.response.count
              this.$store.dispatch('vkSetUserCounter', { key: 'wall', val: this.count })
            }
            else {
              Toast.create.negative({ html: res.body.error ? res.body.error.error_msg : 'Error: Wall' })
            }
          })
      },
      fetchGetPostsForDelete (offset, count) {
        this.processDelete = true

        if (offset >= count) {
          this.processDelete = false
          Toast.create.positive({ html: 'Wall: posts deleted' })
          return this.$store.dispatch('vkAddLog', { message: 'Delete complete', icon: 'dashboard', type: 'positive' })
        }

        jsonp('wall.get', {
          offset: offset,
          count: this.pass
        })
          .then(res => {
            if (res.body.response && res.body.response.items.length) {
              this.$store.dispatch('vkAddLog', { message: 'Receiving posts for removal', icon: 'dashboard', type: 'info' })
              return this.fetchDeletePost(res.body.response.items, 0, offset, count)
            }
            this.processDelete = false
            Toast.create.negative({ html: res.body.error ? res.body.error.error_msg : 'Wall: stop deleting' })
            this.$store.dispatch('vkAddLog', { message: 'Stop deleting', icon: 'dashboard', type: this.count > 0 ? 'negative' : 'positive' })
          }, res => {
            this.processDelete = false
            Toast.create.negative({ html: 'Wall: stop deleting' })
            return this.$store.dispatch('vkAddLog', { message: 'Stop deleting', icon: 'dashboard', type: 'negative' })
          })
      },
      fetchDeletePost (items, index, offset, count) {
        if (typeof items[index] === 'undefined') {
          return this.fetchGetPostsForDelete(offset, count - this.pass)
        }

        let item = items[index]
        delete items[index]

        if (this.itemsNoDelete.indexOf(item.id.toString()) > -1) {
          this.$store.dispatch('vkAddLog', { message: 'Saved id: ' + item.id, icon: 'dashboard', type: 'positive' })
          return this.fetchDeletePost(items, ++index, offset, count)
        }

        sleep(randomInteger(500, 2000)).then(() => {
          jsonp('wall.delete', {
            post_id: item.id
          })
            .then(res => {
              this.$store.dispatch('vkAddLog', {
                message: res.body.response ? 'Deleted id: ' + item.id : 'Not deleted id: ' + item.id,
                icon: 'dashboard',
                type: res.body.response ? 'positive' : 'negative'
              })
              this.$store.dispatch('vkCounterUserDecrement', 'wall')
              this.count--
              return this.fetchDeletePost(items, ++index, offset, count)
            }, res => {
              this.processDelete = false
              Toast.create.negative({ html: 'Wall: stop deleting' })
              return this.$store.dispatch('vkAddLog', { message: 'Stop deleting', icon: 'dashboard', type: 'negative' })
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
