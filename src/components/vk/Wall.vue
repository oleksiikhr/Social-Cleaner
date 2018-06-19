<template>
  <!--FIXME Rewritten-->
  <!--TODO Global process-->
  <!--TODO Translate-->
  <!--TODO Documentation for the user-->
  <div id="wall">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <attr-input name="ID сообщества" info="Positive number. Empty - Current User." :model.sync="main.owner_id"
                  :process="process" />
      <attr-select name="Фильтр записей" :html="html.filters" :model.sync="main.filter" size="large" :process="process" />
      <attr-count name="Количество записей (от и до), включительно" :model="main.count" :process="process" />
      <attr-radio-button name="Удалить записи или очистить комментарии под записями" :model.sync="main.isDeletePosts"
                         :process="process" :html="html.deletePosts" />
    </div>

    <hr>
    <div class="wall-config block">
      <h2>Параметры стены</h2>
      <attr-tag :obj="wall.ids" name="ID записей" :push="pushNumber" :link-tag="getLinkPost" :process="process"
                 info="After filling, press enter to add to the list." />
      <attr-tag :obj="wall.fromIds" name="ID авторов записей" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                 info="After filling, press enter to add to the list. Use a negative value to designate a community ID." />
      <attr-tag :obj="wall.texts" name="Фразы в тексте" :push="pushString" :process="process" compare
                 info="After filling, press enter to add to the list." />
      <attr-checkbox :obj="wall.attachments" name="Added media attachments" :process="process" compare />
      <!--TODO Type content-->
      <div class="block__attr">
        <div class="top">
          <p :class="getStyleStatus(isActiveWallCount)">Значения</p>
          <a @click="wall.count.compareAll = !wall.count.compareAll" class="compare">
            {{ wall.count.compareAll ? 'And' : 'Or' }}
          </a>
        </div>
        <div class="counts">
          <div :class="`count-${item.attr} count`" v-for="item in html.count" :key="item.attr">
            <div class="flex">
              <i :class="`fa ${item.icon}`" aria-hidden="true"></i>
              <p>{{ item.name }}</p>
            </div>
            <at-input v-model="wall.count.items[item.attr].count" :disabled="process || wall.count.items[item.attr].state === 0" />
            <at-radio-group v-model="wall.count.items[item.attr].state" :disabled="process">
              <at-radio-button :label="-1">Меньше</at-radio-button>
              <at-radio-button :label="0">Выкл.</at-radio-button>
              <at-radio-button :label="1">Больше</at-radio-button>
            </at-radio-group>
          </div>
        </div>
        <!--TODO Date-->
      </div>
    </div>

    <template v-if="main.isDeletePosts">
      <hr>
      <div class="comments-config block">
        <h2>Параметры комментарий</h2>
        <!--TODO From_id-->
        <!--TODO Text-->
        <!--TODO Attachments-->
        <!--TODO Date-->
        <!--TODO Count [likes]-->
      </div>
    </template>

    <template v-if="!process">
      <hr>
      <div class="block-preview block">
        <at-button v-if="!preview.show" type="info" class="preview-btn" @click="startPreviewPosts()" hollow>
          Проверить список удаляемых записей
        </at-button>
        <template v-else>
          <at-button type="primary" @click="preview.show = false" hollow>Закрыть</at-button>
          <div class="block__result">
            <p>Найдены совпадения:</p>
            <template v-if="preview.loading">
              Загрузка..
            </template>
            <template v-else>
              <at-tag v-for="id in preview.ids" :key="id" :name="id">
                <a :href="getLinkPost(id)" target="_blank" rel="noopener">{{ id }}</a>
              </at-tag>
            </template>
          </div>
        </template>
      </div>
    </template>

    <hr>
    <div class="block-buttons block">
      <!--TODO Dialog deleted posts-->
      <at-button type="error" @click="del.dialog = true" v-if="!process">
        Удалить записи с {{ main.count.min }} по {{ main.count.max }}
      </at-button>
      <!--TODO Rewritten to global stop action (bottom-right panel*)-->
      <at-button type="primary" @click="del.continue = false" v-if="del.continue && process">
        Остановить
      </at-button>

      <at-modal v-model="del.dialog">
        <div slot="header">
          <span>The confirmation</span>
        </div>
        <div style="text-align:center;">
          <p>Are you sure you want to start deleting posts?</p>
        </div>
        <div slot="footer">
          <at-button @click="del.dialog = false">Cancel</at-button>
          <at-button type="error" @click="startDeletePosts()">Run cleanup</at-button>
        </div>
      </at-modal>
    </div>
  </div>
</template>

<script>
import AttrRadioButton from '../attributes/RadioButton'
import AttrCheckbox from '../attributes/Checkbox'
import AttrSelect from '../attributes/Select'
import AttrInput from '../attributes/Input'
import AttrCount from '../attributes/Count'
import AttrTag from '../attributes/Tag'
import VK from '../../media/VK'

