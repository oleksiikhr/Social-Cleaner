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
      <config-result :main-config="main" />
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
        <p>ID авторов записей (идентификатор сообщества необходимо указывать со знаком "-")</p>
        <at-input v-model="wall.fromId" @keyup.enter.native="addConfigWallArrayId('fromId', 'fromIds')" />
        <div class="block__attr-inner">
          <at-tag v-for="(id, index) in wall.fromIds" :key="index" :name="id" closable
                  @on-close="wall.fromIds.splice(index, 1)">
            <a :href="getLinkPage(id)" target="_blank" rel="noreferrer">{{ id }}</a>
          </at-tag>
        </div>
      </div>
      <!-- TODO Date -->
      <!-- TODO Text -->
      <!-- TODO Attachments https://vk.com/dev/objects/attachments_w -->
      <!-- TODO Count [comments, likes, reposts, views] -->
    </div>

    <template v-if="main.isDeletePosts">
      <hr>
      <div class="comments-config block">
        <h2>Параметры комментарий</h2>
        <!--TODO From_id-->
        <!--TODO Date-->
        <!--TODO Text-->
        <!--TODO Attachments-->
        <!--TODO Count [likes]-->
      </div>
    </template>

    <!--TODO Dialog confirmed-->
    <hr>
    <div class="footer block">
      <at-button type="error" @click="dialogDelete = true">Удалить записи</at-button>
      <at-modal v-model="dialogDelete">
        <div slot="header">
          <span>The confirmation</span>
        </div>
        <div style="text-align:center;">
          <p>Are you sure you want to start {{ main.isDeletePosts ? 'deleting posts' : 'clearing comments' }}?</p>
        </div>
        <div slot="footer">
          <at-button @click="dialogDelete = false">Cancel</at-button>
          <!--TODO Start delete method-->
          <at-button type="error" @click="dialogDelete = false">Run cleanup</at-button>
        </div>
      </at-modal>
    </div>
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
      dialogDelete: false
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
     * | Links
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
}

.footer {
  > button {
    width: 100%;
  }
}
</style>
