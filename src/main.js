// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
import store from './store'
import { Button } from 'mint-ui';

Vue.config.productionTip = false

Vue.component('HeaderTop',HeaderTop)
Vue.component(Button.name, Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /* components: { App },
  template: '<App/>' */
  render : h=>h(App),
  router, //为所有的组件添加$router/$route属性
  store //为所有的组件添加$store属性
})
