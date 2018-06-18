<template>
  <div id="docs">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <attr-input name="ID сообщества" info="Positive number. Empty - Current User." :model.sync="main.owner_id"
                  :process="process" />
      <attr-count name="Количество документов (от и до), включительно" :model="main.count" :process="process" />
      <attr-radio name="Фильтр" :model.sync="main.type.value" :html="main.type.html" :process="process" />
    </div>

    <div class="docs-config block">
      <h2>Настройки</h2>
      <attr-tag :obj="config.fromIds" :name="config.fromIds.name" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                 info="Press enter to add to the list. Use a negative value to designate a community ID." />
      <attr-tag :obj="config.exts" :name="config.exts.name" :push="pushString" :process="process"
                info="After filling, press enter to add to the list. Without a dot. Example: png, jpg" />
      <attr-tag :obj="config.texts" :name="config.texts.name" :push="pushString" :process="process" compare
                info="After filling, press enter to add to the list." />
      <attr-reverse :model.sync="config.reverse" :process="process" />
      <!--TODO Date-->
      <!--TODO Count Size-->
    </div>

    <attr-action :process="process" :loading="loading" canPreview @start="doStart" @preview="doPreview" />
    <attr-result :data="result" />
  </div>
</template>

<script>
import AttrReverse from '../attributes/Reverse'
import AttrResult from '../attributes/Result'
import AttrAction from '../attributes/Action'
import AttrInput from '../attributes/Input'
import AttrCount from '../attributes/Count'
import AttrRadio from '../attributes/Radio'
import AttrTag from '../attributes/Tag'
import VK from '../../media/VK'

const SLEEP_GET_MIN = 500
const SLEEP_GET_MAX = 1500

const SLEEP_DELETE_MIN = 1500
const SLEEP_DELETE_MAX = 2500

export default {
  components: {
  },
  data () {
    return {
      main: {
        owner_id: '',
        count: {
          min: '1',
          max: '20'
        },
        type: {
          value: 0,
          html: [
            { name: 'Все', val: 0 },
            { name: 'Текстовые документы', val: 1 },
            { name: 'Архивы', val: 2 },
            { name: 'Gif', val: 3 },
            { name: 'Изображения', val: 4 },
            { name: 'Аудио', val: 5 },
            { name: 'Видео', val: 6 },
            { name: 'Электронные книги', val: 7 },
            { name: 'Неизвестно', val: 8 }
          ]
        }
      },
      config: {
        fromIds: {
          name: 'ID авторов',
          input: '',
          items: [],
          compareAll: false
        },
        exts: {
          name: 'Расширения документов',
          input: '',
          items: [],
          compareAll: false
        },
        texts: {
          name: 'Фразы в названии',
          input: '',
          items: [],
          compareAll: false
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
    cancel () {
      return this.$store.state.media.vk.cancel
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
    async fetchGet (count = VK.prototype.COUNT_DOCS, offset = this.main.count.min - 1) {
      const res = await VK.fetchDocsGet(count, offset, this.main.type.value, this.ownerId, SLEEP_GET_MIN, SLEEP_GET_MAX)

      return res
    },
    async fetchDelete (docId) {
      const res = await VK.fetchDocsDelete(docId, this.ownerId, SLEEP_DELETE_MIN, SLEEP_DELETE_MAX)

      return res
    },

    /* | -----------------------------------------------------------------------------
     * | Start / Stop
     * | -----------------------------------------------------------------------------
     * |
     */
    async doStart () {
      if (!this.start()) {
        return
      }

      for (let i = 0; i < this.getCountLoop(this.main.count, VK.prototype.COUNT_DOCS); i++) {
        const count = this.getCountDeleteItems(this.main.count)
        const res = await this.fetchGet(count > VK.prototype.COUNT_DOCS ? VK.prototype.COUNT_DOCS : count)

        if (res.ok && res.body.response) {
          const len = res.body.response.items.length
          for (let j = 0; j < len; j++) {
            if (this.cancel) {
              return this.stop()
            }

            const doc = res.body.response.items[j]

            if (this.check(doc)) {
              const resDelete = await this.fetchDelete(doc.id)
              if (resDelete.ok && resDelete.body.response) {
                this.main.count.max--
              }
            } else {
              this.main.count.min++
            }
          }
        } else {
          this.stop()
        }
      }

      this.stop()
    },
    async doPreview () {
      if (!this.start()) {
        return
      }

      for (let i = 0; i < this.getCountLoop(this.main.count, VK.prototype.COUNT_DOCS); i++) {
        // Check if the user clicked on the stop.
        if (this.cancel) {
          return this.stop()
        }

        const offset = i * VK.prototype.COUNT_WALL
        const res = await this.fetchGet(this.getCountDeleteItems(this.main.count) - offset, offset)

        if (res.ok && res.body.response && res.body.response.items.length) {
          res.body.response.items.forEach(doc => {
            this.check(doc)
          })
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

      if (this.checkStart(this.main.count)) {
        return true
      }

      this.stop()
      return false
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
    check (doc) {
      const items = [
        { obj: this.config.fromIds, method: this.checkNumber, param: doc.owner_id },
        { obj: this.config.exts, method: this.checkTextFull, param: doc.ext },
        { obj: this.config.texts, method: this.checkText, param: doc.title }
      ]

      const checked = this.checkFinal(items, this.config.reverse)

      this.result.push({
        name: doc.title,
        link: VK.getLinkDoc(doc.id, this.ownerId),
        reason: checked.index ? items[checked.index].obj.name : null,
        result: checked.result ? 'Yes' : 'No'
      })

      return checked.result
    },

    /* | -----------------------------------------------------------------------------
     * | Links
     * | -----------------------------------------------------------------------------
     * |
     */
    getLinkPage (id) {
      return VK.getLinkPage(id)
    }
  }
}
</script>
