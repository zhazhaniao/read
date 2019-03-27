import Vue from 'vue'
import {Swipe,SwipeItem, Button, Cell } from 'mint-ui'
// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/css/reset.css'
import '../public/css/style.css'
// import '../public/js/rem'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button)
// Vue.component(Cell.name, Cell)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
