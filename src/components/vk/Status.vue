<template>
  <div id="status">
    <div class="block">
      <h2>Настройки</h2>
      <div class="block__attr">
        <p>ID на страницу или группу</p>
        <at-input v-model="id" />
        <small>Use a negative value to designate a community ID.</small>
      </div>
      <div class="text-center">
        <!--FIXME v-if global process-->
        <at-button type="primary" @click="fetchGetStatus()">
          Получить
        </at-button>
      </div>

      <hr>
      <div class="block__result">
        <h2>Статус</h2>
        <div class="status-text">{{ status }}</div>
      </div>
      <hr>

      <div class="text-center">
        <!--FIXME v-if global process-->
        <at-button type="error">
          Очистить статус
        </at-button>
      </div>
    </div>
  </div>
</template>

<script>
import { VK } from '../../classes/VK'

export default {
  data () {
    return {
      id: null,
      status: ''
    }
  },
  mounted () {
    this.id = this.user.id
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
      const result = await VK.fetchStatusGet(this.id)

      if (result.ok && result.body.response) {
        this.status = result.body.response.text
      }
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  margin: 30px 0;
}

#status {
  max-width: 500px;
  margin: 0 auto;
}

.block__result {
  margin: 25px 0;
  .status-text {
    border-left: 5px solid #6190e8;
    padding-left: 20px;
  }
}

.text-center {
  text-align: center;
}
</style>
