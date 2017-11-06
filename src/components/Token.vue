<template>
  <div id="token">
    <template v-if="!haveToken">
      <h5>Getting a token</h5>
      <p class="caption">To run most API methods you need to pass an access_token, a special access key.
        Token is a string of digits and latin characters and may refer to a user, community or application itself.</p>
      <q-option-group
          type="toggle"
          color="primary"
          v-model="scope"
          style="margin-bottom: 0.5rem"
          :options="[
          { label: 'Friends', value: 'friends' },
          { label: 'Photos', value: 'photos' },
          { label: 'Video', value: 'video' },
          { label: 'Status', value: 'status' },
          { label: 'Messages', value: 'messages' },
          { label: 'Wall', value: 'wall' },
          { label: 'Docs', value: 'docs' },
          { label: 'Groups', value: 'groups' }
        ]"
      />
      <q-btn v-if="!seePlaceWriteToken" style="margin-bottom: 0.5rem" color="black" outline
             @click.native="seePlaceWriteToken = true">
        I have a token
      </q-btn>
      <q-btn v-if="this.scope.length > 0" style="margin-bottom: 0.5rem" icon-right="send"
             color="primary" outline @click.native="linkGetToken()">
        Get a token
      </q-btn>
      <q-input v-if="seePlaceWriteToken" v-model="token" clearable type="password" color="red" stack-label="Token insert here"
               :after="[{icon: 'done', handler () { fetchGetPermissions() }}]"/>
    </template>

    <template v-else>
      <q-alert color="warning" style="margin-bottom: 1.5rem">
        The token is not stored in the browser, so do not close / reload the page unless you want to lose the token.
      </q-alert>
      <q-btn color="red" @click.native="exit()">Exit</q-btn>
    </template>
  </div>
</template>

<script>
  import { clientId, urlOauth, version, get } from '../helpers/vk'
  import { QOptionGroup, QBtn, Toast, QInput, QAlert } from 'quasar'

  export default {
    components: {
      QOptionGroup, QBtn, Toast, QInput, QAlert
    },
    data () {
      return {
        token: '',
        scope: [],
        seePlaceWriteToken: false
      }
    },
    computed: {
      haveToken () {
        return !!this.$store.state.vk.token
      }
    },
    methods: {
      fetchGetPermissions () {
        if (!this.token) {
          return Toast.create.negative({ html: 'The token is empty' })
        }
        get('account.getAppPermissions', {
          access_token: this.token
        })
          .then(res => {
            if (res.body.response) {
              this.$store.dispatch('setPermissions', res.body.response)
              this.$store.dispatch('setToken', this.token)
              this.fetchGetUser()
              Toast.create.positive({ html: 'Token installed' })
              this.token = ''
              this.scope = []
            }
            else {
              Toast.create.negative({ html: res.body.error ? res.body.error.error_msg : 'Token error' })
            }
          })
      },
      fetchGetUser () {
        get('users.get', {
          fields: 'has_photo,photo_100,counters',
          access_token: this.token
        })
          .then(res => {
            if (res.body.response) {
              this.$store.dispatch('setUser', res.body.response[0])
            }
            else {
              Toast.create.negative({ html: 'User not received' })
            }
          })
      },
      linkGetToken () {
        this.seePlaceWriteToken = true
        window.open(urlOauth + '?client_id=' + clientId + '&display=page&redirect_uri=https://oauth.vk.com/blank.html' +
          '&scope=' + this.scope.join(',') + '&response_type=token&v=' + version, '_blank')
      }
    }
  }
</script>
