<template>
  <div id="app" :class="appClass">
    <loading-component />
    <header-component />
    <div id="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <footer-component />
  </div>
</template>

<script>
import LoadingComponent from './components/parts/Loading'
import FooterComponent from './components/footer/Index'
import HeaderComponent from './components/header/Index'

export default {
  components: {
    HeaderComponent, FooterComponent, LoadingComponent
  },
  computed: {
    appClass () {
      return this.$store.state.template.appClass
    }
  }
}
</script>

<style lang="scss">
/*TODO Go to scss file*/

body {
  background: #fbfbfb;
  min-height: 100%;
}

hr {
  margin: 30px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
}

#app {
  display: flex;
  flex-direction: column;
  background: #fff;
  min-height: 100%;
  border: 1px solid #e7e7e7;
  border-top: none;
  border-bottom: none;
  max-width: 1200px;
  margin: 0 auto;
}

#content {
  flex-grow: 1;
  padding: 30px 20px;
  #vk {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
}

// Home page
#app.landing-page {
  min-height: 100%;
  background: linear-gradient(to left, #525252, #3d72b4);
  max-width: none !important;
  border: none;
  > #content {
    padding: 0;
  }
  > header {
    display: none;
  }
  > footer {
    border: none;
    padding: 10px 0;
  }
  .footer__inner {
    margin: 0 auto;
    max-width: 1600px;
    padding: 0 20px;
    a, span, .github__name, .language__name {
      color: rgba(255, 255, 255, .9);
    }
    .github__start, .github__forks, .language__current {
      color: rgba(255, 255, 255, .7);
    }
    .lang-item {
      color: #868686;
    }
  }
}

// Component (Block)
.block {
  max-width: 500px;
  margin: 30px auto 0;
  border-top: 1px solid #e0e0e0;
  padding-top: 30px;
  &:first-child {
    margin-top: 0;
    border-top: 0;
    padding-top: 0;
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .block__attr {
    margin-bottom: 15px;
    p {
      margin-bottom: 5px;
      font-weight: bold;
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      font-weight: bold;
      .status {
        position: relative;
        margin: 0;
        &:after {
          font-size: .6rem;
          vertical-align: top;
          margin-left: 4px;
        }
        &.status-on:after {
          content: 'ON';
          color: #0dad54;
        }
        &.status-off:after {
          content: 'OFF';
          color: #ff8080;
        }
      }
      .compare {
        font-size: .7rem;
        text-transform: uppercase;
      }
    }
    .flex {
      align-items: center;
      > .at-input {
        margin: 0 10px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .at-checkbox {
      margin: 5px;
    }
    .at-radio {
      margin: 5px;
      > .at-radio__label {
        font-size: 13px;
      }
    }
  }
}

// Help css
.text-center {
  text-align: center;
}
</style>
