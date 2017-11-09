<template>
  <!-- TODO: Show posts  -->
  <!-- TODO: Filter -->
  <q-card style="margin: 0;">
    <q-card-title>
      <q-icon name="dashboard" /> Wall
      <q-btn flat round small color="primary" slot="right" loader v-model="processRefresh" @click="fetchGetCountPosts()">
        <q-icon name="refresh" />
        <q-tooltip anchor="bottom middle" self="top middle">Refresh</q-tooltip>
      </q-btn>
    </q-card-title>
    <q-card-main>
      <template v-if="maxCount > 0">
        <q-list v-if="maxCount > 1">
          <q-item>
            <q-item-side>Range</q-item-side>
            <q-item-main>
              <q-range v-model="range" :min="1" :disabled="processDelete" :max="maxCount" :step="1" label />
            </q-item-main>
          </q-item>
        </q-list>
        <small v-else>Last post.</small>
        <q-field icon="save" count helper="Press: Enter" style="margin-bottom: 2rem;">
          <q-chips-input :disabled="processDelete" float-label="Keep posts [ID's]" v-model="itemsNoDelete" />
        </q-field>
        <!-- TODO: OpenDialogDelete -->
        <q-btn icon="delete" color="red" loader outline class="full-width" v-model="processDelete"
               :disabled="countPosts < 1 || processDelete"
               @click.native="fetchGetPostsForDelete(countPosts)">
          Delete {{ countPosts }} post{{ countPosts > 1 ? 's' : '' }}
        </q-btn>
        <q-btn icon="stop" class="full-width" outline :disabled="!processDelete" style="margin-top: 1rem;"
               @click="actionStopDeleting()">
          Stop
        </q-btn>
      </template>
      <template v-else>
        The wall is empty.
      </template>
    </q-card-main>
  </q-card>
</template>

<script>
  import { jsonp } from '../../helpers/vk'
  import {
    Toast,
    QSpinnerCube,
    QField,
    QChipsInput,
    QInput,
    QBtn,
    QRange,
    QCard,
    QCardTitle,
    QIcon,
    QCardMain,
    QTooltip,
    QList,
    QItem,
    QItemSide,
    QItemMain
  } from 'quasar'

  export default {
    components: {
      QSpinnerCube,
      QField,
      QChipsInput,
      QInput,
      QBtn,
      QRange,
      QCard,
      QCardTitle,
      QIcon,
      QCardMain,
      QTooltip,
      QList,
      QItem,
      QItemSide,
      QItemMain
    },
    data () {
      return {
        itemsNoDelete: [],
        stopDeleting: false,

        pass: 50,
        maxCount: 0,
        range: { min: 1, max: 1 },

        processDelete: false,
        processRefresh: false
      }
    },
    created () {
      this.fetchGetCountPosts()
    },
    computed: {
      countPosts () {
        return this.maxCount === 1 ? 1 : this.range.max - this.range.min + 1
      }
    },
    methods: {
      fetchGetCountPosts () {
        this.processRefresh = true

        jsonp('wall.get', {
          count: 1
        })
          .then(res => {
            if (res.body.response) {
              this.maxCount = res.body.response.count
              this.range.min = 1
              this.range.max = this.maxCount
              this.$store.dispatch('vkSetUserCounter', { key: 'wall', val: this.maxCount })
            }
            else {
              Toast.create.negative({ html: res.body.error ? res.body.error.error_msg : 'Error: Get Wall' })
            }
            this.processRefresh = false
          }, res => {
            this.processRefresh = false
          })
      },
      fetchGetPostsForDelete (count) {
        this.processDelete = true

        if (count < 1) {
          return this.stopDelete(true, 'Delete complete')
        }

        jsonp('wall.get', {
          offset: this.range.min > this.maxCount ? this.maxCount : this.range.min,
          count: count > this.pass ? this.pass : count
        })
          .then(res => {
            if (res.body.response && res.body.response.items.length) {
              this.$store.dispatch('vkAddLog', { message: 'Receiving posts for removal', icon: 'dashboard', type: 'info' })
              return this.fetchDeletePost(res.body.response.items, 0, count)
            }
            this.stopDelete(false, res.body.error ? res.body.error.error_msg : 'Stop deleting')
          }, res => {
            this.stopDelete(false)
          })
      },
      fetchDeletePost (items, index, count) {
        if (this.stopDeleting) {
          this.stopDeleting = false
          return this.fetchGetPostsForDelete(0)
        }

        if (typeof items[index] === 'undefined') {
          return this.fetchGetPostsForDelete(count - this.pass)
        }

        let item = items[index]
        delete items[index]

        if (this.itemsNoDelete.indexOf(item.id.toString()) > -1) {
          this.$store.dispatch('vkAddLog', { message: 'Keep id: ' + item.id, icon: 'dashboard', type: 'positive' })
          this.range.min++
          return this.fetchDeletePost(items, ++index, count)
        }

        sleep(randomInteger(500, 2500)).then(() => {
          jsonp('wall.delete', {
            post_id: item.id
          })
            .then(res => {
              this.$store.dispatch('vkAddLog', {
                message: res.body.response ? 'Deleted id: ' + item.id : 'Not deleted id: ' + item.id,
                icon: 'dashboard',
                type: res.body.response ? 'positive' : 'negative'
              })

              if (res.body.response) {
                this.$store.dispatch('vkCounterUserDecrement', 'wall')
                this.maxCount--
                this.range.max--
              }

              return this.fetchDeletePost(items, ++index, count)
            }, res => {
              this.stopDelete(false)
            })
        })
      },
      stopDelete (isPositive = true, text = 'Stop deleting') {
        this.processDelete = false

        this.$store.dispatch('vkAddLog', {
          message: text,
          icon: 'dashboard',
          type: isPositive ? 'positive' : 'negative'
        })

        if (isPositive) {
          Toast.create.positive({ html: 'Wall: ' + text })
        } else {
          Toast.create.negative({ html: 'Wall: ' + text })
        }
      },
      actionStopDeleting () {
        this.stopDeleting = true
        this.$store.dispatch('vkAddLog', { message: 'Stopping..', icon: 'dashboard', type: 'info' })
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
