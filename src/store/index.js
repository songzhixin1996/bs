import Vue from 'vue'
import Vuex from 'vuex'
// import Mutation from './mutation'
/* eslint-disable */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected: 'map',
    logined: true
  },
  mutations: {
    changeSel(state, payload) {
      state.selected = payload
    }
  }
})