const SLEEP_DELETE_MIN = 1500
const SLEEP_DELETE_MAX = 2500

const SLEEP_GET_MIN = 500
const SLEEP_GET_MAX = 1500

export default {
  components: {
    AttrTag, AttrCheckbox, AttrCount, AttrInput, AttrSelect, AttrRadioButton
  },
  data () {
    return {
      main: {
        owner_id: '',
        filter: 'all',
        count: {
          min: '1',
          max: '20'
        },
        isDeletePosts: 0
      },
      wall: {
        ids: {
          input: '',
          items: [],
          compareAll: false
        },
        fromIds: {
          input: '',
          items: [],
          compareAll: false
        },
        texts: {
          input: '',
          items: [],
          compareAll: false
        },
        attachments: {
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
        count: {
          items: {
            comments: {
              state: 0,
              count: 0
            },
            likes: {
              state: 0,
              count: 0
            },
            reposts: {
              state: 0,
              count: 0
            },
            views: {
              state: 0,
              count: 0
            }
          },
          compareAll: true
        }
      },
      del: {
        dialog: false,
        process: false,
        continue: true
      },
      preview: {
        ids: [],
        show: false,
        loading: false
      },
      html: {
        deletePosts: [
          { name: 'Записи', val: 0 },
          { name: 'Комментарии', val: 1 }
        ],
        filters: [
          { name: 'Все', val: 'all' },
          { name: 'Предложенные записи на стене сообщества', val: 'suggests' },
          { name: 'Отложенные записи', val: 'postponed' },
          { name: 'Записи владельца стены', val: 'owner' },
          { name: 'Записи не от владельца стены', val: 'others' }
        ],
        count: [
          { name: 'Comments', attr: 'comments', icon: 'fa-comment-o' },
          { name: 'Likes', attr: 'likes', icon: 'fa-heart-o' },
          { name: 'Reposts', attr: 'reposts', icon: 'fa-bullhorn' },
          { name: 'Views', attr: 'views', icon: 'fa-eye' }
        ]
      }
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
    },
    /**
     * @return boolean
     */
    isActiveWallCount () {
      return Object.keys(this.wall.count.items).some(o => {
        if (this.wall.count.items[o].state !== 0) {
          return true
        }
      })
    }
  },
  methods: {
    /* | -----------------------------------------------------------------------------
     * | Start/Stop action
     * | -----------------------------------------------------------------------------
     * |
     */
    /**
     * @return boolean
     */
    startAction () {
      this.$store.commit('VK_SET_PROCESS')
      this.del.dialog = false

      const min = parseInt(this.main.count.min)
      const max = parseInt(this.main.count.max)

      if (min > 0 && max > 0 && max >= min) {
        this.main.count.min = min.toString()
        this.main.count.max = max.toString()
        return true
      }

      this.stopAction(false)
      this.$Modal.alert({ title: 'Ошибка', content: 'Проверьте диапазон удаляемых постов в основных настройках' })
      return false
    },
    /**
     * @return void
     */
    stopAction (isSuccess = true, hidePreview = false) {
      if (isSuccess) {
        this.$Message.success('Action stopped')
      } else {
        this.$Message.error('Action stopped')
      }
      if (hidePreview) {
        this.preview.show = false
      }
      this.preview.loading = false
      this.del.continue = true
      this.$store.commit('VK_SET_PROCESS', false)
    },

    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    async fetchGetWall (count = VK.prototype.COUNT_WALL, offset = this.main.count.min - 1) {
      const res = await VK.fetchWallGet(
        this.ownerId,
        this.main.filter,
        count,
        offset,
        SLEEP_GET_MIN,
        SLEEP_GET_MAX
      )

      return res
    },
    async fetchDeletePost (id) {
      const res = await VK.fetchWallDelete(id, this.ownerId, SLEEP_DELETE_MIN, SLEEP_DELETE_MAX)

      return res
    },

    /* | -----------------------------------------------------------------------------
     * | Start posts/preview/comments
     * | -----------------------------------------------------------------------------
     * |
     */
    async startDeletePosts () {
      if (!this.startAction()) {
        return
      }

      for (let i = 0; i < this.getCountLoop(this.main.count, VK.prototype.COUNT_WALL); i++) {
        const count = this.getCountDeleteItems(this.main.count)
        const res = await this.fetchGetWall(count > VK.prototype.COUNT_WALL ? VK.prototype.COUNT_WALL : count)

        if (res.ok && res.body.response) {
          const len = res.body.response.items.length
          for (let j = 0; j < len; j++) {
            // If user click the stop button
            if (!this.del.continue) {
              return this.stopAction(true, true)
            }

            const post = res.body.response.items[j]

            // If can't delete post - show modal and stopDelete
            if (typeof post.can_delete === 'undefined' || !post.can_delete) {
              this.$Modal.error({ title: 'Access to wall\'s post denied', content: 'Error code: 210' })
              return this.stopAction(false)
            }

            // If equal
            if (this.checkWallConfiguration(post)) {
              const resDelete = await this.fetchDeletePost(post.id)

              if (resDelete.ok && resDelete.body.response) {
                this.main.count.max--
              }
              continue
            }

            this.main.count.min++
          }
        } else {
          return this.stopAction(res.ok && typeof res.body.error === 'undefined', true)
        }
      }

      this.stopAction(true, true)
    },
    async startPreviewPosts () {
      if (!this.startAction()) {
        return
      }

      this.preview.loading = true
      this.preview.show = true
      this.preview.ids = []

      for (let i = 0; i < this.getCountLoop(this.main.count, VK.prototype.COUNT_WALL); i++) {
        // If user click the stop button
        if (!this.del.continue) {
          return this.stopAction()
        }

        const offset = i * VK.prototype.COUNT_WALL
        const res = await this.fetchGetWall(this.getCountDeleteItems(this.main.count) - offset, offset)

        if (res.ok && res.body.response && res.body.response.items.length) {
          res.body.response.items.forEach(post => {
            if (this.checkWallConfiguration(post)) {
              this.preview.ids.push(post.id)
            }
          })
        } else {
          this.stopAction(!!res.ok)
          return
        }
      }

      this.stopAction()
    },
    // TODO Start delete comments
    // TODO Preview comments*

    /* | -----------------------------------------------------------------------------
     * | Check posts
     * | -----------------------------------------------------------------------------
     * |
     * | null - config is off
     * | true - matches found
     * | false - no matches found
     * |
     * | todo checkCommentsConfiguration
     */
    checkWallConfiguration (post) {
      const items = [
        this.checkWallNumber('ids', post.id),
        this.checkWallNumber('fromIds', post.from_id),
        this.checkWallTexts(post.text),
        this.checkWallAttachments(post.attachments),
        this.checkWallCounts(post)
        // TODO Date
      ]

      for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item === null) {
          continue
        }

        if (!item) {
          return false
        }
      }

      return true
    },
    checkWallNumber (attr, val) {
      const compareAll = this.wall[attr].compareAll
      const items = this.wall[attr].items
      const len = items.length

      if (!len) {
        return null
      }

      if (compareAll) {
        for (let i = 0; i < items; i++) {
          if (items[i] !== val) {
            return false
          }
        }
        return true
      }

      return items.includes(val)
    },
    checkWallTexts (postText) {
      const compareAll = this.wall.texts.compareAll
      const items = this.wall.texts.items
      const len = items.length

      if (!len) {
        return null
      }

      postText = postText.toLowerCase().trim()

      for (let i = 0; i < len; i++) {
        const isFind = postText.indexOf(items[i]) !== -1

        if (compareAll && !isFind) {
          return false
        }
        if (!compareAll && isFind) {
          return true
        }
      }

      return compareAll
    },
    checkWallAttachments (postAttachments) {
      const compareAll = this.wall.attachments.compareAll
      const items = this.wall.attachments.items
      const len = items.length

      if (!len) {
        return null
      }

      if (typeof postAttachments === 'undefined') {
        return false
      }

      postAttachments = postAttachments.map(attachment => {
        return attachment.type
      })

      for (let i = 0; i < len; i++) {
        const include = postAttachments.includes(items[i])

        if (compareAll && !include) {
          return false
        }
        if (!compareAll && include) {
          return true
        }
      }

      return compareAll
    },
    checkWallCounts (post) {
      if (!this.isActiveWallCount) {
        return null
      }

      const compareAll = this.wall.count.compareAll
      const results = Object.keys(this.wall.count.items).map(attr => {
        return this.checkWallCountAttr(post, attr)
      })

      for (let i = 0; i < results.length; i++) {
        if (results[i] === null) {
          continue
        }
        if (compareAll && !results[i]) {
          return false
        }
        if (!compareAll && results[i]) {
          return true
        }
      }

      return compareAll
    },
    checkWallCountAttr (post, attr) {
      if (typeof post[attr] === 'undefined') {
        return false
      }

      const state = this.wall.count.items[attr].state

      if (state === 0) {
        return null
      }

      const count = parseInt(this.wall.count.items[attr].count)
      const postCount = post[attr].count

      switch (state) {
        case -1:
          return postCount < count
        case 1:
          return postCount > count
        default:
          return false
      }
    },

    /* | -----------------------------------------------------------------------------
     * | Links
     * | -----------------------------------------------------------------------------
     * |
     */
    getLinkPost (id) {
      return VK.getLinkWall({ from_id: this.ownerId, id: id })
    },
    getLinkPage (id) {
      return VK.getLinkPage(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.block-buttons {
  > button {
    width: 100%;
  }
}

.block-preview {
  text-align: center;
  > button {
    width: 100%;
  }
  .block__result {
    text-align: left;
    > p {
      font-weight: bold;
      margin: 10px 0;
    }
    > .at-tag {
      margin: 2px;
    }
  }
}
</style>
