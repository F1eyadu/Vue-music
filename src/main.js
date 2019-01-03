import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/js/rem'
import './assets/scss/index'
import './assets/iconfont/iconfont.css'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/images/default.png')
})
fastClick.attach(document.body)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
