<template>
  <a :href="linkUser" target="_blank" rel="noopener" class="user">
    <div class="user__left">
      <div class="user__image">
        <img :src="user.photo_100" :alt="name">
      </div>
    </div>
    <div class="user__right">
      <div class="user__name">{{ name }}</div>
      <div class="user-info">
        <div class="user__counters">
          <div :class="`user__counter ${attribute}`" v-for="(attribute, key) in atributes" :key="key">
            <span class="user__counter-name">{{ $t(`vk.scope.${attribute}`)}}</span>
            <span class="user__counter-value">{{ user.counters[attribute] }}</span>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import VK from '../../../media/VK'

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
    },
    linkUser () {
      return VK.getLinkUser()
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  margin: 0 auto;
  border: 1px solid #e7e7e7;
  background: #fbfbfb;
  padding: 20px;
  color: rgba(0, 0, 0, .7);
  transition: .3s;
  &:hover {
    color: rgba(0, 0, 0, .9);
  }
}

.user__left {
  line-height: 0;
  margin-right: 20px;
}

.user__name {
  font-weight: bold;
  font-size: 1rem;
  text-align: center;
  border-bottom: 1px solid #e7e7e7;
  margin: 0 20px 5px;
  padding-bottom: 5px;
}

.user__image {
  > img {
    max-width: 100px;
    max-height: 100px;
  }
}

.user__counters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.user__counter {
  display: flex;
  flex-direction: column;
  margin: 5px 9px;
  text-align: center;
  &-name {
    font-weight: bold;
    font-size: .8rem;
  }
}

@media screen and (max-width: 700px) {
  .user {
    flex-direction: column;
  }

  .user__left {
    margin-bottom: 10px;
    margin-right: 0;
  }

  .user__name {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
}
</style>
