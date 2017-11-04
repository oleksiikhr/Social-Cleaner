<template>
  <div id="token">
    <h5>Getting a token</h5>
    <p class="caption">To run most API methods you need to pass an access_token, a special access key.
      Token is a string of digits and latin characters and may refer to a user, community or application itself.</p>
    <q-option-group
        type="toggle"
        color="primary"
        v-model="scope"
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
    <br>
    <q-btn v-if="!haveToken" color="black" outline @click.native="haveToken = true">I have a token</q-btn>
    <q-btn v-if="token.length < 1" icon-right="send" color="primary" outline @click.native="linkGetToken()">Get a token</q-btn>
    <template v-if="haveToken">
      <q-input v-model="token" clearable type="password" color="red" stack-label="Token insert here" :after="[{icon: 'done', handler () { fetchCheckPermissions() }}]"/>
    </template>
  </div>
</template>

<script>
  import { get } from '../helpers/vk'
  import { QOptionGroup, QBtn, Toast, QInput } from 'quasar'

  export default {
    components: {
      QOptionGroup, QBtn, Toast, QInput
    },
    data () {
      return {
        token: '',
        scope: [],
        haveToken: false
      }
    },
    methods: {
      linkGetToken () {
        if (!this.scope.length) {
          Toast.create.negative({
            html: 'You must select at least 1 item'
          })
        }
        else {
          window.open('https://oauth.vk.com/authorize?client_id=6244330&display=page&redirect_uri=https://oauth.vk.com/blank.html' +
            '&scope=' + this.scope.join(',') + '&response_type=token&v=5.69', '_blank')
          this.haveToken = true
        }
      },
      fetchCheckPermissions () {
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
              this.$store.dispatch('setPermissions', res.body.response)
              this.$store.dispatch('setToken', this.token)
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
      }
    }
  }
</script>

<style lang="stylus">
  #token
    padding: 20px
</style>
