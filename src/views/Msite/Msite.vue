<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="search">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="login">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys , index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <ShopList/>
  </section>
</template>
<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList.vue'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        baseImgUrl : 'https://fuss10.elemecdn.com'
      }
    },
    components : {
      ShopList
    },
    computed : {
      ...mapState(['address', 'categorys']),
      //遍历categorys生成一个二维数组 categorysArr,
      categorysArr(){
        const bigArr = [];
        let smallArr = [];
        const {categorys} = this;
        const max = 8;
        categorys.forEach(category => {
          //一开始将smallArr放入bigArr
          if(smallArr.length === 0){
            bigArr.push(smallArr)
          }
          smallArr.push(category);
          if(smallArr.length===max){
            smallArr=[];
          }
        });
        return bigArr;
      },
    },
    mounted() {
      //分发action发送Ajax请求，获取categorys数据
      this.$store.dispatch('getCategorys');
      //分发action发送Ajax请求，获取 shops 数据
      this.$store.dispatch('getShops')
    },
    watch : {
      //watch监视状态变化后，界面异步更新，但watch的回调是同步的
      //vm.$nextTick( [callback] )在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      categorys(){
        this.$nextTick(()=>{
          new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
