import Vue from "vue";
import VueTouch from 'vue-touch'
import App from "./App.vue";
import router from '@/router'
import store from '@/model'
import '@/utils/flexible' // rem布局
import '@/utils/sdk' // 分享sdk
import '@/assets/styles/reset.less' // 全局reset样式

Vue.config.productionTip = false;
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})
Vue.use(VueTouch, {name: 'v-touch'}) // vue-touch

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
