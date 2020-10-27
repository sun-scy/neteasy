import Vue from 'vue'
import App from './App.vue'
import http from  './api'
import router from './router'
import './common/icon/iconfont.css'
Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')