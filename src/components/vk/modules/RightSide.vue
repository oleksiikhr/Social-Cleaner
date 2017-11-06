<template>
  <q-list highlight>
    <q-list-header>Log</q-list-header>
    <q-item v-for="(item, index) in $store.state.vk.log" :key="index">
      <q-item-main>
        <q-item-tile label>{{ item.message }}</q-item-tile>
        <q-item-tile sublabel>{{ item.section }}</q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
  import { QList, QListHeader, QItem, QItemMain, QItemTile } from 'quasar'

  export default {
    components: {
      QList, QListHeader, QItem, QItemMain, QItemTile
    }
  }
</script>
