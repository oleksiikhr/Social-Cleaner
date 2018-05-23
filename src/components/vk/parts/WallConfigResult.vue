<template>
  <div class="block__result" v-if="mainConfig.owner_id">
    <at-button type="primary" @click="sendRequest()" v-if="!page.response && !wall.response" hollow>
      Check main settings
    </at-button>
    <template v-else>
      <at-button type="primary" @click="close()" hollow>Close</at-button>
      <div class="wall-config-result">
        <div v-if="page.id" class="page section">
          <span>{{ isUser ? 'User' : 'Group' }}</span>
          <div class="flex">
            <img :src="page.photo_100" alt="Page image" />
            <div class="info">
              <p><strong>ID:</strong> {{ page.id }}</p>
              <template v-if="isUser">
                <p><strong>Name:</strong> {{ page.last_name + ' ' + page.first_name }}</p>
              </template>
              <template v-else>
                <p><strong>Name:</strong> {{ page.name }}</p>
                <p><strong>Is admin:</strong> {{ page.is_admin ? 'Yes' : 'No' }}</p>
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
import { VK } from '../../../classes/VK'

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
      page: {},
      isUser: false
    }
  },
  computed: {
    hasWallPosts () {
      return this.wall.response.items.length > 0
    },
    linkPage () {
      if (this.isUser) {
        return VK.getLinkUser(this.page.id)
      }

      return VK.getLinkGroup(this.page.id)
    },
    linkWall () {
      return VK.getLinkWall(this.wall.response.items[0])
    }
  },
  methods: {
    /* | -----------------------------------------------------------------------------
     * | API
     * | -----------------------------------------------------------------------------
     * |
     */
    async fetchGetWall () {
      const res = await VK.fetchWallGet(this.mainConfig.owner_id, this.mainConfig.filter, 1, this.mainConfig.count.min - 1)

      if (res.ok) {
        this.wall = res.body
      }
    },
    async fetchGetUsersById () {
      const res = await VK.fetchUsersGet(this.mainConfig.owner_id, 'photo_100')

      if (res.ok && res.body.response) {
        this.page = res.body.response[0]
      }
    },
    async fetchGetGroupsById () {
      const res = await VK.fetchGroupsGetById(this.mainConfig.owner_id.substr(1))

      if (res.ok && res.body.response) {
        this.page = res.body.response[0]
      }
    },

    /* | -----------------------------------------------------------------------------
     * | Other
     * | -----------------------------------------------------------------------------
     * |
     */
    sendRequest () {
      this.fetchGetWall()
      this.isUser = this.mainConfig.owner_id !== '-'

      if (this.isUser) {
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
