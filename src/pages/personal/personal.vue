<template>
 <div class="personal" v-if="userInfo">
     <div class="content">
         <div class="header">
             <img :src="userInfo.backgroundUrl" alt="" class="backgroundUrl">
             <div class="avatar">
                 <img :src="userInfo.avatarUrl" alt="">
         </div>
         <div class="nickname">{{userInfo.nickname}}</div>
     </div>
 </div>
 </div>
</template>

<script>
import {mapState} from 'vuex'
 export default {
   data () {
     return {

     }
   },
   created() {

   },
   methods: {

   },
   computed:{
       ...mapState(['userInfo'])
   }
 }
</script>

<style  scoped lang='stylus'>
    .personal
        .content
            .header
                .backgroundUrl
                    display inline-block
                    width 100%
                    height 500px
                .avatar
                    width 100px
                    height 100px
                    >img 
                        width 100%
                        height 100%
                        display inline-block
                        border-radius 50%

 
</style>
