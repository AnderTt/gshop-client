<template>
    <div>
      <ShopHeader/>
      <div class="tab">
        <div class="tab-item">
          <!--设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。-->
          <router-link to="/shop/goods" replace>点餐</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/ratings" replace>评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/info" replace>商家</router-link>
        </div>
      </div>
      <router-view/>
    </div>
</template>
<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
  export default {
    components : {
      ShopHeader
    },
    mounted(){
      //分发一个异步获取商家详情的action
      this.$store.dispatch('getShopInfo');
      //分发一个异步获取商家评论的action
      this.$store.dispatch('getShopRatings');
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
