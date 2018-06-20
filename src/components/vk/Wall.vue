<template>
  <!--TODO Translate-->
  <div id="wall">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <attr-input name="ID сообщества" :model.sync="main.owner_id" info="Positive number. Empty - Current User."
                  :process="process" />
      <attr-select name="Фильтр записей" :obj="main.filter" size="large" :process="process" />
      <attr-count name="Количество записей (от и до), включительно" :model="main.count" :process="process" />
      <attr-radio-button name="Удалить записи или очистить комментарии под записями" :obj="main.isDeletePosts"
                         :process="process" />
    </div>

    <div class="wall-config block">
      <h2>Параметры стены</h2>
      <attr-tag :obj="wall.ids" :push="pushNumber" :link-tag="getLinkPost" :process="process"
                 info="After filling, press enter to add to the list." />
      <attr-tag :obj="wall.fromIds" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                 info="After filling, press enter to add to the list. Use a negative value to designate a community ID." />
      <attr-tag :obj="wall.texts" :push="pushString" :process="process" compare
                 info="After filling, press enter to add to the list." />
      <attr-checkbox :obj="wall.attachments" :process="process" compare />
      <attr-indicators :obj="wall.indicators" :process="process" compare />
      <attr-reverse :model.sync="wall.reverse" :process="process" />
      <!--TODO Date-->
    </div>

    <template v-if="main.isDeletePosts.value">
      <div class="comments-config block">
        <h2>Параметры комментарий</h2>
        <!--TODO From_id-->
        <!--TODO Text-->
        <!--TODO Attachments-->
        <!--TODO Date-->
        <!--TODO Count [likes]-->
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
            { name: 'Все', val: 'all' },
            { name: 'Предложенные записи на стене сообщества', val: 'suggests' },
            { name: 'Отложенные записи', val: 'postponed' },
            { name: 'Записи владельца стены', val: 'owner' },
            { name: 'Записи не от владельца стены', val: 'others' }
          ]
        },
        count: {
          min: '1',
          max: '20'
        },
        isDeletePosts: {
          value: 0,
          html: [
            { name: 'Записи', val: 0 },
            { name: 'Комментарии', val: 1 }
          ]
        }
      },
      wall: {
        ids: {
          name: 'ID записей',
          input: '',
          items: [],
          compareAll: false
        },
        fromIds: {
          name: 'ID авторов записей',
          input: '',
          items: [],
          compareAll: false
        },
        texts: {
          name: 'Фразы в тексте',
          input: '',
          items: [],
          compareAll: false
        },
        attachments: {
          name: 'Added media attachments',
          items: [],
          compareAll: true,
          html: [
            { name: 'Photo', val: 'photo' },
            { name: 'Video', val: 'video' },
            { name: 'Audio', val: 'audio' },
            { name: 'Document', val: 'doc' },
            { name: 'Link', val: 'link' },
            { name: 'Note', val: 'note' },
            { name: 'Poll', val: 'poll' },
            { name: 'Wiki Page', val: 'page' },
            { name: 'Photos List', val: 'photos_list' },
            { name: 'Market Item', val: 'market' },
            { name: 'Market Collection', val: 'market_album' }
          ]
        },
        indicators: {
          name: 'Показатели',
          items: [
            { name: 'Comments', icon: 'comment-o', state: 0, count: 0 },
            { name: 'Likes', icon: 'heart-o', state: 0, count: 0 },
            { name: 'Reposts', icon: 'bullhorn', state: 0, count: 0 },
            { name: 'Views', icon: 'eye', state: 0, count: 0 }
          ],
          compareAll: true
        },
        reverse: false
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

      this.result.push({
        name: `id: ${post.id}`,
        link: VK.getLinkWall(this.ownerId, post.id),
        reason: checked.index ? items[checked.index].obj.name : '-',
        result: checked.result ? 'Yes' : 'No'
      })

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
