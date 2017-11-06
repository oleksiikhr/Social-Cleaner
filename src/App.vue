<template>
  <q-layout id="q-app" ref="layout" view="hHh LpR fff" :right-breakpoint="1100">
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        VK Clean
      </q-toolbar-title>
      <q-btn flat @click.native="linkGithub">
        <q-icon name="link" />
      </q-btn>
      <q-btn flat @click="$refs.layout.toggleRight()">
        <q-icon name="menu" />
      </q-btn>
    </q-toolbar>
    <!-- Left Side Panel -->
    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>Sections</q-list-header>
        <q-side-link item to="/token">
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
          <q-chip v-if="$store.state.vk.user.counters && linkDocs" small color="primary">{{ $store.state.vk.user.counters.docs }}</q-chip>
        </q-side-link>
        <q-side-link :disabled="!linkGroups" item :to="linkGroups">
          <q-item-side icon="people" />
          <q-item-main label="Groups" sublabel="https://vk.com/dev/groups" />
          <q-chip v-if="$store.state.vk.user.counters && linkGroups" small color="primary">{{ $store.state.vk.user.counters.groups }}</q-chip>
        </q-side-link>
      </q-list>
    </div>
    <!-- Right Side Panel -->
    <div slot="right">
      <q-list highlight>
        <q-list-header>Log</q-list-header>
        <q-item v-for="(item, index) in $store.state.vk.log" :key="index">
          <q-item-main>
            <q-item-tile label>{{ item.message }}</q-item-tile>
            <q-item-tile sublabel>{{ item.section }}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>

    </div>
    <!-- sub-routes get injected here: -->
    <div style="padding: 20px;">
      <router-view />
    </div>
  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    QItemSide,
    QItemMain,
    QSideLink,
    QListHeader,
    QScrollArea,
    QList,
    QChip,
    QItem,
    QItemTile
  } from 'quasar'

  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QSearch,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon,
      QItemSide,
      QItemMain,
      QSideLink,
      QListHeader,
      QScrollArea,
      QList,
      QChip,
      QItem,
      QItemTile
    },
    computed: {
      linkFriends () {
        return this.$store.state.vk.access.friends ? '/friends' : ''
      },
      linkPhotos () {
        return this.$store.state.vk.access.photos ? '/photos' : ''
      },
      linkVideo () {
        return this.$store.state.vk.access.video ? '/video' : ''
      },
      linkStatus () {
        return this.$store.state.vk.access.status ? '/status' : ''
      },
      linkMessages () {
        return this.$store.state.vk.access.messages ? '/messages' : ''
      },
      linkWall () {
        return this.$store.state.vk.access.wall ? '/wall' : ''
      },
      linkDocs () {
        return this.$store.state.vk.access.docs ? '/docs' : ''
      },
      linkGroups () {
        return this.$store.state.vk.access.groups ? '/groups' : ''
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
    },
    methods: {
      linkGithub () {
        return window.open('https://github.com/Alexeykhr', '_blank')
      },
      exit () {
        this.$store.dispatch('exit')
      }
    }
  }
</script>
