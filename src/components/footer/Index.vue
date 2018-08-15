<template>
  <footer>
    <div class="footer__inner">
      <locale class="mw--200" />
      <router-link class="home-link" to="/">
        <i class="fa fa-home" aria-hidden="true"></i>
      </router-link>
      <github class="mw--200" />
    </div>
  </footer>
</template>

<script>
import Locale from './parts/Locale'
import Github from './parts/Github'

export default {
  components: {
    Github, Locale
  }
}
</script>

<style lang="scss" scoped>
footer {
  .footer__inner {
    .home-link {
      line-height: 0;
      font-size: 1.3rem;
      font-weight: bold;
      transition: .2s;
    }
  }
}
</style>
