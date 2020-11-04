import Vue from 'vue';
import App from './App.vue';
import store from './store';
import http from './api';
import router from './router';
import './common/icon/iconfont.css';
// eslint-disable-next-line import/no-unresolved
import 'lib-flexible/flexible';
Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
