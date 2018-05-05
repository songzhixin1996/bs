import Vue from 'vue'
import Vuex from 'vuex'
// import Mutation from './mutation'
/* eslint-disable */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected: 'map',
    logined: false
  },
  mutations: {
    changeSel(state, payload) {
      state.selected = payload
    },
    login(state) {
      state.logined = true
    },
    logoff(state) {
      state.logined = false
    }
  }
})
