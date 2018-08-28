import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../views/Msite/Msite.vue'
import Search from '../views/Search/Search.vue'
import Order from '../views/Order/Order.vue'
import Profile from '../views/Profile/Profile.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes : [
    {
      path : '/msite',
      component : Msite
    },
    {
      path : '/search',
      component : Search
    },
    {
      path : '/order',
      component : Order
    },
    {
      path : '/profile',
      component : Profile
    },
    {
      path : '/',
      redirect : '/msite'
    },
  ]
})
