<template>
  <div id="app">
    <header>
      <router-link to="/" class="brand">
        Social Cleaner
        <span>{{ version }}</span>
      </router-link>
      <router-link to="/logs" class="logs">
        <!--TODO Last log (text + icon social)-->
      </router-link>
    </header>
    <div class="content">
      <router-view />
    </div>
    <footer>
      <div class="copyright">
        <span>Made with 💖 by: </span>
        <a href="https://github.com/alexeykhr" target="_blank" rel="noreferrer" title="Alexey Khrushch">
          @alexeykhr
        </a>
      </div>
      <iframe src="https://ghbtns.com/github-btn.html?user=Alexeykhr&repo=Social-Cleaner&type=star&count=true"
              frameborder="0" scrolling="0" width="110px" height="20px"></iframe>
    </footer>
  </div>
</template>

<script>
import { version } from './config'

export default {
  data () {
    return {
      version,
      menuItems: [
        { name: 'Home', to: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
body, #app {
  min-height: 100%;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  overflow: hidden;
  .brand {
    padding: 5px 20px;
    font-weight: bold;
    font-size: 1.2rem;
    color: #333;
    opacity: .7;
    text-transform: uppercase;
    transition: .2s;
    &:hover {
      opacity: 1;
    }
    > span {
      font-size: 0.7rem;
      vertical-align: top;
      opacity: 0.5;
    }
  }
  .logs {
    padding: 5px 20px;
  }
}

footer {
  display: flex;
  align-items: center;
  border-top: 1px solid #e7e7e7;
  height: 30px;
  justify-content: space-between;
  color: #a0a0a0;
  a {
    color: #868686;
    font-weight: bold;
    text-indent: 5px;
    transition: .2s;
    &:hover {
      color: #333;
    }
  }
  .copyright {
    text-indent: 15px;
    font-size: smaller;
  }
}

#app {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
