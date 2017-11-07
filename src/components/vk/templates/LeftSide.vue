<template>
  <q-list no-border link inset-separator>
    <q-list-header>Sections</q-list-header>
    <q-side-link item :to="linkToken">
      <q-item-side icon="vpn_key" />
      <q-item-main label="Token" sublabel="https://vk.com/dev/access_token" />
    </q-side-link>
    <q-side-link :disabled="!linkFriends" item :to="linkFriends">
      <q-item-side icon="people_outline" />
      <q-item-main label="Friends" sublabel="https://vk.com/dev/friends" />
      <q-chip v-if="$store.state.vk.user.counters && linkFriends" small color="primary">{{ $store.state.vk.user.counters.friends }}</q-chip>
    </q-side-link>
    <q-side-link :disabled="!linkPhotos" item :to="linkPhotos">
      <q-item-side icon="photo" />
      <q-item-main label="Photos" sublabel="https://vk.com/dev/photos" />
      <q-chip v-if="$store.state.vk.user.counters && linkPhotos" small color="primary">{{ $store.state.vk.user.counters.photos }}</q-chip>
    </q-side-link>
    <q-side-link :disabled="!linkVideo" item :to="linkVideo">
      <q-item-side icon="video_library" />
      <q-item-main label="Video" sublabel="https://vk.com/dev/video" />
      <q-chip v-if="$store.state.vk.user.counters && linkVideo" small color="primary">{{ $store.state.vk.user.counters.videos }}</q-chip>
    </q-side-link>
    <q-side-link :disabled="!linkStatus" item :to="linkStatus">
      <q-item-side icon="done" />
      <q-item-main label="Status" sublabel="https://vk.com/dev/status" />
    </q-side-link>
    <q-side-link :disabled="!linkMessages" item :to="linkMessages">
      <q-item-side icon="chat" />
      <q-item-main label="Messages" sublabel="https://vk.com/dev/messages" />
    </q-side-link>
    <q-side-link :disabled="!linkWall" item :to="linkWall">
      <q-item-side icon="dashboard" />
      <q-item-main label="Wall" sublabel="https://vk.com/dev/wall" />
      <q-chip v-if="$store.state.vk.user.counters && linkWall" small color="primary">{{ countWall }}</q-chip>
    </q-side-link>
    <q-side-link :disabled="!linkDocs" item :to="linkDocs">
      <q-item-side icon="bookmark" />
      <q-item-main label="Docs" sublabel="https://vk.com/dev/docs" />
      <q-chip v-if="$store.state.vk.user.counters && linkDocs" small color="primary">{{ countDocs }}</q-chip>
    </q-side-link>
    <q-side-link :disabled="!linkGroups" item :to="linkGroups">
      <q-item-side icon="people" />
      <q-item-main label="Groups" sublabel="https://vk.com/dev/groups" />
      <q-chip v-if="$store.state.vk.user.counters && linkGroups" small color="primary">{{ $store.state.vk.user.counters.groups }}</q-chip>
    </q-side-link>
  </q-list>
</template>

<script>
  import { QList, QListHeader, QSideLink, QItemSide, QItemMain, QChip } from 'quasar'

  export default {
    components: {
      QList, QListHeader, QSideLink, QItemSide, QItemMain, QChip
    },
    computed: {
      linkToken () {
        return '/vk/token'
      },
      linkFriends () {
        return this.$store.state.vk.access.friends ? '/vk/friends' : ''
      },
      linkPhotos () {
        return this.$store.state.vk.access.photos ? '/vk/photos' : ''
      },
      linkVideo () {
        return this.$store.state.vk.access.video ? '/vk/video' : ''
      },
      linkStatus () {
        return this.$store.state.vk.access.status ? '/vk/status' : ''
      },
      linkMessages () {
        return this.$store.state.vk.access.messages ? '/vk/messages' : ''
      },
      linkWall () {
        return this.$store.state.vk.access.wall ? '/vk/wall' : ''
      },
      linkDocs () {
        return this.$store.state.vk.access.docs ? '/vk/docs' : ''
      },
      linkGroups () {
        return this.$store.state.vk.access.groups ? '/vk/groups' : ''
      },
      countWall () {
        if (typeof this.$store.state.vk.user.counters.wall === 'undefined') {
          return '?'
        }
        return this.$store.state.vk.user.counters.wall || 0
      },
      countDocs () {
        if (typeof this.$store.state.vk.user.counters.docs === 'undefined') {
          return '?'
        }
        return this.$store.state.vk.user.counters.docs || 0
      }
    }
  }
</script>
