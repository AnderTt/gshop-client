<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount>0}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <!--v-show="isShowCartList"这个判断不行，还需要totalCount的数量-->
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
         </div>
         <div class="list-content">
          <ul class="listUl">
            <li class="food" v-for="(cartFood,index) in cartFoods" :key="index">
              <span class="name">{{cartFood.name}}</span>
              <div class="price"><span>￥{{cartFood.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="cartFood"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow" ></div>
    </transition>
  </div>
</template>
<script>
  import {mapGetters,mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../CartControl/CartControl.vue'
  export default {
    data () {
      return {
        isShowCartList :false,
      }
    },
    components : {
      CartControl
    },
    computed : {
      ...mapGetters(['totalCount','totalPrice']),
      ...mapState(['info','cartFoods']),
      payClass(){
        const {totalPrice} = this;
        const {minPrice} = this.info;
        return minPrice > totalPrice ? 'not-enough' : 'enough';
      },
      payText(){
        const {totalPrice} = this;
        const {minPrice} = this.info;
        if(totalPrice===0){
          return `￥${minPrice}元起送`
        }else {
          return minPrice > totalPrice ? `还差${minPrice-totalPrice}元起送` : '去结算';
        }
      },
      //列表是否显示
      listShow(){
        //如果
        if(this.totalCount===0){
          //必须加上this.isShowCartList=false,因为第一次打开列表后this.isShowCartList为true,当我们手动
          // 将列表的食品数清空后，this.isShowCartList还为true，当我们在添加时，会自动打开列表，因为这时
          // this.isShowCartList为true，这不符合交互，必须加上this.isShowCartList=false
          this.isShowCartList = false;
          return false
        }

        if(this.isShowCartList){//为true，将要显示
          //单例的应用 ： 因为如果不用单例，它会count的数量变化，就会调用多次listShow,创建多个scroll，我们这里只需要一个scroll，
          // 使得我们的数量不是每次加1
          this.$nextTick(()=>{
            if(!this.scroll){
              //初始化创建的scroll对象，如果继续添加食品，高度不够，不能滑动
              this.scroll = new BScroll('.list-content',{
                click : true
              })// 此时给ul添加style属性
              //如果用v-if,打开购物车列表，再关闭样式会消失，所以只能用v-show
            } else {
              this.scroll.refresh() // 刷新(重新计算看是否需要形成滑动)
            }

          })
        }

        return this.isShowCartList
      }
    },
    methods : {
      toggleShow(){
        //这个地方必须加限定条件，因为我们在totalCount为0的时候点击下面右侧（this.isShowCartList为true），然后再添加列表，又会自动出来，
        //又会自动出来，因为这是this.isShowCartList为true
        if(this.totalCount){
          this.isShowCartList = !this.isShowCartList
        }

      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: #02a774
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active,&.move-leave-active
        transition all .5s
      &.move-enter,&.move-leave-to
        transform  translateY(0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>
