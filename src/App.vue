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
        <q-side-link item to="/friends">
          <q-item-side icon="people_outline" />
          <q-item-main label="Friends" sublabel="https://vk.com/dev/friends" />
        </q-side-link>
        <q-side-link item to="/photos">
          <q-item-side icon="photo" />
          <q-item-main label="Photos" sublabel="https://vk.com/dev/photos" />
        </q-side-link>
        <q-side-link item to="/video">
          <q-item-side icon="video_library" />
          <q-item-main label="Video" sublabel="https://vk.com/dev/video" />
        </q-side-link>
        <q-side-link item to="/status">
          <q-item-side icon="done" />
          <q-item-main label="Status" sublabel="https://vk.com/dev/status" />
        </q-side-link>
        <q-side-link item to="/messages">
          <q-item-side icon="chat" />
          <q-item-main label="Messages" sublabel="https://vk.com/dev/messages" />
        </q-side-link>
        <q-side-link item to="/wall">
          <q-item-side icon="dashboard" />
          <q-item-main label="Wall" sublabel="https://vk.com/dev/wall" />
        </q-side-link>
        <q-side-link item to="/docs">
          <q-item-side icon="bookmark" />
          <q-item-main label="Docs" sublabel="https://vk.com/dev/docs" />
        </q-side-link>
        <q-side-link item to="/groups">
          <q-item-side icon="people" />
          <q-item-main label="Groups" sublabel="https://vk.com/dev/groups" />
        </q-side-link>
      </q-list>
    </div>
    <!-- Right Side Panel -->
    <div slot="right">
      <!-- TODO: Vuex for every section* -->
      Logs
    </div>
    <!-- sub-routes get injected here: -->
    <router-view />
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
    QList
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
      QList
    },
    methods: {
      linkGithub () {
        return window.open('https://github.com/Alexeykhr', '_blank')
      }
    }
  }
</script>
