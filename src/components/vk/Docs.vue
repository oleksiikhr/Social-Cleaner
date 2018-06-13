<template>
  <div id="docs">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <attr-input name="ID сообщества" info="Positive number. Empty - Current User." :model.sync="main.owner_id" />
      <attr-count name="Количество документов (от и до), включительно" :model="main.count" />
      <attr-radio name="Фильтр" :model.sync="main.type" :html="html.types" />
    </div>

    <hr>
    <div class="docs-config block">
      <h2>Настройки</h2>
      <attr-tag :obj="config.fromIds" name="ID авторов документов" :push="pushNumber" :link-tag="getLinkPage"
                 info="After filling, press enter to add to the list. Use a negative value to designate a community ID." />
      <attr-tag :obj="config.exts" name="Расширения документов" :push="pushString"
                 info="After filling, press enter to add to the list. Without a dot. Example: png, jpg" />
      <attr-tag :obj="config.texts" name="Фразы в названии" :push="pushString" compare
                 info="After filling, press enter to add to the list." />
      <!--TODO Date-->
    </div>
  </div>
</template>

<script>
import AttrInput from '../attributes/Input'
import AttrCount from '../attributes/Count'
import AttrRadio from '../attributes/Radio'
import AttrTag from '../attributes/Tag'
import VK from '../../media/VK'

export default {
  components: {
    AttrTag, AttrInput, AttrRadio, AttrCount
  },
  data () {
    return {
      main: {
        owner_id: '',
        count: {
          min: '1',
          max: '20'
        },
        type: 0
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
      },
      html: {
        types: [
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
    }
  },
  computed: {
    user () {
      return this.$store.state.vk.user
    },
    process () {
      return this.$store.state.vk.process
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
      const res = await VK.fetchDocsGet(count, offset, this.main.type, this.ownerId, sleepMin, sleepMax)

      return res
    },
    async fetchDelete (docId, sleepMin = 0, sleepMax = sleepMin) {
      const res = await VK.fetchDocsDelete(docId, this.ownerId, sleepMin, sleepMax)

      return res
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
