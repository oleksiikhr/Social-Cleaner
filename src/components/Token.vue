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
      <q-btn v-if="token.length < 1" style="margin-bottom: 0.5rem" icon-right="send"
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
      <q-btn color="red" outline @click.native="exit()">Exit</q-btn>
    </template>
  </div>
</template>

<script>
  import { get } from '../helpers/vk'
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
          return Toast.create.negative({
            html: 'The token is empty'
          })
        }

        get('account.getAppPermissions', {
          access_token: this.token
        })
          .then(res => {
            if (res.body.response) {
              this.token = ''
              this.scope = []
              this.$store.dispatch('setPermissions', res.body.response)
              this.$store.dispatch('setToken', this.token)
              this.fetchGetUser()
              Toast.create.positive({
                html: 'Token installed'
              })
            }
            else if (res.body.error) {
              Toast.create.negative({
                html: res.body.error.error_msg
              })
            }
            else {
              Toast.create.negative({
                html: 'Token error'
              })
            }
          })
          .catch(err => {
            Toast.create.negative({
              html: 'Not access to VK'
            })
          })
      },
      fetchGetUser () {
        get('users.get', {
          fields: 'has_photo,photo_100,counters',
          access_token: this.token
        })
          .then(res => {
            if (res.body.response) {
              this.$store.dispatch('setUser', res.body.response)
            } else {
              Toast.create.negative({
                html: 'User not received'
              })
              this.exit()
            }
          })
          .catch(err => {
            Toast.create.negative({
              html: 'Error from VK'
            })
            this.exit()
          })
      },
      linkGetToken () {
        if (!this.scope.length) {
          return Toast.create.negative({
            html: 'You must select at least 1 item'
          })
        }

        window.open('https://oauth.vk.com/authorize?client_id=6244330&display=page&redirect_uri=https://oauth.vk.com/blank.html' +
          '&scope=' + this.scope.join(',') + '&response_type=token&v=5.69', '_blank')
        this.seePlaceWriteToken = true
      },
      exit () {
        this.$store.dispatch('exit')
      }
    }
  }
</script>

<style lang="stylus">
  #token
    padding: 20px
</style>
