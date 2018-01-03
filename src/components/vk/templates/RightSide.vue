<template>
  <div id="log" class="vk">
    <q-list highlight inset-separator v-if="$store.state.vk.log.length">
      <!-- TODO: Filter -->
      <q-item v-for="(item, index) in $store.state.vk.log" :key="index" @click="toLink(item)">
        <q-item-side :icon="item.icon" :color="item.type" />
        <q-item-main>
          <q-item-tile label>{{ item.message }}</q-item-tile>
          <q-item-tile sublabel lines="2" v-if="item.subMessage">
            {{ item.subMessage }}
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <div class="q-list-header" style="padding-top: 8px;" v-else>
      Logs
    </div>
  </div>
</template>

<script>
  import { QList, QListHeader, QItem, QItemMain, QItemSide, QItemTile } from 'quasar'

  export default {
    components: {
      QList, QListHeader, QItem, QItemMain, QItemSide, QItemTile
    },
    methods: {
      toLink (item) {
        if (typeof item.href !== 'undefined') {
          return item.href
        }
        return null
      }
    }
  }
</script>
