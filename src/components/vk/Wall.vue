<template>
  <div id="wall">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <div class="block__attr">
        <p>ID на страницу или группу (идентификатор сообщества необходимо указывать со знаком "-")</p>
        <at-input v-model="main.owner_id" :disabled="del.process" />
      </div>
      <div class="block__attr">
        <p>Фильтр записей</p>
        <at-select v-model="main.filter" :disabled="del.process" size="large">
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
          <at-input v-model="main.count.min" :disabled="del.process" placeholder="От" /> -
          <at-input v-model="main.count.max" :disabled="del.process" placeholder="До" />
        </div>
      </div>
      <div class="block__attr">
        <p>Удалить записи или очистить комментарии</p>
        <at-radio-group v-model="main.isDeletePosts">
          <at-radio-button :label="0" :disabled="del.process">Записи</at-radio-button>
          <at-radio-button :label="1" disabled>Комментарии</at-radio-button>
        </at-radio-group>
      </div>
      <config-result v-if="!del.process" :main-config="main" />
    </div>

    <hr>
    <div class="wall-config block">
      <h2>Параметры стены</h2>
      <div class="block__attr">
        <p>ID записей</p>
        <at-input v-model="wall.id" :disabled="del.process" @keyup.enter.native="addConfigWallArrayId('id', 'ids')" />
        <div class="block__attr-inner">
          <at-tag v-for="(id, index) in wall.ids" :key="index" :name="id" closable
                  @on-close="wall.ids.splice(index, 1)">
            <a :href="getLinkPost(id)" target="_blank" rel="noreferrer">{{ id }}</a>
          </at-tag>
        </div>
      </div>
      <div class="block__attr">
        <p>ID авторов записей (идентификатор сообщества необходимо указывать со знаком "-")</p>
        <at-input v-model="wall.fromId" :disabled="del.process"
                  @keyup.enter.native="addConfigWallArrayId('fromId', 'fromIds')" />
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
      <at-button type="error" @click="del.dialog = true" v-if="!del.process">Удалить записи</at-button>
      <!--TODO Stop delete posts - del.continueDelete = false-->
      <at-modal v-model="del.dialog">
        <div slot="header">
          <span>The confirmation</span>
        </div>
        <div style="text-align:center;">
          <p>Are you sure you want to start {{ main.isDeletePosts ? 'deleting posts' : 'clearing comments' }}?</p>
        </div>
        <div slot="footer">
          <at-button @click="del.dialog = false">Cancel</at-button>
          <at-button type="error" @click="startDelete()">Run cleanup</at-button>
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

const MAX_GET_POSTS = 25

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
      del: {
        dialog: false,
        process: false,
        continue: true
      }
    }
  },
  mounted () {
    this.main.owner_id = this.user.id
  },
  computed: {
    user () {
      return this.$store.state.vk.user
    }
  },
  methods: {
    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    fetchGetWall () {
      // TODO Global process for block
      this.del.process = true

      send('wall.get', {
        owner_id: this.main.owner_id,
        filter: this.main.filter,
        count: MAX_GET_POSTS,
        offset: this.main.count.min - 1
      }, { icon: ICON_WALL, msg: 'Received Wall data' })
        .then(res => {
          if (res.body.response && res.body.response.items.length) {
            return this.fetchDeletePosts(res.body.response.items, 0)
          }
          this.stopDelete()
        })
        .catch(() => {
          this.stopDelete(false)
        })
    },
    fetchDeletePosts (items, index) {
      if (!this.del.continue || this.main.count.min > this.main.count.max) {
        return this.stopDelete()
      }

      // If all posts (MAX_GET_POSTS) are deleted, we receive new
      if (index + 1 >= MAX_GET_POSTS) {
        return this.fetchGetWall()
      }

      const post = items[index]

      // Of the record is empty, but the size should be still - stop
      if (typeof post === 'undefined') {
        return this.stopDelete()
      }

      if (this.checkWallConfiguration(post)) {
        console.log('No delete')
        this.main.count.min++
        return this.fetchDeletePosts(items, ++index)
      }

      // TODO Check post attributes

      console.log('Need delete', items[index])
    },

    /* | -----------------------------------------------------------------------------
     * | Start/Stop delete
     * | -----------------------------------------------------------------------------
     * |
     */
    startDelete () {
      // TODO Check input (min, max, etc)

      this.del.dialog = false
      this.fetchGetWall()
    },
    stopDelete (isSuccess = true) {
      if (isSuccess) {
        this.$Message.success('Action stopped')
      } else {
        this.$Message.error('Action stopped')
      }
      this.del.process = false
      this.del.continueDelete = true
    },
    checkWallConfiguration (post) {
      if (this.wall.ids.includes(post.id)) {
        return true
      }

      if (this.wall.fromIds.includes(post.from_id)) {
        return true
      }

      // TODO

      return false
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
