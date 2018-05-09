<template>
  <div id="wall">
    <div class="main-config block">
      <h2>Основные настройки</h2>
      <div class="block__attr">
        <p>ID на страницу или группу</p>
        <at-input v-model="main.owner_id" :disabled="del.process" />
        <small>Use a negative value to designate a community ID.</small>
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

    <!--TODO ___Удалить все записи, которые не совпадают с настройками или наоборот___ REVERT-->
    <hr>
    <div class="wall-config block">
      <h2>Параметры стены</h2>
      <div class="block__attr">
        <p>ID записей</p>
        <at-input v-model="wall.id" :disabled="del.process" @keyup.enter.native="addConfigWallArrayId('id', 'ids')" />
        <div class="block__attr-inner">
          <at-tag v-for="(id, index) in wall.ids" :key="index" :name="id" :closable="!del.process"
                  @on-close="wall.ids.splice(index, 1)">
            <a :href="getLinkPost(id)" target="_blank" rel="noreferrer">{{ id }}</a>
          </at-tag>
        </div>
        <small>After filling, press enter to add to the list.</small>
      </div>
      <div class="block__attr">
        <p>ID авторов записей</p>
        <at-input v-model="wall.fromId" :disabled="del.process"
                  @keyup.enter.native="addConfigWallArrayId('fromId', 'fromIds')" />
        <div class="block__attr-inner">
          <at-tag v-for="(id, index) in wall.fromIds" :key="index" :name="id" :closable="!del.process"
                  @on-close="wall.fromIds.splice(index, 1)">
            <a :href="getLinkPage(id)" target="_blank" rel="noreferrer">{{ id }}</a>
          </at-tag>
        </div>
        <small>After filling, press enter to add to the list. Use a negative value to designate a community ID.</small>
      </div>
      <!-- TODO Date -->
      <div class="block__attr">
        <p>Фразы в тексты</p>
        <at-input v-model="wall.text" :disabled="del.process"
                  @keyup.enter.native="addConfigWallArrayValue('text', 'texts')" />
        <div class="block__attr-inner">
          <at-tag v-for="(text, index) in wall.texts" :key="index" :name="index" :closable="!del.process"
                  @on-close="wall.texts.splice(index, 1)">
            {{ text }}
          </at-tag>
        </div>
        <small>After filling, press enter to add to the list.</small>
      </div>
      <div class="block__attr">
        <p>Added media attachments</p>
        <at-checkbox-group v-model="wall.attachments">
          <at-checkbox label="photo">Photo</at-checkbox>
          <at-checkbox label="video">Video</at-checkbox>
          <at-checkbox label="audio">Audio</at-checkbox>
          <at-checkbox label="doc">Document</at-checkbox>
          <at-checkbox label="link">Link</at-checkbox>
          <at-checkbox label="note">Note</at-checkbox>
          <at-checkbox label="poll">Poll</at-checkbox>
          <at-checkbox label="page">Wiki Page</at-checkbox>
          <at-checkbox label="photos_list">Photos List</at-checkbox>
          <at-checkbox label="market">Market Item</at-checkbox>
          <at-checkbox label="market_album">Market Collection</at-checkbox>
        </at-checkbox-group>
      </div>
      <div class="block__attr">
        <p>Значения</p>
        <div class="counts">
          <div class="count-comments count">
            <div class="flex">
              <i class="fa fa-comment-o" aria-hidden="true"></i>
              <p>Comments</p>
            </div>
            <at-input v-model="wall.count.comments.count" :disabled="del.process || wall.count.comments.state === 0" />
            <at-radio-group v-model="wall.count.comments.state" :disabled="del.process">
              <at-radio-button :label="-1">Меньше</at-radio-button>
              <at-radio-button :label="0">Выкл.</at-radio-button>
              <at-radio-button :label="1">Больше</at-radio-button>
            </at-radio-group>
          </div>
          <div class="count-likes count">
            <div class="flex">
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              <p>Likes</p>
            </div>
            <at-input v-model="wall.count.likes.count" :disabled="del.process || wall.count.likes.state === 0" />
            <at-radio-group v-model="wall.count.likes.state" :disabled="del.process">
              <at-radio-button :label="-1">Меньше</at-radio-button>
              <at-radio-button :label="0">Выкл.</at-radio-button>
              <at-radio-button :label="1">Больше</at-radio-button>
            </at-radio-group>
          </div>
          <div class="count-reposts count">
            <div class="flex">
              <i class="fa fa-bullhorn" aria-hidden="true"></i>
              <p>Reposts</p>
            </div>
            <at-input v-model="wall.count.reposts.count" :disabled="del.process || wall.count.reposts.state === 0" />
            <at-radio-group v-model="wall.count.reposts.state" :disabled="del.process">
              <at-radio-button :label="-1">Меньше</at-radio-button>
              <at-radio-button :label="0">Выкл.</at-radio-button>
              <at-radio-button :label="1">Больше</at-radio-button>
            </at-radio-group>
          </div>
          <div class="count-views count">
            <div class="flex">
              <i class="fa fa-eye" aria-hidden="true"></i>
              <p>Views</p>
            </div>
            <at-input v-model="wall.count.views.count" :disabled="del.process || wall.count.views.state === 0" />
            <at-radio-group v-model="wall.count.views.state" :disabled="del.process">
              <at-radio-button :label="-1">Меньше</at-radio-button>
              <at-radio-button :label="0">Выкл.</at-radio-button>
              <at-radio-button :label="1">Больше</at-radio-button>
            </at-radio-group>
          </div>
        </div>
      </div>
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

    <hr>
    <div class="block-buttons block">
      <at-button type="error" @click="del.dialog = true" v-if="!del.process">Удалить записи</at-button>
      <at-button type="primary" @click="del.continue = false" v-if="del.continue && del.process">
        Остановить
      </at-button>
      <!--TODO Preview posts-->

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
import { sleep, randomInteger } from '../../heplers/methods'
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
          max: 1
        },
        isDeletePosts: 0
      },
      wall: {
        id: '',
        ids: [],
        fromId: '',
        fromIds: [],
        text: '',
        texts: [],
        attachments: [],
        count: {
          comments: {
            state: 0,
            count: 0
          },
          likes: {
            state: 0,
            count: 0
          },
          reposts: {
            state: 0,
            count: 0
          },
          views: {
            state: 0,
            count: 0
          }
        }
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
    // this.main.owner_id = '-132378855' // FIXME Temporary
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
      }, { icon: ICON_WALL, msg: 'Get the data about the wall' })
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
        this.main.count.min++
        return this.fetchDeletePosts(items, ++index)
      }

      sleep(randomInteger(1500, 2500)).then(() => {
        send('wall.delete', {
          post_id: post.id
        }, { icon: ICON_WALL, msg: `Remove the ${post.id}st post` })
          .then(res => {
            if (res.body.response) {
              this.main.count.max--
            }

            return this.fetchDeletePosts(items, ++index)
          })
          .catch(() => {
            this.stopDelete(false)
          })
      })
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

    /* | -----------------------------------------------------------------------------
     * | Check posts
     * | -----------------------------------------------------------------------------
     * |
     */
    // TODO checkCommentsConfiguration
    checkWallConfiguration (post) {
      if (this.checkWallIds(post.id)) {
        return true
      }

      if (this.checkWallFromIds(post.from_id)) {
        return true
      }

      if (this.checkWallTexts(post.text)) {
        return true
      }

      if (this.checkWallAttachments(post.attachments)) {
        return true
      }

      // TODO

      return false
    },
    checkWallIds (postId) {
      return this.wall.ids.includes(postId)
    },
    checkWallFromIds (postFromId) {
      return this.wall.fromIds.includes(postFromId)
    },
    checkWallTexts (postText) {
      postText = postText.toLowerCase().trim()

      return this.wall.texts.some(text => {
        if (postText.indexOf(text) > -1) {
          return true
        }
      })
    },
    checkWallAttachments (postAttachments) {
      if (typeof postAttachments === 'undefined') {
        return false
      }

      return postAttachments.some(attachment => {
        if (this.wall.attachments.includes(attachment.type)) {
          return true
        }
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
    addConfigWallArrayValue (str, arr) {
      const value = this.wall[str].toLowerCase().trim()

      if (value) {
        this.wall[arr].push(value)
        this.wall[arr] = Array.from(new Set(this.wall[arr].sort()))
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
    .at-checkbox {
      margin: 5px;
    }
  }
}

.counts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  .count {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e7e7e7;
    margin: 5px;
    padding: 10px 5px;
    p {
      font-weight: bold;
    }
    i {
      font-size: 1.1rem;
      margin-right: 10px;
    }
    .flex {
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .at-input {
      margin-bottom: 20px;
    }
  }
}

.block-buttons {
  > button {
    width: 100%;
  }
}
</style>
