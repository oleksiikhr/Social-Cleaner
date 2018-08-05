<template>
  <div id="status">
    <div class="main-config block">
      <attr-section name="vk.status.h2" />
      <attr-input name="vk.status.id.name" info="vk.status.id.info" :model.sync="id" :process="process" />
      <div class="text--center">
        <at-button type="primary" @click="fetchGetStatus()" :disabled="process">
          {{ $t('vk.status.get_status') }}
        </at-button>
      </div>
    </div>

    <div class="block">
      <div class="block__result">
        <attr-section name="vk.status.current_status" />
        <template v-if="link">
          <a v-if="status" :href="link" class="status-text" target="_blank" rel="noopener">
            {{ status }}
          </a>
          <a v-else :href="link" target="_blank" rel="noopener">
            <at-alert :message="$t('vk.status.empty')" type="info" show-icon />
          </a>
        </template>
        <at-alert v-else :message="$t('vk.status.not_received')" type="warning" show-icon />
      </div>
    </div>

    <attr-action :process="process" :loading="loading" @start="fetchDeleteStatus" />
  </div>
</template>

<script>
import AttrSection from '../../attributes/Section'
import AttrAction from '../../attributes/Action'
import AttrInput from '../../attributes/Input'
import VK from '../../../networks/VK'

export default {
  components: {
    AttrSection, AttrInput, AttrAction
  },
  data () {
    return {
      id: '',
      link: '',
      status: '',
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.networks.vk.user
    },
    process () {
      return this.$store.state.networks.vk.process
    }
  },
  methods: {
    async fetchGetStatus () {
      this.start()

      const result = await VK.fetchStatusGet(this.id ? '-' + this.id : this.user.id)
      if (result.ok && result.body.response) {
        this.status = result.body.response.text
        this.link = this.id ? VK.getLinkGroup(this.id) : VK.getLinkUser()
      }

      this.stop()
    },
    async fetchDeleteStatus () {
      this.start()

      let result = await VK.fetchStatusSet('', this.id || null)
      if (result.ok && result.body.response) {
        this.status = ''
      }

      this.stop()
    },
    start () {
      this.$store.commit('START_PROCESS', 'vk')
      this.loading = true
    },
    stop () {
      this.$store.commit('STOP_PROCESS', 'vk')
      this.loading = false
    }
  },
  watch: {
    id () {
      this.status = ''
      this.link = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.block__result {
  .status-text {
    border-left: 5px solid #6190e8;
    padding: 7px 20px;
  }
}
</style>
