<template>
  <div class="m-header">
    <div class="icon"></div>
    <!-- <h1 class="text">小太陽4-7雜誌</h1> -->
    <!-- <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link> -->
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 53px
    // text-align: center
    color: $color-theme
    font-size: 0
    background: #f7b500
    // bg-image-jpg('47sun')
    // bg-image-jpg('header')
    // background-size: 100% 100%
    // background-size: cover
    .icon
      display: inline-block
      vertical-align: top
      // margin-top: 3px
      width: 184px
      height: 55px
      margin-left: 35px
      // padding-right: 30px
      bg-image('47sun')
      // bg-image-jpg('47sun')
      background-size: 184px 55px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>