<template>
  <div id="general-dashboard">
    <q-card inline v-for="card in cards" :key="card.name" style="width: 300px">
      <q-card-media>
        <!-- FIXME: Images in data -->
        <img v-if="card.shortName === 'vk'" src="../static/vk/wallpaper.jpg">
        <img v-else-if="card.shortName === 'twitter'" src="../static/twitter/wallpaper.jpg">
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
        <q-btn flat class="full-width" color="primary" @click="goLink(card.shortName)">GO</q-btn>
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
            content: 'VK (VKontakte; Russian: ВКонта́кте, meaning InContact) is a Russian-based online social media and social networking service.'
          },
          {
            name: 'Twitter',
            shortName: 'twitter',
            icon: 'fa-twitter',
            domain: 'twitter.com',
            content: 'Twitter (/ˈtwɪtər/) is an online news and social networking service where users post and interact with messages, known as "tweets."'
          }
        ]
      }
    },
    created () {
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
  .q-card-media > img {
    height: 180px;
  }
</style>
