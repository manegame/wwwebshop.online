import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import Splash from '@/components/Splash'
// import Countdown from '@/components/Countdown'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
