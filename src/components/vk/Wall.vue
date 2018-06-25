<template>
  <div id="wall">
    <div class="main-config block">
      <h2>{{ $t('vk.wall.main_config.h2') }}</h2>
      <attr-input name="vk.wall.main_config.owner_id.name" :model.sync="main.owner_id" :process="process"
                  info="vk.wall.main_config.owner_id.info" />
      <attr-select name="vk.wall.main_config.filter.name" :html="main.filter.html" :obj="main.filter" size="large"
                   :process="process" />
      <attr-count name="vk.wall.main_config.count.name" :model="main.count" :process="process" />
      <attr-radio-button name="vk.wall.main_config.is_delete_posts.name" :obj="main.isDeletePosts"
                         :process="process" />
    </div>

    <div class="wall-config block">
      <h2>{{ $t('vk.wall.wall_config.h2') }}</h2>
      <attr-tag :obj="wall.ids" :push="pushNumber" :link-tag="getLinkPost" :process="process" />
      <attr-tag :obj="wall.fromIds" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                info="vk.wall.wall_config.from_ids.info" />
      <attr-tag :obj="wall.texts" :push="pushString" :process="process" compare />
      <attr-checkbox :obj="wall.attachments" :html="html.attachments" :process="process" compare />
      <attr-indicators :obj="wall.indicators" :process="process" compare />
      <attr-reverse :model.sync="wall.reverse" :process="process" />
      <!--TODO Date-->
    </div>

    <template v-if="main.isDeletePosts.value">
      <div class="comments-config block">
        <h2>{{ $t('vk.wall.comments_config.h2') }}</h2>
        <attr-tag :obj="comments.fromIds" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                  info="vk.wall.comments_config.from_ids.info" />
        <attr-tag :obj="comments.texts" :push="pushString" :process="process" />
        <attr-checkbox :obj="comments.attachments" :html="html.attachments" :process="process" compare />
        <attr-indicators :obj="comments.indicators" :process="process" compare />
        <attr-reverse :model.sync="comments.reverse" :process="process" />
        <!--TODO Date-->
      </div>
    </template>

    <attr-action :process="process" :loading="loading" canPreview @start="doStart" @preview="doPreview" />
    <attr-result :data="result" />
  </div>
</template>

<script>
import AttrRadioButton from '../attributes/RadioButton'
import AttrIndicators from '../attributes/Indicators'
import AttrCheckbox from '../attributes/Checkbox'
import AttrReverse from '../attributes/Reverse'
import AttrResult from '../attributes/Result'
import AttrAction from '../attributes/Action'
import AttrSelect from '../attributes/Select'
import AttrInput from '../attributes/Input'
import AttrCount from '../attributes/Count'
import AttrTag from '../attributes/Tag'
import VK from '../../media/VK'

const SLEEP_DELETE_MIN = 1500
const SLEEP_DELETE_MAX = 2500

const SLEEP_GET_MIN = 500
const SLEEP_GET_MAX = 1500

const MAX_COUNT_API = VK.prototype.COUNT_WALL

