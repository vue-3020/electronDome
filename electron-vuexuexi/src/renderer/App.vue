<template>
  <div id="app">
      自定义菜单
      <MyHeader></MyHeader>

    <router-view></router-view>
  </div>
</template>

<script>
 import MyHeader from './components/MyHeader.vue';
  export default {
    name: 'my-electron-vue',
    components:{

     MyHeader
    }
  }
</script>

<style>
  /* CSS */
</style>
