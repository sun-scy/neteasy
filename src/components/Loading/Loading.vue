<!--
 * @Author: your name
 * @Date: 2020-10-27 13:46:18
 * @LastEditTime: 2020-10-27 14:18:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \netease\src\components\Loading\Loading.vue
-->

<template>
 <div class="loading">
     <i class="iconfont icon-loading1"></i>
 </div>
</template>

<script>
 export default {
   data () {
     return {
        
     }
   },
   created() {

   },
   methods: {

   }
 }
</script>
 <style lang="stylus" scoped>
    .loading
      width 100vw
      height 100vh
      position fixed
      background-color rgba(255,255,255,.5)
      top 0
      left 0
      .iconfont
        display inline-block
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        font-size 24px
        animation transfrom3d infinite 1.8s linear
      @keyframes transfrom3d {
        0%{-webkit-transform:rotate(0deg);}
        25%{-webkit-transform:rotate(90deg);}
        50%{-webkit-transform:rotate(180deg);}
        75%{-webkit-transform:rotate(270deg);}
        100%{-webkit-transform:rotate(360deg);}
      }
</style>
