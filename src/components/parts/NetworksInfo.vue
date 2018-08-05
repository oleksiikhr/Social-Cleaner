<template>
  <div id="loading" v-if="haveItems">
    <div class="loading__inner">
      <a :class="getClassItem(network)" v-for="(network, index) in networks" :key="index" @click="goMedia(network, index)" v-if="network.isAuth">
        <i :class="`fa ${network.info.icon}`" aria-hidden="true"></i>
        <div class="loading__icon" v-show="network.process">
          <i class="fa fa-spinner fa-pulse" aria-hidden="true"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    networks () {
      return this.$store.state.networks
    },
    haveItems () {
      return Object.keys(this.networks).some(key => {
        if (this.networks[key].isAuth) {
          return true
        }
      })
    }
  },
  methods: {
    cancel (network, index) {
      // TODO
      if (network.process) {
        this.$store.commit('SET_CANCEL', index)
      }
    },
    goMedia (network) {
      this.$router.push(network.info.to)
    },
    getClassItem (network) {
      return 'loading__item' + (network.cancel ? ' loading__cancel' : '')
    }
  }
}
</script>

<style lang="scss" scoped>
#loading {
  position: absolute;
  top: 0;
  right: -52px;
  bottom: 0;
  border-right: 1px solid #e7e7e7;
  background: #fff;
}

.loading__inner {
  position: sticky;
  top: 0;
}

.loading__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  line-height: 0;
  font-size: 1.7rem;
  color: #444;
  border-bottom: 1px solid #e7e7e7;
  overflow: hidden;
  transition: .2s;
  &:hover {
    background: rgba(0, 0, 0, .05);
  }
  &.loading__cancel {
    pointer-events: none;
    opacity: .5;
  }
}

.loading__icon {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1rem;
}

@media only screen and (max-width: 1300px) {
  #loading {
    display: none;
  }
}
</style>
