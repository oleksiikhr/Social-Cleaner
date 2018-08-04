<template>
  <div class="default-layout layout">
    <header-component />
    <div id="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <footer-component />
    <media-info />
  </div>
</template>

<script>
import FooterComponent from '../../components/footer/Index'
import HeaderComponent from '../../components/header/Index'
import MediaInfo from '../../components/parts/MediaInfo'

export default {
  components: {
    HeaderComponent, FooterComponent, MediaInfo
  }
}
</script>
