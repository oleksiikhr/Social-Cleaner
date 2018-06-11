<template>
  <div id="docs">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <attr-basic-input name="ID сообщества" info="Positive number. Empty - Current User." :model.sync="main.owner_id" />
      <attr-basic-count name="Количество документов (от и до), включительно" :model="main.count" />
      <div class="block__attr">
        <p>Фильтр</p>
        <at-radio-group v-model="main.type">
          <at-radio v-for="type in html.main.types" :key="type.val" :label="type.val" :disabled="process">
            {{ type.name }}
          </at-radio>
        </at-radio-group>
      </div>
    </div>

    <hr>
    <div class="docs-config block">
      <h2>Настройки</h2>
      <attribute-tag :obj="config.fromIds" name="ID авторов документов" :push="pushNumber" :link-tag="getLinkPage"
                 info="After filling, press enter to add to the list. Use a negative value to designate a community ID." />
      <attribute-tag :obj="config.exts" name="Расширения документов" :push="pushString"
                 info="After filling, press enter to add to the list. Without a dot. Example: png, jpg" />
      <attribute-tag :obj="config.texts" name="Фразы в названии" :push="pushString" compare
                 info="After filling, press enter to add to the list." />
      <!--TODO Date-->
    </div>
  </div>
</template>

<script>
import AttrBasicInput from '../attributes/basic/Input'
import AttrBasicCount from '../attributes/basic/Count'
import AttributeTag from '../attributes/Tag'
import VK from '../../networks/VK'

export default {
  components: {
    AttributeTag, AttrBasicInput, AttrBasicCount
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
        main: {
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
    }
  },
  computed: {
    process () {
      return this.$store.state.vk.process
    }
  },
  methods: {
    getLinkPage (id) {
      return VK.getLinkPage(id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
