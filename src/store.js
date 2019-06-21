import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex);

const auth_path = (process.env.NODE_ENV === 'production') ? 'http://62.109.25.12:3003' : 'http://localhost:3003';

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    profiles: [],
    currentProfileId: 0,
  },
  mutations: {
    pushProfile(state, profile) {
      state.profiles.push(profile)
      this._vm.$session.set('profiles[' + state.user.id + ']', state.profiles)
    },
    patchProfile(state, profile) {
      const currentItem = state.profiles.find(item => item.id === profile.id);
      currentItem.name = profile.name;
      currentItem.description = profile.description;
      currentItem.services = profile.services;
      this._vm.$session.set('profiles[' + state.user.id + ']', state.profiles)
    },
    setProfiles(state, items) {
      state.profiles = items;
      console.log("state.user.id", state.user.id);
      this._vm.$session.set('profiles[' + state.user.id + ']', state.profiles)
    },
    setProfileId(state, profileId) {
      state.currentProfileId = profileId;
      this._vm.$session.set('profileId[' + state.user.id + ']', state.currentProfileId)
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, {token, user}) {
      state.status = 'success';
      state.token = token;
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = '';
      state.token = ''
    },
  },
  actions: {
    addProfile({state, dispatch, commit, getters}, newProfile) {
      commit('pushProfile', {
        id: getters.getNextId,
        name: newProfile.name,
        description: newProfile.description,
        services: newProfile.services,
      });
    },
    patchProfile({state, dispatch, commit, getters}, newProfile) {
      commit('patchProfile', newProfile);
    },
    removeProfile({state, dispatch, commit}, profileId) {
      commit('setProfiles', state.profiles.filter(item => item.id != profileId))
    },
    emptyProfiles({commit}) {
      commit('setProfiles', [])
    },
    getProfiles({dispatch, commit, state}) {
      let items = this._vm.$session.get('profiles[' + state.user.id + ']');
      if (items) {
        commit('setProfiles', items)
      }
    },
    getProfileId({dispatch, commit, state}) {
      let id = this._vm.$session.get('profileId[' + state.user.id + ']');
      if (id) {
        commit('setProfileId', id)
      }
    },
    setProfileId({dispatch, commit}, profileId) {
      commit('setProfileId', profileId)
    },
    me({dispatch, commit, state}) {
      return new Promise((resolve, reject) => {
        console.log("process.env", process.env.NODE_ENV);
        commit('auth_request')
        axios({
          url: auth_path + '/auth/me', method: 'GET', headers: {
            'Content-Type': 'application/json',
            'x-access-token': state.token
          }
        })
          .then(resp => {
            if (resp.data.auth) {
              const token = resp.data.token
              const user = resp.data.user

              commit('auth_success', {token, user});
              dispatch('getProfiles');
              resolve(resp)
            } else {
              commit('auth_error')
              localStorage.removeItem('token')
              // reject(new Error('Something happened!'))
            }
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            // reject(err)
          })
      })
    },
    login({dispatch, commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: auth_path + '/auth/login', data: user, method: 'POST'})
          .then(resp => {
            if (resp.data.error) {
              commit('auth_error')
              localStorage.removeItem('token')
              resolve(resp)
              // reject(err)
            } else {
              // this.$root.newSession();
              const token = resp.data.token
              const user = resp.data.user
              localStorage.setItem('token', token)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', {token, user});
              dispatch('getProfiles');
              resolve(resp)
            }
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: auth_path + '/auth/register', data: user, method: 'POST'})
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', {token, user})
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    updateProfile({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: auth_path + '/auth/update_profile', data: user, method: 'POST'})
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            // commit('auth_success', {token, user})
            resolve(resp)
          })
          .catch(err => {
            // commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization'];
        // location.reload();
        resolve()
      })
    },
  },
  getters: {
    profiles: (state, getters, rootState) => {
      if (!state.token) return [];
      return state.profiles;
    },
    getItemsCount: (state, getters) => {
      if (!state.token) return 0;
      return state.profiles.length;
    },
    getProfileById: state => id => {
      return state.profiles.find(profile => profile.id === id);
    },
    getNextId: (state, getters) => {
      let max = 0;
      if (state.profiles.length > 0) {
        max = Math.max.apply(Math, state.profiles.map(function (o) {
          return o.id;
        }));
      }
      return max + 1;
    },
    profile: (state, getters) => {
      let profile = {
        name: state.user.name,
        email: state.user.email,
        phone: state.user.phone,
        city: state.user.city,
        address: state.user.address,
        inn: state.user.inn,
        site: state.user.site,
        org: state.user.org,
      }
      return profile;
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    currentUser: state => state.user.name,
    currentProfile: (state, getters) => {
      let id = parseInt(state.currentProfileId);
      let profile = state.profiles.find(profile => profile.id === id);
      if (!profile) return {
        name: "",
        discription: "",
        services: []
      };
      return profile;
    },
  }
})
