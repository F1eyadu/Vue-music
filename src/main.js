import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/js/rem'
import './assets/scss/index'
import fastClick from 'fastclick'
fastClick.attach(document.body)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
