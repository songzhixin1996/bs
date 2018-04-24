import Vue from 'vue'
import Vuex from 'vuex'
// import Mutation from './mutation'
/* eslint-disable */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showNav: true,
    showBack: false
  },
  mutations: {
    showNav(state) {
      state.showNav = true;
    },
    noShowNav(state) {
      state.showNav = false;
    },
    showBack(state) {
      state.showBack = true;
    },
    noShowBack(state) {
      state.showBack = false;
    }
  }
})
