<template>
  <div id="logs">
    <div class="header">
      <at-input v-model="searchMethod" placeholder="Method" icon="search" />
      <at-select v-model="selectedNetworkName" placeholder="Social Network" clearable>
        <at-option v-for="network in networks" :key="network.to" :value="network.name">
          {{ network.name }}
        </at-option>
      </at-select>
      <!--TODO Header: Select color-->
    </div>

    <div class="items">
      <a :class="'log ' + log.color" v-for="(log, index) in filteredLogs" :key="index"
         @click="openDialogResponse(log.response)">
        <span class="log__name">{{ log.method }}</span>
        <div class="log__footer">
          <i :class="'current fa ' + log.socialNetwork.icon" aria-hidden="true"></i>
          <span class="time">{{ fromNow(log.time) }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { networks } from '../config'
import moment from 'moment'

export default {
  data () {
    return {
      networks,
      selectedNetworkName: '',
      searchMethod: ''
    }
  },
  // TODO Update time every 10sec (destroy on deactivated*)
  activated () {
    this.$store.commit('CLEAR_SOCIAL_NETWORK')
  },
  computed: {
    logs () {
      return this.$store.state.logs.storage
    },
    filteredLogs () {
      const search = this.searchMethod.toLocaleLowerCase().trim()

      return this.logs.filter(log => {
        if (search && log.method.toLowerCase().indexOf(search) <= -1) {
          return false
        }
        if (this.selectedNetworkName && this.selectedNetworkName !== log.socialNetwork.name) {
          return false
        }

        return log
      })
    }
  },
  methods: {
    openDialogResponse (response) {
      // TODO
      console.log(response)
    },
    fromNow (time) {
      return moment(time).fromNow()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto 20px;
  > .at-input {
    margin-right: 20px;
    flex-grow: 1;
  }
  > .at-select {
    max-width: 150px;
  }
}

.items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.log {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  color: #333;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  &.success .log__name {
    color: #0dad54;
  }
  &.error .log__name {
    color: #ff5b5b;
  }
  &.warning .log__name {
    color: #efb30d;
  }
  &.info .log__name {
    color: #6c94e1;
  }
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
</style>
