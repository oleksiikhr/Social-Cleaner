<template>
  <div id="loading" v-if="haveItems">
    <div class="loading__inner">
      <a :class="getClassItem(item)" v-for="(item, index) in media" :key="index" @click="goMedia(item, index)" v-if="item.isAuth">
        <i :class="`fa ${item.info.icon}`" aria-hidden="true"></i>
        <div class="loading__icon" v-show="item.process">
          <i class="fa fa-spinner fa-pulse" aria-hidden="true"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    media () {
      return this.$store.state.media
    },
    haveItems () {
      return Object.keys(this.media).some(key => {
        if (this.media[key].isAuth) {
          return true
        }
      })
    }
  },
  methods: {
    cancel (media, index) {
      // TODO
      if (media.process) {
        this.$store.commit('SET_CANCEL', index)
      }
    },
    goMedia (media) {
      this.$router.push(media.info.to)
    },
    getClassItem (media) {
      return 'loading__item' + (media.cancel ? ' loading__cancel' : '')
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
