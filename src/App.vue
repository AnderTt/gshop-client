<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {reqAddress} from './api'
  import axios from 'axios'
export default {
  components : {
    FooterGuide
  },
  mounted (){
    /*const result =await reqAddress('45.10038,116.36867');
    console.log(result);*/
    //分发一个获取当前位置的action
    this.$store.dispatch('getAddress');
    //分发一个获取用户信息的action
    this.$store.dispatch('getUser');
    axios.get('/goods')
      .then(response=>{
        console.log(response);
      })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
