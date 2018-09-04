<template>
  <div>
    <div class="goods">
      <!--左侧-->
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current currentIndex当前分类的下标，当li的下标等于currentIndex时，添加current类名-->
          <li class="menu-item" v-for="(good,index) in goods"
              :class="{current : currentIndex===index}"
              @click = 'selectItem(index)'
          >
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧-->
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--购物车-->
      <ShopCart/>
    </div>
    <!--放大食物-->
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  export default {
    data(){
      return {
        scrollY : 0, //右侧滑动的距离
        tops : [],//右侧所有li的高度
        food : {} //放大展示的food
      }
    },
    components: {
      CartControl,
      Food,
      ShopCart
    },
    mounted(){
      //分发一个异步获取goods的action

      //创建BScroll对象使左右两边滚动起来
      //正常情况下，我们要监视goods的变化，并在列表更新后才创建BScroll对象，负责可能加载不出来，
      // 现在better-scroll现在的版本已经帮我们全部封装好了，我们可以直接用
      //单位保证没有一点问题，我们还是要按照之前的办法，来创建BScroll对象
      //还有一种方法：callBack + $nextTick的方法
      this.$store.dispatch('getShopGoods',()=>{
        //列表更新之后
        this.$nextTick(()=>{
          //初始化创建BScroll对象
          this._initBScroll();
          //初始化获取右侧所有li的高度
          this._initTops();
        })
      });
    },
    computed : {
      ...mapState(['goods']),
      //currentIndex是通过scrollY和tops就算而来
      currentIndex(){
        const {scrollY,tops} = this;
        const index = tops.findIndex((top,index)=>scrollY>=top && scrollY<tops[index+1]);

        // 只有当index变化时才滑动
        if(index!==BScroll.index) {
          BScroll.index = index
          this._scrollLeftList(index)
        }

        return index
      }
    },
    methods : {
      //methods里面一般都是回调函数，写一般函数时为了与它有区别通常在函数名前面加'_'
      //1.初始化创建BScroll
      _initBScroll(){
        //将这两个BScroll实例对象挂载在this上，这样在函数外面也可以使用在这两个对象
        this.leftScroll = new BScroll('.menu-wrapper',{
          click : true
        });
        this.rightScroll = new BScroll('.foods-wrapper',{
          click : true,
          probeType : 1
        });
        //给右侧添加scroll事件监听
        this.rightScroll.on('scroll',({x, y})=>{
          console.log('scroll',{x, y})
          this.scrollY = Math.abs(y)
        });
        this.rightScroll.on('scrollEnd',({x, y})=>{
          console.log('scroll',{x, y})
          this.scrollY = Math.abs(y)
        })

      },

      //2.初始化获取所有li的高度
      _initTops(){
          const lis = this.$refs.rightUl.getElementsByClassName('food-list-hook');
          const tops = [];
          let top = 0;
          tops.push(top);
          //Array.from(lis)伪数组转化为真数组ES6
          Array.prototype.slice.call(lis).forEach(li=>{
            top += li.clientHeight;
            tops.push(top);
          })
        //更新状态
        this.tops = tops;
      },

      //3.点击左侧右侧滑动到对应的位置
      selectItem(index){
        //得到目标高度
        const top = this.tops[index];
        //更新scrollY的状态,更快的定位到相应的位置
        this.scrollY = top;
        //右侧滑动到top高度出,其实就是改变scrollY的值
        this.rightScroll.scrollTo(0,-top,300)
      },

      // 4.滑动左侧列表到指定下标分类处(尽量, 至少保证可见)
      _scrollLeftList(index){
        //此方法在computed属性中调用，computed属性初始时也会计算，而我们的leftScroll是在列表更新之后创建的，
        // 所以如果不判断有没有，会报错
        if(this.leftScroll){
          const li = this.$refs.leftUl.children[index];
          this.leftScroll.scrollToElement(li,300)
        }
      },

      //5.点击右侧li显示放大的food详情
      showFood(food){
        this.food = food;
        //调用food组件的toggleShowFood方法，通过this.$refs.food获取组件对象，从而调用组件对象上的方法
        this.$refs.food.toggleShowFood();
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 275px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

