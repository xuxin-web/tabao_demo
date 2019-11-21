import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import { Lazyload,Toast} from 'vant';
// import fastclick from 'fastclick';
// fastclick.attach(document.body);


Vue.use(Lazyload,{
  preload:1, //什么时候显示图片
  error:require("@/assets/img/error.png"),
  loading: require('@/assets/img/loading.gif')
});
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
