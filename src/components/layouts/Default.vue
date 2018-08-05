<template>
  <div class="default-layout layout">
    <header-component />
    <div id="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <footer-component />
    <networks-info />
  </div>
</template>

<script>
import NetworksInfo from '../../components/parts/NetworksInfo'
import FooterComponent from '../../components/footer/Index'
import HeaderComponent from '../../components/header/Index'

export default {
  components: {
    HeaderComponent, FooterComponent, NetworksInfo
  }
}
</script>
