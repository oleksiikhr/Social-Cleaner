<!--
@close
-->
<template>
  <div class="wall-config-result">
    <div v-if="page.response" class="page section">
      <span>{{ page.isUser ? 'User' : 'Group' }}</span>
      <div class="flex">
        <img :src="page.response.photo_100" alt="Page image" />
        <div class="info">
          <p><strong>ID:</strong> {{ page.response.id }}</p>
          <template v-if="page.isUser">
            <p><strong>Name:</strong> {{ page.response.last_name + ' ' + page.response.first_name }}</p>
          </template>
          <template v-else>
            <p><strong>Name:</strong> {{ page.response.name }}</p>
            <p><strong>Is admin:</strong> {{ page.response.is_admin ? 'Yes' : 'No' }}</p>
          </template>
          <p><a :href="linkPage" target="_blank" rel="noreferrer">Follow the link</a></p>
        </div>
      </div>
    </div>
    <div v-if="wall.response" class="wall section">
      <span>Wall</span>
      <div class="info">
        <p><strong>Count:</strong> {{ wall.response.count }}</p>
        <p><strong>Start from the first post:</strong> <a :href="linkWall" target="_blank" rel="noreferrer">Follow the link</a></p>
      </div>
    </div>
    <div class="button-out">
      <at-button type="info" @click="close()" hollow>Close</at-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wall: {
      required: false,
      type: Object
    },
    page: {
      required: false,
      type: Object
    }
  },
  computed: {
    linkPage () {
      return 'https://vk.com/' + (this.page.isUser ? 'id' : 'public') + this.page.response.id
    },
    linkWall () {
      const item = this.wall.response.items[0]

      return 'https://vk.com/wall' + item.from_id + '_' + item.id
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.wall-config-result {
  border: 1px solid #e7e7e7;
  padding: 20px;
  > * {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.section {
  > span {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: .9rem;
    margin-bottom: 20px;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .info {
    margin-left: 10px;
    > p {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.button-out {
  text-align: center;
  > button {
    max-width: 150px;
    width: 100%;
  }
}
</style>
