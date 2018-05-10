<template>
  <div id="token">
    <div class="logged-in" v-if="user">
      <at-alert message="After rebooting the page - you need to re-enter the token." type="warning" show-icon />
      <div class="btn-out">
        <at-button @click="deleteToken()" type="error">
          Delete the token now
        </at-button>
      </div>
      <hr>
      <div class="sections">
        <p>Sections</p>
        <div class="inner">
          <!--FIXME Delete section by access-->
          <router-link class="section" v-for="section in vk.sections" :key="section.name" :to="{ name: section.to }"
                       v-if="section.to !== 'vk-token'">
            <i :class="`fa fa-${section.icon}`" aria-hidden="true"></i>
            <span>{{ section.name }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="header">
        <p>To gain access to your account, you must receive a special token.</p>
      </div>
      <hr>
      <div class="generate">
        <p>Select permissions</p>
        <at-checkbox-group v-model="scope">
          <at-checkbox label="friends">Friends</at-checkbox>
          <at-checkbox label="Photos">Photos</at-checkbox>
          <at-checkbox label="video">Video</at-checkbox>
          <at-checkbox label="status">Status</at-checkbox>
          <at-checkbox label="messages">Messages</at-checkbox>
          <at-checkbox label="wall">Wall</at-checkbox>
          <at-checkbox label="docs">Docs</at-checkbox>
          <at-checkbox label="groups">Groups</at-checkbox>
        </at-checkbox-group>
        <template v-if="scope.length">
          <div class="flex flex-middle flex-center">
            <at-popover trigger="hover" content="Application ID" placement="bottom">
              <at-input placeholder="Application ID" v-model="appId" />
            </at-popover>
            <at-button @click="goGetToken()" type="primary">
              Generate a temporary token
            </at-button>
          </div>
          <div class="info">
            <p class="i1">You need to copy the value of access_token from the URL of the field:</p>
            <p>https://oauth.vk.com/blank.html#access_token=<strong>COPY_HERE</strong>&expires_in=86400&user_id=1</p>
          </div>
        </template>
      </div>
      <hr>
      <div class="exists">
        <at-input type="password" v-model="token" clearable placeholder="Enter a access token" />
        <at-button v-if="token" @click="installToken()" type="primary">
          Gain access
        </at-button>
      </div>
    </template>
  </div>
</template>

<script>
import { vk } from '../../config'
import { urlOauth, clientId, redirectUri, version } from '../../heplers/vk'

export default {
  data () {
    return {
      vk,
      token: '',
      scope: [],
      appId: clientId
    }
  },
  computed: {
    user () {
      return this.$store.state.vk.user.id
    }
  },
  methods: {
    installToken () {
      this.$store.dispatch('vkInit', this.token)
    },
    deleteToken () {
      this.token = ''
      this.$store.dispatch('vkExit')
    },
    goGetToken () {
      window.open(`${urlOauth}?client_id=${this.appId}&display=page&redirect_uri=${redirectUri}
        &scope=${this.scope.join(',')}&response_type=token&v=${version}`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 25px;
}

#token {
  margin: 0 auto;
}

.header {
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.generate {
  margin-bottom: 30px;
  text-align: center;
  > p {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 20px;
  }
}

.flex {
  margin-top: 25px;
  .at-input {
    margin-right: 10px;
  }
  > button {
    margin: 0;
  }
}

.info {
  margin-top: 25px;
  > .i1 {
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.exists {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.logged-in {
  > .btn-out {
    text-align: center;
    > button {
      margin-top: 20px;
    }
  }
}

.sections {
  margin-top: 20px;
  text-align: center;
  > p {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 20px;
  }
  > .inner {
    display: flex;
  }
}

.section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #e7e7e7;
  color: #333;
  opacity: 0.7;
  flex-wrap: wrap;
  width: 150px;
  margin: 10px;
  font-size: 1rem;
  transition: .2s;
  &:hover {
    background: #f7f7f7;
  }
  > span {
    margin-top: 10px;
  }
}
</style>
