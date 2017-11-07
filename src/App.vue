<template>
  <q-layout id="q-app" ref="layout" view="hHh LpR fff" :right-breakpoint="1100">
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()" :disabled="!$store.state.templates.leftSide">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        Social Cleaner
        <span slot="subtitle" v-if="$store.state.templates.subTitle">
          {{ $store.state.templates.subTitle }}
        </span>
      </q-toolbar-title>
      <q-btn flat @click.native="linkBasic">
        <q-icon name="home" />
      </q-btn>
      <q-btn flat @click.native="linkVk">
        <q-icon name="fa-vk" />
      </q-btn>
      <q-btn flat @click="$refs.layout.toggleRight()" :disabled="!$store.state.templates.rightSide">
        <q-icon name="menu" />
      </q-btn>
    </q-toolbar>

    <!-- Left Side Panel -->
    <div slot="left" v-if="$store.state.templates.leftSide">
      <keep-alive>
        <component :is="$store.state.templates.leftSide"></component>
      </keep-alive>
    </div>

    <!-- Right Side Panel -->
    <div slot="right" v-if="$store.state.templates.rightSide">
      <keep-alive>
        <component :is="$store.state.templates.rightSide"></component>
      </keep-alive>
    </div>

    <!-- Router view -->
    <router-view />

    <!-- Footer -->
    <q-toolbar slot="footer">
      <q-toolbar-title>
        <q-btn flat @click.native="linkGithub">
          <q-icon name="fa-github" />
        </q-btn>
      </q-toolbar-title>
    </q-toolbar>
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
    methods: {
      linkGithub () {
        return window.open('https://github.com/Alexeykhr/Social-Cleaner', '_blank')
      },
      linkVk () {
        return this.$router.push({ name: 'vk-dashboard' })
      },
      linkBasic () {
        return this.$router.push({ name: 'dashboard' })
      }
    }
  }
</script>
