<template>
  <div id="token">
    <template v-if="user">
      <!--TODO Delete current token-->
    </template>
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
        <at-button v-if="scope.length" @click="goGetToken()" type="primary">
          Generate a temporary token
        </at-button>
        <div class="info" v-if="displayInfo">
          Show info
          <!--TODO Image-->
        </div>
      </div>
      <hr>
      <div class="exists">
        <at-input type="password" v-model="token" clearable placeholder="Enter a token" />
        <at-button v-if="token" @click="installToken()" type="primary">
          Gain access
        </at-button>
      </div>
    </template>
  </div>
</template>

<script>
import { urlOauth, clientId, redirectUri, version } from '../../heplers/vk'

export default {
  data () {
    return {
      token: '',
      scope: [],
      displayInfo: false
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
    goGetToken () {
      this.displayInfo = true
      window.open(urlOauth + '?client_id=' + clientId + '&display=page&redirect_uri=' + redirectUri +
        '&scope=' + this.scope.join(',') + '&response_type=token&v=' + version, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 25px;
}

#token {
  max-width: 800px;
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

.info {
  margin-top: 30px;
}

.exists {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>
