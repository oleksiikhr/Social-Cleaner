<template>
  <q-card style="margin: 0;" flat>
    <q-card-title>
      <q-icon name="dashboard" /> Wall
      <q-btn flat round small color="primary" slot="right" loader v-model="processRefresh" @click="fetchGetCountPosts()">
        <q-icon name="refresh" />
        <q-tooltip anchor="bottom middle" self="top middle">Refresh</q-tooltip>
      </q-btn>
    </q-card-title>
    <q-card-main>
      <q-card style="margin-bottom: 2rem">
        <q-card-title>
          Config
          <div slot="right" class="row items-center">
            <template v-if="maxCount < 1">No posts</template>
            <template v-else-if="range.min === range.max">Delete the post #{{ range.min }}</template>
            <template v-else>Delete the post from {{ range.min }} to {{ range.max }}</template>
          </div>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-select v-model="globalFilter" :options="selectGlobalFilters" style="margin-bottom: 1.5rem;"/>
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
        </q-card-main>
      </q-card>

      <q-card style="margin-bottom: 2rem;" flat>
        <q-card-title>
          Filter
          <div slot="right" class="row items-center">
            {{ countPostsConfig }}
          </div>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-tabs inverted>
            <q-tab default :count="posts.length" slot="title" name="tab-1" icon="description" />
            <!--<q-tab :count="groups.length" slot="title" name="tab-2" icon="people" />-->
            <!--<q-tab :count="comments.length" slot="title" name="tab-3" icon="comment" />-->
            <!--<q-tab :count="likes.length" slot="title" name="tab-4" icon="favorite" />-->
            <!--<q-tab :count="reposts.length" slot="title" name="tab-5" icon="share" />-->
            <q-tab :alert="views.on" slot="title" name="tab-6" icon="remove_red_eye" />

            <q-tab-pane name="tab-1">
              <p>Number of posts to skip.</p>
              <q-field label="Skip posts" :label-width="2" helper="Only for your account." style="margin-bottom: 2rem">
                <q-input :disabled="processDelete" v-model="fNoDeletePost" placeholder="Id or link to post"
                         @keyup.enter="addNoDeletePostId()" />
              </q-field>
              <q-chip v-for="(item, index) in posts" :key="index" small color="primary"
                      title="Follow the link" style="margin: 0 5px 5px 0; cursor: pointer;"
                      closable @close="closePostChip(index)" @click="goPost(item)">
                {{ item }}
              </q-chip>
            </q-tab-pane>

            <!--<q-tab-pane name="tab-2">-->
              <!--<p>Nested group entries for deletion.</p>-->
              <!--<q-field icon="attachment">-->
                <!--<q-input :disabled="processDelete" v-model="fNoDeletePost" placeholder="Id or link to group"-->
                         <!--@keyup.enter="addNoDeletePostId()" />-->
              <!--</q-field>-->
              <!--<q-checkbox v-model="checkDeleteGroup" label="Delete" style="margin: 1.5rem 0;" />-->
              <!--<q-collapsible icon="remove_red_eye" label="See">-->
                <!--&lt;!&ndash; TODO: Object with color &ndash;&gt;-->
                <!--<q-chip v-for="(item, index) in groups" :key="index" small :color="true ? 'primary' : 'red'"-->
                        <!--title="Follow the link" style="margin: 0 5px 5px 0; cursor: pointer;"-->
                        <!--closable @close="" @click="goGroup(item)">-->
                  <!--{{ item }}-->
                <!--</q-chip>-->
              <!--</q-collapsible>-->
            <!--</q-tab-pane>-->

            <!--<q-tab-pane name="tab-3"></q-tab-pane>-->

            <!--<q-tab-pane name="tab-4"></q-tab-pane>-->

            <!--<q-tab-pane name="tab-5"></q-tab-pane>-->

            <q-tab-pane name="tab-6">
              <p>Number of post views to skip.</p>
              <q-toggle
                      v-model="views.on"
                      checked-icon="sentiment very satisfied"
                      unchecked-icon="sentiment very dissatisfied"
                      label="Enable"
              />

              <q-input v-model="views.count" :disabled="!views.on" type="number" float-label="Count views" style="margin: 1.5rem 0;" />

              <q-radio v-model="views.equal" :disabled="!views.on" :val="-1" color="red" label="Less" />
              <q-radio v-model="views.equal" :disabled="!views.on" :val="0" color="black" label="Equal" style="margin-left: 10px" />
              <q-radio v-model="views.equal" :disabled="!views.on" :val="1" color="primary" label="More" style="margin-left: 10px" />
            </q-tab-pane>
          </q-tabs>
        </q-card-main>
      </q-card>

      <div style="margin-bottom: 1.5rem;">
        <q-btn v-if="!processDelete" icon="delete" color="red" outline v-model="processDelete"
               class="full-width" :disabled="countPosts < 1" @click.native="openDialogDelete()">
          Delete
        </q-btn>
        <q-btn v-else icon="stop" class="full-width" outline :disabled="!processDelete || stopDeleting"
               @click="actionStopDeleting()">
          Stop
        </q-btn>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
  import { addLogs, COLOR_INFO, COLOR_NEGATIVE, COLOR_POSITIVE, ICON_WALL, SOCIAL_VK } from '../../helpers/logs'
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
    QChip,
    QTabs,
    QTab,
    QTabPane,
    QCheckbox,
    QRadio,
    QToggle
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
      QChip,
      QTabs,
      QTab,
      QTabPane,
      QCheckbox,
      QRadio,
      QToggle
    },
    data () {
      return {
        init: false,

        posts: [],
        groups: [],
        comments: [],
        likes: [],
        reposts: [],
        views: {
          on: false,
          count: 0,
          equal: 0
        },

        fNoDeletePost: '',
        fNoDeleteGroup: '',

        checkDeleteGroup: true,

        pass: 50,
        maxCount: 0,
        range: { min: 1, max: 0 },

        globalFilter: 'all',
        selectGlobalFilters: [
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

        stopDeleting: false,

        processDelete: false,
        processRefresh: false,

        dialogDelete: false
      }
    },
    activated () {
      if (!this.init) {
        this.init = true
        this.fetchGetCountPosts()
      }
    },
    computed: {
      countPosts () {
        return this.maxCount === 1 ? 1 : this.range.max - this.range.min + 1
      },
      countPostsConfig () {
        return this.posts.length + this.groups.length + this.comments.length + this.likes.length +
                this.reposts.length
      }
    },
    methods: {
      fetchGetCountPosts () {
        this.processRefresh = true

        jsonp('wall.get', {
          count: 1,
          filter: this.globalFilter
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
          filter: this.globalFilter
        })
          .then(res => {
            if (res.body.response && res.body.response.items.length) {
              addLogs(SOCIAL_VK, 'Receiving posts..', 'Request to VK', ICON_WALL, COLOR_INFO)
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

        let skippedSubMessage = this.filterSkipGeneral(item)

        if (skippedSubMessage) {
          addLogs(SOCIAL_VK, 'Skipped: ' + item.id, skippedSubMessage, ICON_WALL, COLOR_POSITIVE)
          this.range.min++
          return this.fetchDeletePost(items, ++index, count)
        }

        sleep(randomInteger(500, 2500)).then(() => {
          jsonp('wall.delete', {
            post_id: item.id
          })
            .then(res => {
              if (res.body.response) {
                addLogs(SOCIAL_VK, 'Deleted id: ' + item.id, null, ICON_WALL, COLOR_POSITIVE)
                this.$store.dispatch('vkCounterUserDecrement', 'wall')
                this.maxCount--
                this.range.max--
              }
              else {
                addLogs(SOCIAL_VK, 'Skipped: ' + item.id, null, ICON_WALL, COLOR_NEGATIVE)
              }

              return this.fetchDeletePost(items, ++index, count)
            }, res => {
              this.stopDelete(false)
            })
        })
      },
      /**
       * Check the conditions for filters.
       *
       * @param item
       *
       * @returns {String} SubMessage
       */
      filterSkipGeneral (item) {
        if (this.filterSkipByPostsIds(item)) {
          return 'Post id'
        }

        if (this.filterSkipByViews(item)) {
          return 'Views'
        }

        return ''
      },
      filterSkipByPostsIds (item) {
        return this.posts.indexOf(item.id) > -1
      },
      filterSkipByViews (item) {
        if (typeof item.views === 'undefined' && !this.views.on) {
          return false
        }

        let views = item.views.count

        switch (this.views.equal) {
          case -1:
            return views < this.views.count
          case 0:
            return views === this.views.count
          case 1:
            return views > this.views.count
          default:
            return false
        }
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
        addLogs(SOCIAL_VK, 'Stopping..', null, ICON_WALL, COLOR_INFO)
      },
      stopDelete (isPositive = true, text = 'Stop deleting') {
        this.processDelete = false
        addLogs(SOCIAL_VK, text, null, ICON_WALL, isPositive ? COLOR_POSITIVE : COLOR_NEGATIVE)
        isPositive ? Toast.create.positive({ html: text }) : Toast.create.negative({ html: text })
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
            return addLogs(SOCIAL_VK, 'Post: ' + id, 'Not found', ICON_WALL, COLOR_NEGATIVE)
          }
        }

        if (this.posts.indexOf(id) > -1) {
          return addLogs(SOCIAL_VK, 'Post: ' + id, 'Already added', ICON_WALL, COLOR_INFO)
        }

        jsonp('wall.getById', {
          posts: userId + '_' + id
        })
          .then(res => {
            if (res.body.response[0]) {
              this.posts.push(id)
            }
            else {
              addLogs(SOCIAL_VK, 'Post: ' + id, 'Not found', ICON_WALL, COLOR_NEGATIVE)
            }
          })
      },
      goPost (id) {
        window.open('https://vk.com/wall' + this.$store.state.vk.user.id + '_' + id)
      },
      goGroup (id) {
        window.open('https://vk.com/public' + id)
      },
      closePostChip (index) {
        this.posts.splice(index, 1)
      }
    },
    watch: {
      globalFilter () {
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
