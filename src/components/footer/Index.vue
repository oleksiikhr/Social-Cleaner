<template>
  <footer>
    <div class="footer__inner">
      <locale class="mw-200" />
      <router-link class="home-link" to="/">
        <i class="fa fa-home" aria-hidden="true"></i>
      </router-link>
      <github class="mw-200" />
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
