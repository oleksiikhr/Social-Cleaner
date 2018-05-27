<template>
  <div id="status">
    <div class="block">
      <h2>Настройки</h2>
      <div class="block__attr">
        <p>Community identifier in which the status will be set</p>
        <at-input v-model="id" />
        <small>Positive number. Null - Current User.</small>
      </div>
      <div class="text-center">
        <!--FIXME v-if global process-->
        <at-button type="primary" @click="fetchGetStatus()">
          Получить статус
        </at-button>
      </div>
    </div>

    <hr>
    <div class="block">
      <div class="block__result">
        <h2>Статус</h2>
        <div class="status-text">
          {{ status || 'none' }}
          <a :href="link" target="_blank" rel="noreferrer"> - ссылка</a>
        </div>
      </div>
    </div>
    <hr>

    <div class="block">
      <div class="text-center">
        <!--FIXME v-if global process-->
        <at-button type="error" :disabled="!status" @click="fetchDeleteStatus()">
          Очистить статус
        </at-button>
      </div>
    </div>
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
    }
  },
  methods: {
    async fetchGetStatus () {
      this.status = 'Loading..'
      const result = await VK.fetchStatusGet(this.id ? '-' + this.id : this.user.id)

      if (result.ok && result.body.response) {
        this.status = result.body.response.text
      } else {
        this.status = 'Error'
      }

      this.link = this.id ? VK.getLinkGroup(this.id) : VK.getLinkUser()
    },
    async fetchDeleteStatus () {
      let result

      if (this.id) {
        result = await VK.fetchStatusSet('', this.id)
      } else {
        result = await VK.fetchStatusSet('')
      }

      if (result.ok && result.body.response) {
        this.status = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  margin: 30px 0;
}

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
