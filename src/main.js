import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'

import VueSession from 'vue-session'
Vue.use(VueSession, {
  persist: true
});

import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

const token = localStorage.getItem('user-token')
if (token) {
  Vue.http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false;


new Vue({
  store,
  components: {},
  router,
  data() {
    return {
    }
  },
  render: h => h(App),
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    currentUser : function(){ return this.$store.getters.currentUser},
    profiles : function(){ return this.$store.getters.profiles}
  },
  methods: {
    newSession: function () {
      this.$session.start();
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/');
        })
    }
  },
  watch: {
    '$route' (to, from) {
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });

    if (!this.$session.exists()) {
      this.$session.start();
    }
    this.$store.dispatch('me')
    this.$store.dispatch('getProfiles');
  }
}).$mount('#app');
