<template>
  <div class="start">
    <div
      class="heart"
      :class="[isShow ? 'animation' : 'leftanimation']"
      @click="animation"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    animation() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped lang='stylus'>
    .start
        .heart
            background-image url('http://panjiachen.github.io/warehouse/twitterLike/images/web_heart_animation.png')
            width 50px
            height 50px
            background-repeat no-repeat
            background-position left  
            background-size cover
            overflow hidden
        .animation
            animation start 1s steps(28) 
            animation-fill-mode: forwards;
        @keyframes start {
            to{
                background-position right
            }
        }
        .leftanimation
            animation end 1s steps(28)
        @keyframes end {
            to{
                background-position left
            }
        }
</style>
