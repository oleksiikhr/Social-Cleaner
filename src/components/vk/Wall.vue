<template>
  <div id="wall">
    <p>Wall</p>
    {{ res.wall }}
    <p>Page</p>
    {{ res.page }}

    <!--TODO Button for refresh-->

    <hr>
    <h2>Основные настройки</h2>

    <p>ID или ссылка на страницу/группу</p>
    <at-input v-model="owner" @blur="blurOwner" />

    <p>Фильтр записей</p>
    <at-select v-model="filter" clearable>
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
      res: {
        wall: {},
        page: {}
      }
    }
  },
  mounted () {
    this.owner = this.user.id
    // this.fetchGet(0)
    // this.fetchGetUsersById(this.user.id)
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
          this.res.wall = res.data
        })
    },
    fetchGetGroupsById (id) {
      send('groups.getById', {
        group_ids: id
      }, { icon: ICON_WALL, msg: 'Received Group data' })
        .then(res => {
          this.res.page = res.data
        })
    },
    fetchGetUsersById (id, fields = 'photo_50') {
      send('users.get', {
        user_ids: id,
        fields: fields
      }, { icon: ICON_WALL, msg: 'Received User data' })
        .then(res => {
          this.res.page = res.data
        })
    },
    blurOwner () {
      // TODO Parse owner
      console.log(this.owner)
      // this.fetchGetUsersById(this.owner, 'photo_50')
      // this.fetchGetGroupsById(this.owner)
    }
  },
  watch: {
    filter () {
      // this.fetchGet(0)
    }
  }
}
</script>
