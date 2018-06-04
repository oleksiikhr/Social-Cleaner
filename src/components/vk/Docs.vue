<template>
  <div id="docs">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <div class="block__attr">
        <p>ID на группу</p>
        <at-input v-model="main.owner_id" :disabled="del.process" />
        <small>Positive number. Null - Current User.</small>
      </div>
      <div class="block__attr">
        <p>Количество документов (от и до), включительно</p>
        <div class="flex">
          <at-input v-model="main.count.min" :disabled="del.process" placeholder="От" /> -
          <at-input v-model="main.count.max" :disabled="del.process" placeholder="До" />
        </div>
      </div>
      <div class="block__attr">
        <p>Фильтр</p>
        <at-radio-group v-model="main.type">
          <at-radio v-for="type in html.main.types" :key="type.val" :label="type.val" :disabled="del.process">
            {{ type.name }}
          </at-radio>
        </at-radio-group>
      </div>
    </div>

    <hr>
  </div>
</template>

<script>
export default {
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
      del: {
        process: false
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
  methods: {
    // TODO Global method
    getStyleStatus (inner) {
      return 'status status-' + (inner ? 'on' : 'off')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
