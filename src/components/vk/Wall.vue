<template>
  <q-card style="margin: 0;">
    <q-card-title>
      <q-icon name="dashboard" /> Wall
      <q-btn flat round small color="primary" slot="right" loader v-model="processRefresh" @click="fetchGetCountPosts()">
        <q-icon name="refresh" />
        <q-tooltip anchor="bottom middle" self="top middle">Refresh</q-tooltip>
      </q-btn>
    </q-card-title>
    <q-card-main>
      <q-card style="margin-bottom: 2rem;">
        <q-card-title>Config</q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-select v-model="filter" :options="selectFilters" style="margin-bottom: 1.5rem;"/>
          <template v-if="maxCount > 1">
            <q-list>
              <q-item>
                <q-item-side>Range</q-item-side>
                <q-item-main>
                  <q-range v-model="range" :min="1" :disabled="processDelete" :max="maxCount" :step="1" label />
                </q-item-main>
              </q-item>
            </q-list>
          </template>
          <small style="display: block; margin: 0.5rem 0 2rem;">
            <template v-if="maxCount < 1">No posts</template>
            <template v-else-if="range.min === range.max">Delete the post #{{ range.min }}</template>
            <template v-else>Delete the post from {{ range.min }} to {{ range.max }}</template>
          </small>
        </q-card-main>
      </q-card>

      <q-card style="margin-bottom: 2rem;">
        <q-card-title>
          Skip posts by id
          <div slot="right" class="row items-center">
            {{ postsNoDelete.length }}
          </div>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-input :disabled="processDelete" v-model="fNoDeletePost" placeholder="ID or link"
                   @keyup.enter="addNoDeletePostId()" />
          <small style="display: block; margin-bottom: 1.5rem;">Example: 1, vk.com/wall207909600_690</small>
          <q-collapsible icon="remove_red_eye" label="Posts">
            <q-chip v-for="(item, index) in postsNoDelete" :key="index" small color="primary"
                    title="Follow the link" style="margin: 0 5px 5px 0; cursor: pointer;"
                    closable @close="closeChip(index)" @click="goPost(item)">
              {{ item }}
            </q-chip>
          </q-collapsible>
        </q-card-main>
      </q-card>

      <q-card style="margin-bottom: 2rem;">
        <q-card-title>
          Skip groups by id
          <div slot="right" class="row items-center">
            {{ groupsNoDelete.length }}
          </div>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-input :disabled="processDelete" v-model="fNoDeleteGroup" placeholder="ID or link"
                   @keyup.enter="" />
          <small style="display: block; margin-bottom: 1.5rem;">
            Example: 1, vk.com/eng_day, vk.com/public1
          </small>
          <q-collapsible icon="remove_red_eye" label="Groups">
            <q-chip v-for="(item, index) in groupsNoDelete" :key="index" small color="primary"
                    title="Follow the link" style="margin: 0 5px 5px 0; cursor: pointer;"
                    closable @close="closeChip(index)" @click="goGroup(item)">
              {{ item }}
            </q-chip>
          </q-collapsible>
        </q-card-main>
      </q-card>

      <q-btn v-if="!processDelete" icon="delete" color="red" outline v-model="processDelete"
             class="full-width" :disabled="countPosts < 1" @click.native="openDialogDelete()">
        Delete
      </q-btn>
      <q-btn v-else icon="stop" class="full-width" outline :disabled="!processDelete || stopDeleting"
             @click="actionStopDeleting()">
        Stop
      </q-btn>
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
    QCardSeparator,
    QIcon,
    QCardMain,
    QTooltip,
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QSelect,
    Dialog,
    QCollapsible,
    QChip
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
      QCardSeparator,
      QIcon,
      QCardMain,
      QTooltip,
      QList,
      QItem,
      QItemSide,
      QItemMain,
      QSelect,
      QCollapsible,
      QChip
    },
    data () {
      return {
        postsNoDelete: [],
        groupsNoDelete: [],
        stopDeleting: false,

        pass: 50,
        maxCount: 0,
        range: { min: 1, max: 0 },
        filter: 'all',

        fNoDeletePost: '',
        fNoDeleteGroup: '',

        selectFilters: [
          {
            label: 'Posts by the wall owner and others',
            value: 'all'
          },
          {
            label: 'Posts by the wall owner',
            value: 'owner'
          },
          {
            label: 'Posts by someone else',
            value: 'others'
          }
        ],

        processDelete: false,
        processRefresh: false,

        dialogDelete: false
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
          count: 1,
          filter: this.filter
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
          count: count > this.pass ? this.pass : count,
          filter: this.filter
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

        if (this.postsNoDelete.indexOf(item.id) > -1) {
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
      openDialogDelete () {
        this.processDelete = false

        Dialog.create({
          title: 'Delete posts',
          message: 'Are you sure you want to delete posts?<br><b>It is impossible to restore!</b>',
          buttons: [
            {
              label: 'Cancel',
              color: 'negative'
            },
            {
              label: 'Delete',
              handler: () => {
                this.fetchGetPostsForDelete(this.countPosts)
              }
            }
          ]
        })
      },
      actionStopDeleting () {
        this.stopDeleting = true
        this.$store.dispatch('vkAddLog', { message: 'Stopping..', icon: 'dashboard', type: 'info' })
      },
      stopDelete (isPositive = true, text = 'Stop deleting') {
        this.processDelete = false

        this.$store.dispatch('vkAddLog', {
          message: text,
          icon: 'dashboard',
          type: isPositive ? 'positive' : 'negative'
        })

        isPositive ? Toast.create.positive({ html: 'Wall: ' + text }) : Toast.create.negative({ html: 'Wall: ' + text })
      },
      addNoDeletePostId () {
        let text = this.fNoDeletePost
        this.fNoDeletePost = ''
        let id = parseInt(text)
        let userId = this.$store.state.vk.user.id

        if (!id) {
          let findIndex = text.indexOf('wall' + userId + '_')
          id = parseInt(text.substring(findIndex + userId.toString().length + 5))
          if (!id) {
            return this.$store.dispatch('vkAddLog', { message: 'Error getting id', icon: 'dashboard', type: 'negative' })
          }
        }

        if (this.postsNoDelete.indexOf(id) > -1) {
          return this.$store.dispatch('vkAddLog', { message: 'Post #' + id + ' exist', icon: 'dashboard', type: 'info' })
        }

        jsonp('wall.getById', {
          posts: userId + '_' + id
        })
          .then(res => {
            if (res.body.response[0]) {
              this.postsNoDelete.push(id)
            }
            else {
              this.$store.dispatch('vkAddLog', { message: 'Post #' + id + ' does not exist', icon: 'dashboard', type: 'negative' })
            }
          })
      },
      goPost (id) {
        window.open('https://vk.com/wall' + this.$store.state.vk.user.id + '_' + id)
      },
      goGroup (id) {
        window.open('https://vk.com/public' + id)
      },
      closeChip (index) {
        this.postsNoDelete.splice(index, 1)
      }
    },
    watch: {
      filter () {
        this.fetchGetCountPosts()
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
