<template>
  <div id="log">
    <q-list highlight inset-separator style="border: 0;">
      <!-- TODO: Filter isn't working  -->
      <div class="row">
        <q-select
                color="secondary"
                float-label="Social network"
                v-model="selectFilterSocial"
                :options="listFilterSocial"
                style="padding: 10px; margin: 0 0 10px"
                class="col"
        />
      </div>
      <q-item v-for="(item, index) in $store.state.logs.storage" :key="index" @click="toLink(item)" multiline>
        <q-item-side :icon="item.social_icon" />
        <q-item-main>
          <q-item-tile label lines="1">{{ item.header }}</q-item-tile>
          <q-item-tile sublabel lines="2" v-if="item.message">{{ item.message }}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <!-- TODO: Test. Need moments.js -->
          <q-item-tile stamp>{{ item.time || '10:20' }}</q-item-tile>
          <q-item-tile :icon="item.icon" :color="item.color" />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  import { QList, QListHeader, QItem, QItemMain, QItemSide, QItemTile, QSelect } from 'quasar'
  import * as lh from '../../../helpers/logs'

  export default {
    components: {
      QList, QListHeader, QItem, QItemMain, QItemSide, QItemTile, QSelect
    },
    data () {
      return {
        selectFilterSocial: 'all',
        listFilterSocial: [
          {
            label: 'All',
            icon: '',
            value: 'all'
          },
          {
            label: lh.SOCIAL_FACEBOOK,
            icon: lh.getIconForSocial(lh.SOCIAL_FACEBOOK),
            value: 'fb'
          },
          {
            label: lh.SOCIAL_TWITTER,
            icon: lh.getIconForSocial(lh.SOCIAL_TWITTER),
            value: 't'
          },
          {
            label: lh.SOCIAL_VK,
            icon: lh.getIconForSocial(lh.SOCIAL_VK),
            value: 'vk'
          }
        ]
      }
    },
    methods: {
      toLink (item) {
        return typeof item.href !== 'undefined' ? item.href : null
      }
    }
  }
</script>
