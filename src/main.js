// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  Tabbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Field,
  Button,
  Header,
  Cell,
  Loadmore
} from 'mint-ui'

Vue.prototype.$axios = axios
Vue.component('m-tabContainer', TabContainer)
Vue.component('m-tabContainerItem', TabContainerItem)
Vue.component('m-tabbar', Tabbar)
Vue.component('m-tabItem', TabItem)
Vue.component('m-field', Field)
Vue.component('m-button', Button)
Vue.component('m-header', Header);
Vue.component('m-cell', Cell);
Vue.component('m-loadmore', Loadmore);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
