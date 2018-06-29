<template>
  <div id="logs">
    <div class="logs__header">
      <h1>{{ $t('app.logs.h1') }}</h1>
      <at-input v-model="search" :placeholder="$t('app.logs.search.placeholder')" icon="search" />
      <at-select v-model="networkName" :placeholder="$t('app.logs.network_name.placeholder')" clearable>
        <at-option v-for="network in networks" :key="network.to" :value="network.name">
          {{ network.name }}
        </at-option>
      </at-select>
      <at-select v-model="color" :placeholder="$t('app.logs.options.placeholder')" clearable>
        <at-option value="success" label="Success">
          <span class="color--success">{{ $t('app.logs.options.success') }}</span>
        </at-option>
        <at-option value="error" label="Error">
          <span class="color--error">{{ $t('app.logs.options.error') }}</span>
        </at-option>
      </at-select>
    </div>

    <div class="logs__items">
      <a class="log" v-for="(log, index) in croppedFilteredLogs" :key="index"
         @click="openDialogResponse(log.response)">
        <span :class="`log__name color--${log.color}`">{{ log.name }}</span>
        <div class="log__footer">
          <i :class="'current fa ' + log.media.icon" aria-hidden="true"></i>
          <span class="time">{{ fromNow(log.time) }}</span>
        </div>
      </a>
    </div>

    <div id="pagination">
      <at-pagination :total="len" :page-size="20" show-total show-sizer show-quickjump @page-change="eventPageChange"
                     @pagesize-change="eventPageSizeChange" />
    </div>
  </div>
</template>

<script>
import networks from '../media'
import moment from 'moment'

export default {
  data () {
    return {
      networks,
      networkName: '',
      color: '',
      search: '',
      page: {
        size: 20,
        current: 1
      }
    }
  },
  computed: {
    logs () {
      return this.$store.state.logs.storage
    },
    len () {
      return this.filterLogs.length
    },
    filterLogs () {
      const search = this.search.toLocaleLowerCase().trim()

      return this.logs.filter(log => {
        if (search && log.method.toLowerCase().indexOf(search) <= -1) {
          return false
        }
        if (this.networkName && this.networkName !== log.socialNetwork.name) {
          return false
        }
        if (this.color && log.color !== this.color) {
          return false
        }

        return log
      })
    },
    croppedFilteredLogs () {
      const len = this.page.size * (this.page.current - 1)
      return this.filterLogs.slice(len, len + this.page.size)
    }
  },
  methods: {
    openDialogResponse (response) {
      // TODO
      console.log(response)
    },
    fromNow (time) {
      return moment(time).fromNow()
    },
    eventPageChange (val) {
      this.scrollToItems()
      this.page.current = val
    },
    eventPageSizeChange (val) {
      this.scrollToItems()
      this.page.size = val
    },
    scrollToItems () {
      document.getElementsByClassName('logs__items')[0].scrollIntoView({ block: 'start', inline: 'start', behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss" scoped>
.logs__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto 30px;
  background: #fbfbfb;
  padding: 20px 20px 0;
  border: 1px solid #e7e7e7;
  width: 100%;
  > * {
    margin: 0 20px 20px 0;
  }
  > h1 {
    text-align: center;
    color: rgba(0, 0, 0, .6);
    font-size: 1.2rem;
  }
  > .at-input {
    flex-grow: 1;
  }
  > .at-select {
    max-width: 150px;
    &:last-child {
      margin-right: 0;
    }
  }
}

.logs__items {
  display: flex;
  flex-wrap: wrap;
}

.log {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  color: #333;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: .3s;
  &:hover {
    background: #fbfbfb;
    color: #222;
  }
  .log__name {
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  .log__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .8rem;
    opacity: .6;
    > span {
      padding-left: 15px;
    }
  }
}

#pagination {
  text-align: center;
  font-size: 0;
  padding: 20px 0;
  background: #fbfbfb;
  border: 1px solid #e7e7e7;
  margin-top: 30px;
  > .at-pagination {
    display: inline-block;
  }
}
</style>
