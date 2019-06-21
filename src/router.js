import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Dashboard from './components/Dashboard.vue'
import Settings from './components/Settings.vue'
// import Profiles from './components/Profiles.vue'

import store from './store.js'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/dashboard/:id',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
})

router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }

});

export default router
