
import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import router from './router'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VeeValidate);
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')