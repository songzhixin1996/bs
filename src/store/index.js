import Vue from 'vue'
import Vuex from 'vuex'
// import Mutation from './mutation'
/* eslint-disable */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected: '',
    logined: false,
    reports: {},
    userInfo: {}
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
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setReports(state, payload) {
      state.reports = payload
    }
  }
})
