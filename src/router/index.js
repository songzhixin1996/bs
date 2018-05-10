/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import IMap from '../components/map.vue'
import Report from '../components/report.vue'
import Query from '../components/query.vue'
import Mine from '../components/mine.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import ForgetPsw from '../components/forgetPsw.vue'
import Wrapper from '../components/wrapper.vue'
import Set from '../components/set.vue'
import MyReports from '../components/myReports.vue'
import ReportDetail from '../components/reportDetail.vue'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/user/report'
  }, {
    path: '/user',
    component: Wrapper,
    children: [{
      path: 'map',
      component: IMap
    }, {
      path: 'report',
      component: Report
    }, {
      path: 'query',
      component: Query
    }, {
      path: 'mine',
      component: Mine
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }, {
    path: '/findPsw',
    component: ForgetPsw
  }, {
    path: '/:uid/set',
    component: Set
  }, {
    path: '/:uid/myReports',
    component: MyReports
  }, {
    path: '/:uid/reportDetail',
    component: ReportDetail
  }]
})

router.afterEach((to, from) => {
  var s = to.path.split('/')[2]
  if (s) {
    store.commit('changeSel', s)
  }
})

// router.beforeEach((to, from, next) => {

// })

// const router = new Router({
//   mode: 'history',
//   routes: [{
//     path: '/',
//     redirect: '/report'
//   }, {
//     path: '/map',
//     component: IMap
//   }, {
//     path: '/report',
//     component: Report
//   }, {
//     path: '/query',
//     component: Query
//   }, {
//     path: '/mine',
//     component: Mine
//   }, {
//     path: '/login',
//     component: Login,
//     beforeEnter: (to, from, next) => {
//       console.log('before: ' + store.state.showNav)
//       store.commit('noShowNav')
//       store.commit('showBack')
//       console.log(store.state.showNav)
//       next()
//     }
//   }, {
//     path: '/register',
//     component: Register
//   }, {
//     path: '/forgetPsw',
//     component: ForgetPsw
//   }]
// })

export default router
