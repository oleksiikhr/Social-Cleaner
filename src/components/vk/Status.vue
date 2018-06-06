<template>
  <div id="status">
    <div class="main-config block">
      <h2>{{ $t('vk.status.h2') }}</h2>
      <div class="block__attr">
        <p>{{ $t('vk.status.attr_1.p') }}</p>
        <at-input v-model="id" />
        <small>{{ $t('vk.status.attr_1.small') }}</small>
      </div>
      <div class="text-center">
        <at-button type="primary" @click="fetchGetStatus()" :disabled="process">
          {{ $t('vk.status.get_status') }}
        </at-button>
      </div>
    </div>

    <hr>
    <div class="block">
      <div class="block__result">
        <h2>{{ $t('vk.status.current_status') }}</h2>
          <a v-if="status" :href="link" class="status-text" target="_blank" rel="noreferrer">
            {{ status }}
          </a>
        <a v-else :href="link" target="_blank" rel="noreferrer">
          <at-alert :message="$t('vk.status.empty')" type="info" show-icon />
        </a>
      </div>
    </div>

    <template v-if="status">
      <hr>
      <div class="block">
        <div class="text-center">
          <at-button type="error" :disabled="process" @click="fetchDeleteStatus()">
            {{ $t('vk.status.clear_status') }}
          </at-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import VK from '../../networks/VK'

export default {
  data () {
    return {
      id: '',
      link: '',
      status: ''
    }
  },
  mounted () {
    this.fetchGetStatus()
  },
  computed: {
    user () {
      return this.$store.state.vk.user
    },
    process () {
      return this.$store.state.vk.process
    }
  },
  methods: {
    async fetchGetStatus () {
      this.$store.commit('VK_SET_PROCESS')
      const result = await VK.fetchStatusGet(this.id ? '-' + this.id : this.user.id)

      if (result.ok && result.body.response) {
        this.status = result.body.response.text
      }

      this.link = this.id ? VK.getLinkGroup(this.id) : VK.getLinkUser()
      this.$store.commit('VK_SET_PROCESS', false)
    },
    async fetchDeleteStatus () {
      this.$store.commit('VK_SET_PROCESS')
      let result = await VK.fetchStatusSet('', this.id || null)

      if (result.ok && result.body.response) {
        this.status = ''
      }

      this.$store.commit('VK_SET_PROCESS', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.block__result {
  margin: 25px 0;
  .status-text {
    border-left: 5px solid #6190e8;
    padding: 7px 20px;
  }
}

.text-center {
  text-align: center;
}
</style>
