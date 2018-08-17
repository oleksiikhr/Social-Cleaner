<template>
  <!--TODO Offline scope + alert-->
  <div id="token">
    <div class="logged-in" v-if="isAuth">
      <at-alert :message="$t('vk.token.user.alert')" type="warning" show-icon />
      <hr>
      <user :user="user" />
      <hr>
      <div class="btn-out">
        <at-button @click="deleteToken()" type="error">
          {{ $t('vk.token.user.button') }}
        </at-button>
      </div>
    </div>

    <template v-else>
      <div class="header">
        <p>{{ $t('vk.token.guest.header') }}</p>
      </div>
      <hr>
      <div class="generate">
        <p>{{ $t('vk.token.guest.p') }}</p>
        <at-checkbox-group v-model="scope">
          <at-checkbox label="friends">{{ $t('vk.scope.friends') }}</at-checkbox>
          <at-checkbox label="photos">{{ $t('vk.scope.photos') }}</at-checkbox>
          <at-checkbox label="video">{{ $t('vk.scope.video') }}</at-checkbox>
          <at-checkbox label="status">{{ $t('vk.scope.status') }}</at-checkbox>
          <at-checkbox label="messages">{{ $t('vk.scope.messages') }}</at-checkbox>
          <at-checkbox label="wall">{{ $t('vk.scope.wall') }}</at-checkbox>
          <at-checkbox label="docs">{{ $t('vk.scope.docs') }}</at-checkbox>
          <at-checkbox label="groups">{{ $t('vk.scope.groups') }}</at-checkbox>
        </at-checkbox-group>
        <template v-if="scope.length">
          <div class="flex flex-middle flex-center">
            <at-popover trigger="hover" :content="$t('vk.token.guest.application_id')" placement="bottom">
              <at-input :placeholder="$t('vk.token.guest.application_id')" v-model="appId" />
            </at-popover>
            <at-button @click="goGetToken()" type="primary">
              {{ $t('vk.token.guest.generate') }}
            </at-button>
          </div>
          <div class="info">
            <p class="i1">{{ $t('vk.token.guest.info') }}</p>
            <syntax>{{ VK.prototype.urlRedirect }}#access_token=<strong>{{ $t('vk.token.guest.copy_here') }}</strong>&expires_in=86400&user_id=</syntax>
          </div>
        </template>
      </div>
      <hr>
      <div class="exists">
        <at-input type="password" v-model="token" clearable :placeholder="$t('vk.token.guest.placeholder_password')" />
        <at-button v-if="token" :disabled="process" @click="installToken()" type="primary">
          {{ $t('vk.token.guest.get') }}
        </at-button>
      </div>
    </template>
  </div>
</template>

<script>
import Syntax from '../../../components/Syntax'
import User from './parts/User'
import VK from '../VK'

export default {
  components: {
    User, Syntax
  },
  data () {
    return {
      VK,
      token: '',
      scope: [],
      appId: VK.prototype.clientId
    }
  },
  computed: {
    user () {
      return this.$store.state.networks.vk.user
    },
    isAuth () {
      return this.$store.state.networks.vk.isAuth
    },
    process () {
      return this.$store.state.networks.vk.process
    }
  },
  methods: {
    installToken () {
      this.$store.dispatch('vkLogIn', this.parseToken(this.token))
    },
    deleteToken () {
      this.token = ''
      this.$store.dispatch('vkLogOut')
    },
    goGetToken () {
      window.open(`${VK.prototype.urlOauth}?client_id=${this.appId}&display=page&redirect_uri=${VK.prototype.urlRedirect}` +
        `&scope=${this.scope.join(',')}&response_type=token&v=${VK.prototype.version}`, '_blank')
    },
    parseToken (input) {
      const split = input.match(/access_token=(\w+)&?/)

      if (split) {
        return split[1]
      }

      return input
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
  > p {
    word-wrap: break-word;
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
      margin-top: 0;
    }
  }
}

@media screen and (max-width: 550px) {
  .flex {
    flex-direction: column;
    > .at-popover {
      margin-bottom: 20px;
    }
  }
}
</style>
