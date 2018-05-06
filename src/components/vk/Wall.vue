<template>
  <div id="wall">
    <p>Wall</p>
    {{ res.wall }}
    <p>Page</p>
    {{ res.page }}

    <hr>
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <div class="block__attr">
        <p>ID на страницу или группу (идентификатор сообщества необходимо указывать со знаком "-")</p>
        <at-input v-model="main.owner_id" />
      </div>
      <div class="block__attr">
        <p>Фильтр записей</p>
        <at-select v-model="main.filter" size="large">
          <at-option value="suggests">Предложенные записи на стене сообщества</at-option>
          <at-option value="postponed">Отложенные записи</at-option>
          <at-option value="owner">Записи владельца стены</at-option>
          <at-option value="others">Записи не от владельца стены</at-option>
          <at-option value="all">Все</at-option>
        </at-select>
      </div>
      <div class="block__attr">
        <p>Количество записей (от и до), включительно</p>
        <div class="flex">
          <at-input v-model="main.count.min" placeholder="От" /> -
          <at-input v-model="main.count.max" placeholder="До" />
        </div>
      </div>
      <div class="block__attr">
        <p>Удалить записи или очистить комментарии</p>
        <at-radio-group v-model="main.isDeletePosts">
          <at-radio-button :label="0">Записи</at-radio-button>
          <at-radio-button :label="1" disabled>Комментарии</at-radio-button>
        </at-radio-group>
      </div>
      <div class="block__btn">
        <at-button type="primary" @click="checkMainConfig()" hollow>Проверить настройки</at-button>
      </div>
      <div class="block__result" v-if="res.page.id">
        <at-button type="warning" @click="res.page = {}" hollow>Close</at-button>
        <!--TODO Button Close - clean res.page-->
        Result
      </div>
    </div>

    <!--<hr>-->
    <!--<h2>Параметры стены</h2>-->

    <!--<hr>-->
    <!--<h2>Параметры комментарий</h2>-->

    <hr>
    <!--TODO Dialog confirmed-->
    <at-button type="error">Удалить записи</at-button>
  </div>
</template>

<script>
import { ICON_WALL } from '../../heplers/logs'
import { send } from '../../heplers/vk'

export default {
  data () {
    return {
      main: {
        owner_id: '',
        filter: 'all',
        count: {
          min: 1,
          max: null
        },
        isDeletePosts: 0
      },
      res: {
        wall: {},
        page: {}
      }
    }
  },
  mounted () {
    this.main.owner_id = this.user.id
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
    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    fetchGetWall (count = 50, offset = 0) {
      send('wall.get', {
        owner_id: this.main.owner_id,
        filter: this.main.filter,
        count: count,
        offset: offset
      }, { icon: ICON_WALL, msg: 'Received Wall data' })
        .then(res => {
          this.res.wall = res.data
        })
    },
    fetchGetUsersById () {
      send('users.get', {
        user_ids: this.main.owner_id,
        fields: 'photo_50'
      }, { icon: ICON_WALL, msg: 'Received User data' })
        .then(res => {
          if (res.data.response) {
            this.res.page = { isUser: true, response: res.data.response }
          }
        })
    },
    fetchGetGroupsById () {
      send('groups.getById', {
        group_ids: this.main.owner_id.substr(1)
      }, { icon: ICON_WALL, msg: 'Received Group data' })
        .then(res => {
          if (res.data.response) {
            this.res.page = { isUser: false, response: res.data.response }
          }
        })
    },

    /* | -----------------------------------------------------------------------------
     * | Main Config
     * | -----------------------------------------------------------------------------
     * |
     */
    checkMainConfig () {
      this.fetchGetWall(1)

      if (this.main.owner_id[0] !== '-') {
        this.fetchGetUsersById()
      } else {
        this.fetchGetGroupsById()
      }
    }
  },
  watch: {
    mainFilter () {
      // this.fetchGetWall(0)
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
