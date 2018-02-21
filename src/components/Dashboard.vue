<template>
  <div id="general-dashboard">
    <q-card inline v-for="card in cards" :key="card.name" style="width: 300px">
      <q-card-media>
        <!-- FIXME: Images in data -->
        <img v-if="card.shortName === 'vk'" src="../static/vk/wallpaper.jpg">
        <img v-else-if="card.shortName === 'twitter'" src="../static/twitter/wallpaper.jpg">
        <img v-else-if="card.shortName === 'facebook'" src="../static/facebook/wallpaper.jpg">
      </q-card-media>
      <q-card-title>
        {{ card.name }}
        <div slot="subtitle">
          <q-icon name="http" />
          {{ card.domain }}
        </div>
        <q-icon slot="right" :name="card.icon" />
      </q-card-title>
      <q-card-separator />
      <q-card-main>{{ card.content }}</q-card-main>
      <q-card-actions>
        <q-btn flat class="full-width" color="primary" @click="goLink(card.shortName)" :disabled="!card.canGo">GO</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  import { QCard, QCardTitle, QCardSeparator, QCardMain, QCardMedia, QIcon, QCardActions, QBtn } from 'quasar'

  export default {
    components: {
      QCard, QCardTitle, QCardSeparator, QCardMain, QCardMedia, QIcon, QCardActions, QBtn
    },
    data () {
      return {
        cards: [
          {
            name: 'VKontakte',
            shortName: 'vk',
            icon: 'fa-vk',
            domain: 'vk.com',
            canGo: true,
            content: 'VK (VKontakte; Russian: ВКонта́кте, meaning InContact) is a Russian-based online social media and social networking service.'
          },
          {
            name: 'Twitter',
            shortName: 'twitter',
            icon: 'fa-twitter',
            domain: 'twitter.com',
            canGo: false,
            content: 'Twitter (/ˈtwɪtər/) is an online news and social networking service where users post and interact with messages, known as "tweets."'
          },
          {
            name: 'Facebook',
            shortName: 'facebook',
            icon: 'fa-facebook',
            domain: 'facebook.com',
            canGo: false,
            content: 'Facebook is an American online social media and social networking service company based in Menlo Park, California.'
          }
        ]
      }
    },
    activated () {
      this.$store.dispatch('clearTemplateLeftSide')
      this.$store.dispatch('clearTemplateRightSide')
      this.$store.dispatch('clearTemplateSubTitle')
    },
    methods: {
      goLink (name) {
        this.$router.push({ name: name })
      }
    }
  }
</script>

<style>
  #general-dashboard {
    margin: 0 auto;
    text-align: center;
    padding: 20px 0;
  }
  .q-card {
    text-align: left;
  }
  .q-card-main {
    height: 100px;
  }
  .q-card-media > img {
    height: 180px;
  }
</style>
