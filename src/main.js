// 一定要先 import babel-polyfill
import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
// import VueAnalytics from 'vue-analytics'
import 'common/stylus/index.styl'


fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

// Vue.use(VueAnalytics, {
//   id: 'UA-105074-24',
//   autoTracking: {
//     pageviewOnLoad: false
//   }
// })

// 使用导航守卫发送统计
// router.afterEach((to, from) => {
//   if (window.gtag) {
//     window.gtag('config', 'UA-105074-24', { page_path: to.fullPath })
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
