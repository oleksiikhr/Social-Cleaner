<template>
  <q-layout id="q-app" ref="layout" view="hHh Lpr fff" :right-breakpoint="1100">
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        Layout Header
        <span slot="subtitle">Optional subtitle</span>
      </q-toolbar-title>
      <q-btn flat @click="$refs.layout.toggleRight()">
        <q-icon name="menu" />
      </q-btn>
    </q-toolbar>
    <!-- Navigation -->
    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="view_quilt" to="/test-layout/about" replace hide="icon" label="About" />
      <q-route-tab slot="title" icon="view_day" to="/test-layout/toolbar" replace hide="icon" label="Toolbar" />
      <q-route-tab slot="title" icon="view_day" to="/test-layout/tabs" replace label="Tabs" />
      <q-route-tab slot="title" icon="input" to="/test-layout/drawer" replace label="Drawer" />
    </q-tabs>
    <!-- Left Side Panel -->
    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>Essential Links</q-list-header>
        <q-side-link item to="/wall">
          <q-item-side icon="dashboard" />
          <q-item-main label="Wall" sublabel="https://vk.com/dev/wall" />
        </q-side-link>
        <q-side-link item to="/status">
          <q-item-side icon="done" />
          <q-item-main label="Status" sublabel="https://vk.com/dev/status" />
        </q-side-link>
        <q-side-link item to="/dialogs">
          <q-item-side icon="chat" />
          <q-item-main label="Dialogs" sublabel="https://vk.com/dev/messages" />
        </q-side-link>
        <q-side-link item to="/groups">
          <q-item-side icon="people" />
          <q-item-main label="Groups" sublabel="https://vk.com/dev/groups" />
        </q-side-link>
      </q-list>
    </div>
    <!-- Right Side Panel -->
    <div slot="right">
      Right Side of Layout
    </div>
    <!-- sub-routes get injected here: -->
    <router-view />
    <!-- Footer -->
    <q-toolbar slot="footer">
      <q-toolbar-title>
        Layout Footer
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
    }
  }
</script>
