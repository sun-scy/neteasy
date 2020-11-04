<!--
 * @Author: your name
 * @Date: 2020-10-26 14:57:50
 * @LastEditTime: 2020-11-04 14:18:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \netease\src\App.vue
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
}
</style>
