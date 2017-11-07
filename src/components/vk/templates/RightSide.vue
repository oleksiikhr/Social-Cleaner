<template>
  <div id="log" class="vk">
    <q-list highlight v-if="$store.state.vk.log.length">
      <q-item v-for="(item, index) in $store.state.vk.log" :key="index">
        <q-item-main>
          <q-item-tile label>{{ item.message }}</q-item-tile>
          <q-item-tile sublabel>{{ item.section }}</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <div class="q-list-header" style="padding-top: 8px;" v-else>
      Logs
    </div>
  </div>
</template>

<script>
  import { QList, QListHeader, QItem, QItemMain, QItemTile } from 'quasar'

  export default {
    components: {
      QList, QListHeader, QItem, QItemMain, QItemTile
    }
  }
</script>
