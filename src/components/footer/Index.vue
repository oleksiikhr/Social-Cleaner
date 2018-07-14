<template>
  <footer :class="color">
    <div class="footer__inner">
      <locale :color="color" class="mw--200" />
      <router-link class="home-link" to="/">
        <i class="fa fa-home" aria-hidden="true"></i>
      </router-link>
      <github :color="color" class="mw--200" />
    </div>
  </footer>
</template>

<script>
import Locale from './parts/Locale'
import Github from './parts/Github'

export default {
  props: {
    color: {
      type: String,
      required: false
    }
  },
  components: {
    Github, Locale
  }
}
</script>

<style lang="scss" scoped>
footer {
  border-top: 1px solid #e7e7e7;
  .footer__inner {
    display: flex;
    align-items: center;
    margin: 0 20px 1px;
    min-height: 42px;
    justify-content: space-between;
    color: #a0a0a0;
    .home-link {
      line-height: 0;
      font-size: 1.3rem;
      color: #868686;
      font-weight: bold;
      transition: .2s;
      &:hover {
        color: #333;
      }
    }
  }
}

footer.white {
  border-top: none;
  .home-link {
    color: rgba(255, 255, 255, .8);
    &:hover {
      color: #fff;
    }
  }
}
</style>
