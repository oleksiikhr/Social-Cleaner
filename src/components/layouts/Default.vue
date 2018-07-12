<template>
  <div class="default-layout layout">
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
import LoadingComponent from '../../components/parts/Loading'
import FooterComponent from '../../components/footer/Index'
import HeaderComponent from '../../components/header/Index'

export default {
  components: {
    HeaderComponent, FooterComponent, LoadingComponent
  }
}
</script>
