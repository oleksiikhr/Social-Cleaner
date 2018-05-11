<template>
  <div class="block__result" v-if="mainConfig.owner_id">
    <at-button type="primary" @click="sendRequest()" v-if="!page.response && !wall.response" hollow>
      Check main settings
    </at-button>
    <template v-else>
      <at-button type="primary" @click="close()" hollow>Close</at-button>
      <div class="wall-config-result">
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
            <p v-if="hasWallPosts">
              <strong>Start from the first post:</strong>
              <a :href="linkWall" target="_blank" rel="noreferrer">Follow the link</a>
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
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
    hasWallPosts () {
      return this.wall.response.items.length > 0
    },
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
        offset: this.mainConfig.count.min - 1
      })
        .then(res => {
          this.wall = res.data
        })
    },
    fetchGetUsersById () {
      send('users.get', {
        user_ids: this.mainConfig.owner_id,
        fields: 'photo_100'
      })
        .then(res => {
          if (res.data.response) {
            this.page = { isUser: true, response: res.data.response[0] }
          }
        })
    },
    fetchGetGroupsById () {
      send('groups.getById', {
        group_ids: this.mainConfig.owner_id.substr(1)
      })
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
</style>
