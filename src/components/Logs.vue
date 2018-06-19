<template>
  <!--TODO Global color styles-->
  <div id="logs">
    <div class="header">
      <h1>Query History</h1>
      <at-input v-model="search" placeholder="Method" icon="search" />
      <at-select v-model="networkName" placeholder="Social Network" clearable>
        <at-option v-for="network in networks" :key="network.to" :value="network.name">
          {{ network.name }}
        </at-option>
      </at-select>
      <at-select v-model="color" placeholder="Type" clearable>
        <at-option value="info" label="Request">
          <span>Request</span>
          <span style="float: right;color: #6c94e1;">**</span>
        </at-option>
        <at-option value="success" label="Success">
          <span>Success</span>
          <span style="float: right;color: #0dad54;">**</span>
        </at-option>
        <at-option value="error" label="Error">
          <span>Error</span>
          <span style="float: right;color: #ff5b5b;">**</span>
        </at-option>
      </at-select>
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

    <!--TODO Pagination-->
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
      search: ''
    }
  },
  // TODO Update time every 10sec (destroy on deactivated*)
  computed: {
    logs () {
      return this.$store.state.logs.storage
    },
    filteredLogs () {
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
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto 30px;
  background: #fbfbfb;
  padding: 20px 20px 0;
  border: 1px solid #e7e7e7;
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

.items {
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
