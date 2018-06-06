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
import err404 from '../components/404.vue'
import Reset from '../components/reset.vue'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      name: 'wrapper',
      path: '/',
      redirect: '/report',
      component: Wrapper,
      children: [{
        name: 'map',
        path: 'map',
        component: IMap
      }, {
        name: 'report',
        path: 'report',
        component: Report
      }, {
        name: 'query',
        path: 'query',
        component: Query
      }, {
        name: 'mine',
        path: 'mine',
        component: Mine
      }]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'findPsw',
      path: '/findPsw',
      component: ForgetPsw
    }, {
      name: 'set',
      path: '/:uid/set',
      component: Set,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'myReports',
      path: '/:uid/myReports',
      component: MyReports,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'reportDetail',
      path: '/reportDetail',
      component: ReportDetail
    },
    {
      name: 'resetPsw',
      path: '/reset/:tokon',
      component: Reset
    },
    {
      name: '404',
      path: '*',
      component: err404
    }
  ]
})


router.beforeEach((to, from, next) => {
  var sel = to.path.split('/')[1]
  if (sel) {
    store.commit('changeSel', sel)
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.logined) {
      alert('未登录！')
      next({
        name: 'login',
        replace: true
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})


export default router
