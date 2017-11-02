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
    <q-btn v-if="!isOpen" color="black" outline @click.native="isOpen = true">I have a token</q-btn>
    <q-btn v-if="token.length < 1" icon-right="send" color="primary" outline @click.native="linkGetToken()">Get a token</q-btn>
    <q-input v-if="isOpen" v-model="token" clearable type="password" stack-label="Token insert here" :after="[{icon: 'done', handler () { setToken() }}]"/>
  </div>
</template>

<script>
  import { QOptionGroup, QBtn, Toast, QInput } from 'quasar'

  export default {
    components: {
      QOptionGroup, QBtn, Toast, QInput
    },
    data () {
      return {
        token: '',
        scope: [],
        isOpen: false
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
          // TODO: temporary save data in here
          window.open('https://oauth.vk.com/authorize?client_id=6244330&display=page&redirect_uri=https://oauth.vk.com/blank.html' +
            '&scope=' + this.scope.join(',') + '&response_type=token&v=5.69', '_blank')
          this.isOpen = true
        }
      },
      setToken () {
        // TODO: Save in Vuex
        console.log('Set Token')
      }
    }
  }
</script>

<style lang="stylus">
  #token
    padding: 20px
</style>
