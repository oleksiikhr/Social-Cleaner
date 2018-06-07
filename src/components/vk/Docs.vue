<template>
  <div id="docs">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <div class="block__attr">
        <p>ID сообщества.</p>
        <at-input v-model="main.owner_id" :disabled="process" />
        <small>Positive number. Default - Current User.</small>
      </div>
      <div class="block__attr">
        <p>Количество документов (от и до), включительно</p>
        <div class="flex">
          <at-input v-model="main.count.min" :disabled="process" placeholder="От" /> -
          <at-input v-model="main.count.max" :disabled="process" placeholder="До" />
        </div>
      </div>
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
      <attribute :obj="config.fromIds" name="ID авторов документов" :push="pushNumber" :link-tag="getLinkPage"
                 info="After filling, press enter to add to the list. Use a negative value to designate a community ID." />
      <attribute :obj="config.exts" name="Расширения документов" :push="pushString"
                 info="After filling, press enter to add to the list. Without a dot. Example: png, jpg" />
      <attribute :obj="config.texts" name="Фразы в названии" :push="pushString" compare
                 info="After filling, press enter to add to the list." />
      <!--TODO Date-->
    </div>
  </div>
</template>

<script>
import Attribute from '../block/Attribute'
import VK from '../../networks/VK'

export default {
  components: {
    Attribute
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
