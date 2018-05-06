<template>
  <div id="wall">
    <p>Wall</p>
    {{ res.wall }}
    <p>Page</p>
    {{ res.page }}

    <!--TODO Button for refresh-->

    <hr>
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <div class="block__attr">
        <p>ID или ссылка на страницу/группу</p>
        <at-input v-model="main.owner" @blur="blurOwner" />
      </div>
      <div class="block__attr">
        <p>Фильтр записей</p>
        <at-select v-model="main.filter">
          <at-option value="suggests">Предложенные записи на стене сообщества</at-option>
          <at-option value="postponed">Отложенные записи</at-option>
          <at-option value="owner">Записи владельца стены</at-option>
          <at-option value="others">Записи не от владельца стены</at-option>
          <at-option value="all">Все</at-option>
        </at-select>
      </div>
      <div class="block__attr">
        <p>Количество записей (от и до)</p>
        <div class="flex">
          <at-input v-model="main.count.min" placeholder="От" /> -
          <at-input v-model="main.count.max" placeholder="До" />
        </div>
      </div>
      <div class="block__attr">
        <p>Удалить записи или очистить комментарии</p>
        <at-radio-group v-model="main.isDeletePosts">
          <at-radio-button :label="true">Записи</at-radio-button>
          <at-radio-button :label="false">Комментарии</at-radio-button>
        </at-radio-group>
      </div>
      <div class="block__btn">
        <at-button type="primary" hollow>Проверить группу</at-button>
      </div>
    </div>

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
import { ICON_WALL } from '../../heplers/logs'
import { send } from '../../heplers/vk'

export default {
  data () {
    return {
      main: {
        owner: '',
        filter: 'all',
        count: {},
        isDeletePosts: true
      },
      res: {
        wall: {},
        page: {}
      }
    }
  },
  mounted () {
    this.main.owner = this.user.id
    // this.fetchGet(0)
    // this.fetchGetUsersById(this.user.id)
  },
  computed: {
    user () {
      return this.$store.state.vk.user
    },
    mainFilter () {
      return this.main.filter
    }
  },
  methods: {
    // FIXME Delete. Temporary
    fetchGet (count = 50, offset = 0) {
      send('wall.get', {
        owner_id: this.main.owner,
        filter: this.main.filter,
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
      console.log(this.main.owner)
      // this.fetchGetUsersById(this.owner, 'photo_50')
      // this.fetchGetGroupsById(this.owner)
    }
  },
  watch: {
    mainFilter () {
      // this.fetchGet(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .block__attr {
    max-width: 500px;
    margin: 0 auto 15px;
    > p {
      font-weight: bold;
      margin-bottom: 15px;
    }
    .flex {
      align-items: center;
      > .at-input {
        margin: 0 10px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .block__btn {
    max-width: 500px;
    margin: 20px auto;
    > button {
      width: 100%;
    }
  }
}
</style>
