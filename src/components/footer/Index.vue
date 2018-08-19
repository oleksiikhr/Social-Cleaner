<template>
  <footer>
    <div class="footer__inner">
      <locale class="footer__inner-block" />
      <router-link class="home-link" to="/" :title="$t('app.footer.home_link')">
        <i class="fa fa-home" aria-hidden="true"></i>
      </router-link>
      <github class="footer__inner-block" />
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
.home-link {
  line-height: 0;
  font-size: 1.3rem;
  font-weight: bold;
  transition: .2s;
}

.footer__inner-block {
  min-width: 200px;
}

@media screen and (max-width: 600px) {
  .footer__inner-block {
    min-width: unset !important;
  }
}

@media screen and (max-width: 550px) {
  .footer__inner-block {
    padding: 8px;
  }
}
</style>
