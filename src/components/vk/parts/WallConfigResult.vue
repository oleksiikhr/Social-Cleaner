<template>
  <div class="block__result">
    <at-button type="primary" @click="sendRequest()" hollow>Проверить настройки</at-button>
    <!--TODO process loading*-->
    <div class="wall-config-result" v-if="page.response || wall.response">
      <div v-if="page.response" class="page section">
        <span>{{ page.isUser ? 'User' : 'Group' }}</span>
        <div class="flex">
          <img :src="page.response.photo_100" alt="Page image" />
          <div class="info">
            <p><strong>ID:</strong> {{ page.response.id }}</p>
            <template v-if="page.isUser">
              <p><strong>Name:</strong> {{ page.response.last_name + ' ' + page.response.first_name }}</p>
            </template>
            <template v-else>
              <p><strong>Name:</strong> {{ page.response.name }}</p>
              <p><strong>Is admin:</strong> {{ page.response.is_admin ? 'Yes' : 'No' }}</p>
            </template>
            <p><a :href="linkPage" target="_blank" rel="noreferrer">Follow the link</a></p>
          </div>
        </div>
      </div>
      <div v-if="wall.response" class="wall section">
        <span>Wall</span>
        <div class="info">
          <p><strong>Count:</strong> {{ wall.response.count }}</p>
          <p>
            <strong>Start from the first post:</strong>
            <a :href="linkWall" target="_blank" rel="noreferrer">Follow the link</a>
          </p>
        </div>
      </div>
      <div class="button-out">
        <at-button type="info" @click="close()" hollow>Close</at-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ICON_WALL } from '../../../heplers/logs'
import { send } from '../../../heplers/vk'
import { vk } from '../../../config'

export default {
  props: {
    mainConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      wall: {},
      page: {}
    }
  },
  computed: {
    linkPage () {
      return vk.url + (this.page.isUser ? 'id' : 'public') + this.page.response.id
    },
    linkWall () {
      const item = this.wall.response.items[0]

      return vk.url + 'wall' + item.from_id + '_' + item.id
    }
  },
  methods: {
    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    fetchGetWall () {
      send('wall.get', {
        owner_id: this.mainConfig.owner_id,
        filter: this.mainConfig.filter,
        count: 1,
        offset: this.mainConfig.count.min
      }, { icon: ICON_WALL, msg: 'Received Wall data' })
        .then(res => {
          this.wall = res.data
        })
    },
    fetchGetUsersById () {
      send('users.get', {
        user_ids: this.mainConfig.owner_id,
        fields: 'photo_100'
      }, { icon: ICON_WALL, msg: 'Received User data' })
        .then(res => {
          if (res.data.response) {
            this.page = { isUser: true, response: res.data.response[0] }
          }
        })
    },
    fetchGetGroupsById () {
      send('groups.getById', {
        group_ids: this.mainConfig.owner_id.substr(1)
      }, { icon: ICON_WALL, msg: 'Received Group data' })
        .then(res => {
          if (res.data.response) {
            this.page = { isUser: false, response: res.data.response[0] }
          }
        })
    },

    /* | -----------------------------------------------------------------------------
     * | Other
     * | -----------------------------------------------------------------------------
     * |
     */
    sendRequest () {
      this.fetchGetWall()

      if (this.mainConfig.owner_id[0] !== '-') {
        this.fetchGetUsersById()
      } else {
        this.fetchGetGroupsById()
      }
    },
    close () {
      this.wall = {}
      this.page = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.block__result {
  > button {
    width: 100%;
  }
}

.wall-config-result {
  border: 1px solid #e7e7e7;
  padding: 20px;
  > * {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.section {
  > span {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: .9rem;
    margin-bottom: 20px;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .info {
    margin-left: 10px;
    > p {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.button-out {
  text-align: center;
  > button {
    max-width: 150px;
    width: 100%;
  }
}
</style>
