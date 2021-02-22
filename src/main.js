import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
Vue.use(VueTheMask)
Vue.use(money, {precision: 2})
Vue.config.productionTip = false
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
