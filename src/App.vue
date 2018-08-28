<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  import {reqAddress} from './api'
export default {
  components : {
    FooterGuide
  },
  mounted (){
    /*const result =await reqAddress('45.10038,116.36867');
    console.log(result);*/
    this.$store.dispatch('getAddress');
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
