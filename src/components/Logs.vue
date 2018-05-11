<template>
  <div id="logs">
    <!--TODO Show notification if it comes 1 time-->
    <!--TODO Header: Search method. Select name, color-->
    <a :class="'log ' + log.color" v-for="(log, index) in logs" :key="index" @click="openDialogResponse(log.response)">
      <span class="log__name">{{ log.method }}</span>
      <div class="log__footer">
        <i :class="'current fa ' + log.socialNetwork.icon" aria-hidden="true"></i>
        <span class="time">{{ fromNow(log.time) }}</span>
      </div>
    </a>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  // TODO Update time every 10sec (destroy on deactivated*)
  activated () {
    this.$store.commit('CLEAR_SOCIAL_NETWORK')
  },
  computed: {
    logs () {
      return this.$store.state.logs.storage
    }
  },
  methods: {
    openDialogResponse (response) {
      console.log(response)
    },
    fromNow (time) {
      return moment(time).fromNow()
    }
  }
}
</script>

<style lang="scss" scoped>
#logs {
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
}
</style>
