// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Home from './components/Home'
// import Splash from './components/Splash'
// import Countdown from './components/Countdown'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueYouTubeEmbed)

Vue.filter('two_digits', function (value) {
  if (value.toString().length <= 1) {
    return '0' + value.toString()
  }
  return value.toString()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
    Home
    // Splash,
    // Countdown
  }
})
