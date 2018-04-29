<template>
  <div id="app">
    <at-menu theme="dark" router>
      <at-menu-item :to="{ name: 'home' }"><i class="icon icon-home"></i>Home</at-menu-item>
      <at-submenu>
        <template slot="title">VK</template> <!--FIXME Icon-->
        <at-menu-item :to="{ name: 'vk-token' }">Token</at-menu-item>
      </at-submenu>
    </at-menu>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
