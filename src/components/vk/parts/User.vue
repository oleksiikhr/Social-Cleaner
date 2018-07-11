<template>
  <div class="user">
    <div class="user__image">
      <img :src="user.photo_100" :alt="name">
    </div>
    <div class="user-info">
      <div class="user__id">
        {{ user.id }}
      </div>
      <div class="user__name">
        {{ name }}
      </div>
      <div class="user__counters">
        <div :class="`user__counter ${attribute}`" v-for="(attribute, key) in atributes" :key="key">
          <!--TODO Design-->
          <span class="user__counter-name">{{ $t(`vk.scope.${attribute}`)}}:</span>
          <span class="user__counter-value">{{ user.counters[attribute] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      atributes: [
        'albums', 'audios', 'notes', 'photos', 'groups', 'gifts', 'friends',
        'user_photos', 'followers', 'subscriptions', 'pages'
      ]
    }
  },
  computed: {
    name () {
      return `${this.user.last_name} ${this.user.first_name}`
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
}

.user__image {
  > img {
    max-width: 100px;
    max-height: 100px;
  }
}
</style>