export default {
  components: {
    AttrTag, AttrCheckbox, AttrCount, AttrInput, AttrSelect, AttrRadioButton, AttrIndicators, AttrReverse, AttrResult, AttrAction
  },
  data () {
    return {
      main: {
        owner_id: '',
        filter: {
          value: 'all',
          html: [
            { name: 'vk.wall.main_config.filter.items[0]', val: 'all' },
            { name: 'vk.wall.main_config.filter.items[1]', val: 'suggests' },
            { name: 'vk.wall.main_config.filter.items[2]', val: 'postponed' },
            { name: 'vk.wall.main_config.filter.items[3]', val: 'owner' },
            { name: 'vk.wall.main_config.filter.items[4]', val: 'others' }
          ]
        },
        count: {
          min: '1',
          max: '20'
        },
        isDeletePosts: {
          value: 0,
          html: [
            { name: 'vk.wall.main_config.is_delete_posts.items[0]', val: 0 },
            { name: 'vk.wall.main_config.is_delete_posts.items[1]', val: 1 }
          ]
        }
      },
      wall: {
        ids: {
          name: 'vk.wall.wall_config.ids.name',
          input: '',
          items: [],
          compareAll: false
        },
        fromIds: {
          name: 'vk.wall.wall_config.from_ids.name',
          input: '',
          items: [],
          compareAll: false
        },
        texts: {
          name: 'vk.wall.wall_config.texts.name',
          input: '',
          items: [],
          compareAll: false
        },
        attachments: {
          name: 'vk.wall.wall_config.attachments.name',
          items: [],
          compareAll: true
        },
        indicators: {
          name: 'vk.wall.wall_config.indicators.name',
          items: [
            { name: 'vk.wall.wall_config.indicators.items[0]', icon: 'comment-o', state: 0, count: 0 },
            { name: 'vk.wall.wall_config.indicators.items[1]', icon: 'heart-o', state: 0, count: 0 },
            { name: 'vk.wall.wall_config.indicators.items[2]', icon: 'bullhorn', state: 0, count: 0 },
            { name: 'vk.wall.wall_config.indicators.items[3]', icon: 'eye', state: 0, count: 0 }
          ],
          compareAll: true
        },
        reverse: false
      },
      comments: {
        fromIds: {
          name: 'vk.wall.comments_config.from_ids.name',
          input: '',
          items: [],
          compareAll: false
        },
        texts: {
          name: 'vk.wall.comments_config.texts.name',
          input: '',
          items: [],
          compareAll: false
        },
        attachments: {
          name: 'vk.wall.comments_config.attachments.name',
          items: [],
          compareAll: true
        },
        indicators: {
          name: 'vk.wall.comments_config.indicators.name',
          items: [{
            name: 'vk.wall.comments_config.indicators.items[0]',
            icon: 'heart-o',
            state: 0,
            count: 0
          }],
          compareAll: false
        },
        reverse: false
      },
      html: {
        attachments: [
          { name: 'vk.wall.html.attachments[0]', val: 'photo' },
          { name: 'vk.wall.html.attachments[1]', val: 'video' },
          { name: 'vk.wall.html.attachments[2]', val: 'audio' },
          { name: 'vk.wall.html.attachments[3]', val: 'doc' },
          { name: 'vk.wall.html.attachments[4]', val: 'link' },
          { name: 'vk.wall.html.attachments[5]', val: 'note' },
          { name: 'vk.wall.html.attachments[6]', val: 'poll' },
          { name: 'vk.wall.html.attachments[7]', val: 'page' },
          { name: 'vk.wall.html.attachments[8]', val: 'photos_list' },
          { name: 'vk.wall.html.attachments[9]', val: 'market' },
          { name: 'vk.wall.html.attachments[10]', val: 'market_album' }
        ]
      },
      result: [],
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.media.vk.user
    },
    process () {
      return this.$store.state.media.vk.process
    },
    ownerId () {
      return this.main.owner_id ? '-' + this.main.owner_id : this.user.id
    }
  },
  methods: {
    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    async fetchGetWall (count = VK.prototype.COUNT_WALL, offset = this.main.count.min - 1) {
      const res = await VK.fetchWallGet(
        this.ownerId,
        this.main.filter.value,
        count,
        offset,
        SLEEP_GET_MIN,
        SLEEP_GET_MAX
      )

      return res
    },
    async fetchDeleteWall (id) {
      const res = await VK.fetchWallDelete(id, this.ownerId, SLEEP_DELETE_MIN, SLEEP_DELETE_MAX)

      return res
    },

    /* | -----------------------------------------------------------------------------
     * | Start/Stop action
     * | -----------------------------------------------------------------------------
     * |
     */
    // TODO Start delete comments
    // TODO Preview comments*
    async doStart () {
      if (!this.start()) {
        return this.stop()
      }

      const countLoop = this.getCountLoop(this.main.count, MAX_COUNT_API)

      for (let i = 0; i < countLoop; i++) {
        const res = await this.fetchGetWall(this.getMaxCountItems(this.main.count, MAX_COUNT_API))

        if (res.ok && res.body.response) {
          const len = res.body.response.items.length
          for (let j = 0; j < len; j++) {
            // Check if the user clicked on the stop.
            if (this.cancel) {
              return this.stop()
            }

            const post = res.body.response.items[j]

            if (this.check(post)) {
              const resDelete = await this.fetchDeleteWall(post.id)
              if (resDelete.ok && resDelete.body.response) {
                this.main.count.max--
              }
            } else {
              this.main.count.min++
            }
          }
        } else {
          return this.stop()
        }
      }

      this.stop()
    },
    async doPreview () {
      if (!this.start()) {
        return this.stop()
      }

      const countLoop = this.getCountLoop(this.main.count, MAX_COUNT_API)

      for (let i = 0; i < countLoop; i++) {
        // Check if the user clicked on the stop.
        if (this.cancel) {
          return this.stop()
        }

        const offset = i * MAX_COUNT_API
        const leftItems = this.main.count.max - offset

        const res = await this.fetchGetWall(leftItems > MAX_COUNT_API ? MAX_COUNT_API : leftItems, offset)

        if (res.ok && res.body.response && res.body.response.items.length) {
          res.body.response.items.forEach(post => this.check(post))
        } else {
          return this.stop()
        }
      }

      this.stop()
    },
    start () {
      this.$store.commit('START_PROCESS', 'vk')
      this.loading = true
      this.result = []

      return this.checkStart(this.main.count)
    },
    stop () {
      this.$store.commit('STOP_PROCESS', 'vk')
      this.$store.commit('CLEAR_CANCEL', 'vk')
      this.loading = false
    },

    /* | -----------------------------------------------------------------------------
     * | Check
     * | -----------------------------------------------------------------------------
     * |
     */
    check (post) {
      const attachments = typeof post.attachments === 'undefined' ? undefined : post.attachments.map(attachment => {
        return attachment.type
      })

      // Views undefined in old posts
      const indicators = [
        typeof post.comments === 'undefined' ? undefined : post.comments.count,
        typeof post.likes === 'undefined' ? undefined : post.likes.count,
        typeof post.reposts === 'undefined' ? undefined : post.reposts.count,
        typeof post.views === 'undefined' ? undefined : post.views.count
      ]

      const items = [
        { obj: this.wall.ids, method: this.checkNumber, param: post.id },
        { obj: this.wall.fromIds, method: this.checkNumber, param: post.from_id },
        { obj: this.wall.texts, method: this.checkText, param: post.text },
        { obj: this.wall.attachments, method: this.checkCheckbox, param: attachments },
        { obj: this.wall.indicators, method: this.checkIndicators, param: indicators }
      ]

      const checked = this.checkFinal(items, this.wall.reverse)

      this.pushResult(this.result, `ID: ${post.id}`, VK.getLinkWall(this.ownerId, post.id), items, checked)

      return checked.result
    },

    /* | -----------------------------------------------------------------------------
     * | Links
     * | -----------------------------------------------------------------------------
     * |
     */
    getLinkPost (id) {
      return VK.getLinkWall(this.ownerId, id)
    },
    getLinkPage (id) {
      return VK.getLinkPage(id)
    }
  }
}
</script>
