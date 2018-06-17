<template>
  <div id="status">
    <div class="main-config block">
      <h2>{{ $t('vk.status.h2') }}</h2>
      <attr-input :name="$t('vk.status.attr_1.p')" :info="$t('vk.status.attr_1.small')" :model.sync="id"
                  :process="process" />
      <div class="text-center">
        <at-button type="primary" @click="fetchGetStatus()" :disabled="process">
          {{ $t('vk.status.get_status') }}
        </at-button>
      </div>
    </div>

    <template v-if="link">
      <hr>
      <div class="block">
        <div class="block__result">
          <h2>{{ $t('vk.status.current_status') }}</h2>
          <a v-if="status" :href="link" class="status-text" target="_blank" rel="noopener">
            {{ status }}
          </a>
          <a v-else :href="link" target="_blank" rel="noopener">
            <at-alert :message="$t('vk.status.empty')" type="info" show-icon />
          </a>
        </div>
      </div>
    </template>

    <hr>
    <attr-action :process="process" :loading="loading" @start="fetchDeleteStatus" />
  </div>
</template>

<script>
import AttrAction from '../attributes/Action'
import AttrInput from '../attributes/Input'
import VK from '../../media/VK'

export default {
  components: {
    AttrInput, AttrAction
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
      return this.$store.state.media.vk.user
    },
    process () {
      return this.$store.state.media.vk.process
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
  margin: 25px 0;
  .status-text {
    border-left: 5px solid #6190e8;
    padding: 7px 20px;
  }
}
</style>
