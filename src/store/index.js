import Vue from 'vue'
import Vuex from 'vuex'
// import Mutation from './mutation'
/* eslint-disable */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected: 'map',
    logined: false,
    name: '',
    username: '',
    age: '',
    motto: '',
    email: '',
    reports: []
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
    setName(state, payload) {
      state.name = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setAge(state, payload) {
      state.age = payload
    },
    setMotto(state, payload) {
      state.motto = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
    setReports(state, payload) {
      state.reports = payload
    }
  }
})
