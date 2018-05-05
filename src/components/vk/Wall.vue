<template>
  <div id="wall">
    {{ res }}

    <hr>
    <h2>Основные настройки</h2>

    <p>ID или ссылка на страницу [группу]</p>
    <at-input v-model="owner" />

    <p>Фильтр записей</p>
    <at-select v-model="filter" clearable size="large">
      <at-option value="suggests">Предложенные записи на стене сообщества</at-option>
      <at-option value="postponed">Отложенные записи</at-option>
      <at-option value="owner">Записи владельца стены</at-option>
      <at-option value="others">Записи не от владельца стены</at-option>
      <at-option value="all">Все</at-option>
    </at-select>

    <!--<hr>-->
    <!--<h2>Параметры стены</h2>-->

    <!--<hr>-->
    <!--<h2>Параметры комментарий</h2>-->

    <hr>
    <!--TODO Dialog confirmed-->
    <at-button type="primary">Удалить записи</at-button>
  </div>
</template>

<script>
import { send } from '../../heplers/vk'
import { ICON_WALL } from '../../heplers/logs'

export default {
  data () {
    return {
      owner: '',
      filter: 'all',
      res: ''
    }
  },
  mounted () {
    this.owner = this.user.id
    this.fetchGet(0)
  },
  computed: {
    user () {
      return this.$store.state.vk.user
    }
  },
  methods: {
    // FIXME Delete. Temporary
    fetchGet (count = 50, offset = 0) {
      send('wall.get', {
        owner_id: this.owner,
        filter: this.filter,
        count: count,
        offset: offset
      }, { icon: ICON_WALL, msg: 'Received Wall data' })
        .then(res => {
          this.res = res.data
        })
    }
  }
}
</script>
