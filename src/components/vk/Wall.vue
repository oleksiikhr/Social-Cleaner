<template>
  <div id="wall">
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
        <!--FIXME Is Number-->
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
      <div class="block__result" v-if="res.page.response || res.wall.response">
        <config-result :wall="res.wall" :page="res.page" @close="handleResultClose" />
      </div>
    </div>

    <hr>

    <div class="wall-config block">
      <h2>Параметры стены</h2>
      <div class="block__attr">
        <p>ID записей</p>
        <at-input v-model="wall.id" @keyup.enter.native="addConfigWallArrayId('id', 'ids')" />
        <div class="block__attr-inner">
          <at-tag v-for="(id, index) in wall.ids" :key="index" :name="id" closable
                  @on-close="wall.ids.splice(index, 1)">
            <a :href="getLinkPost(id)" target="_blank" rel="noreferrer">{{ id }}</a>
          </at-tag>
        </div>
      </div>
      <div class="block__attr">
        <p>ID автора записи (идентификатор сообщества необходимо указывать со знаком "-")</p>
        <at-input v-model="wall.fromId" @keyup.enter.native="addConfigWallArrayId('fromId', 'fromIds')" />
        <div class="block__attr-inner">
          <at-tag v-for="(id, index) in wall.fromIds" :key="index" :name="id" closable
                  @on-close="wall.fromIds.splice(index, 1)">
            <a :href="getLinkPage(id)" target="_blank" rel="noreferrer">{{ id }}</a>
          </at-tag>
        </div>
      </div>
    </div>

    <!--<hr>-->
    <!--<h2>Параметры комментарий</h2>-->

    <!--TODO Dialog confirmed-->
    <at-button type="error" disabled>Удалить записи</at-button>
  </div>
</template>

<script>
import ConfigResult from './parts/WallConfigResult'
import { ICON_WALL } from '../../heplers/logs'
import { send } from '../../heplers/vk'
import { vk } from '../../config'

export default {
  components: {
    ConfigResult
  },
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
      wall: {
        id: '',
        ids: [], // FIXME Sets()*
        fromId: '',
        fromIds: [] // FIXME Sets()*
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
        fields: 'photo_100'
      }, { icon: ICON_WALL, msg: 'Received User data' })
        .then(res => {
          if (res.data.response) {
            this.res.page = { isUser: true, response: res.data.response[0] }
          }
        })
    },
    fetchGetGroupsById () {
      send('groups.getById', {
        group_ids: this.main.owner_id.substr(1)
      }, { icon: ICON_WALL, msg: 'Received Group data' })
        .then(res => {
          if (res.data.response) {
            this.res.page = { isUser: false, response: res.data.response[0] }
          }
        })
    },

    /* | -----------------------------------------------------------------------------
     * | Main Config
     * | -----------------------------------------------------------------------------
     * |
     */
    checkMainConfig () {
      this.fetchGetWall(1, this.main.count.min)

      if (this.main.owner_id[0] !== '-') {
        this.fetchGetUsersById()
      } else {
        this.fetchGetGroupsById()
      }
    },
    handleResultClose () {
      this.res = {
        wall: {},
        page: {}
      }
    },

    /* | -----------------------------------------------------------------------------
     * | Wall Config
     * | -----------------------------------------------------------------------------
     * |
     */
    addConfigWallArrayId (str, arr) {
      const id = parseInt(this.wall[str])

      if (id) {
        this.wall[arr].push(id)
        this.wall[arr] = Array.from(new Set(this.wall[arr].sort((a, b) => a - b)))
      }

      this.wall[str] = ''
    },

    /* | -----------------------------------------------------------------------------
     * | Other
     * | -----------------------------------------------------------------------------
     * |
     */
    getLinkPost (id) {
      return `${vk.url}/wall${this.main.owner_id}_${id}`
    },
    getLinkPage (id) {
      const strId = id.toString()

      if (strId.charAt(0) === '-') {
        return vk.url + 'public' + strId.slice(1)
      }

      return vk.url + 'id' + id
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
  max-width: 500px;
  margin: 0 auto;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .block__attr {
    margin-bottom: 15px;
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
    margin-top: 20px;
    margin-bottom: 15px;
    > button {
      width: 100%;
    }
  }
}
</style>
