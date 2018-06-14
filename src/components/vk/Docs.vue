<template>
  <div id="docs">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <attr-input name="ID сообщества" info="Positive number. Empty - Current User." :model.sync="main.owner_id"
                  :process="process" />
      <attr-count name="Количество документов (от и до), включительно" :model="main.count" :process="process" />
      <attr-radio name="Фильтр" :model.sync="main.type.value" :html="main.type.html" :process="process" />
    </div>

    <hr>
    <div class="docs-config block">
      <h2>Настройки</h2>
      <attr-tag :obj="config.fromIds" name="ID авторов документов" :push="pushNumber" :link-tag="getLinkPage" :process="process"
                 info="Press enter to add to the list. Use a negative value to designate a community ID." />
      <attr-tag :obj="config.exts" name="Расширения документов" :push="pushString" :process="process"
                 info="After filling, press enter to add to the list. Without a dot. Example: png, jpg" />
      <attr-tag :obj="config.texts" name="Фразы в названии" :push="pushString" :process="process" compare
                 info="After filling, press enter to add to the list." />
      <!--TODO Date-->
    </div>

    <hr>
    <attr-action :process="process" canPreview @start="start" @preview="preview" />
  </div>
</template>

<script>
import AttrAction from '../attributes/Action'
import AttrInput from '../attributes/Input'
import AttrCount from '../attributes/Count'
import AttrRadio from '../attributes/Radio'
import AttrTag from '../attributes/Tag'
import VK from '../../media/VK'

export default {
  components: {
    AttrTag, AttrInput, AttrRadio, AttrCount, AttrAction
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
        texts: {
          input: '',
          items: [],
          compareAll: false
        },
        exts: {
          input: '',
          items: [],
          compareAll: false
        },
        fromIds: {
          input: '',
          items: [],
          compareAll: false
        }
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
    }
  },
  methods: {
    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    async fetchGet (count = VK.prototype.COUNT_DOCS, offset = this.main.count.min - 1, sleepMin = 0, sleepMax = sleepMin) {
      const res = await VK.fetchDocsGet(count, offset, this.main.type.value, this.ownerId, sleepMin, sleepMax)

      return res
    },
    async fetchDelete (docId, sleepMin = 0, sleepMax = sleepMin) {
      const res = await VK.fetchDocsDelete(docId, this.ownerId, sleepMin, sleepMax)

      return res
    },

    /* | -----------------------------------------------------------------------------
     * | Start / Stop
     * | -----------------------------------------------------------------------------
     * |
     */
    start () {
      console.log('Start')
      this.$store.commit('START_PROCESS', 'vk')
    },
    preview () {
      console.log('Preview')
      this.$store.commit('STOP_PROCESS', 'vk')
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

<style lang="scss" scoped>

</style>
