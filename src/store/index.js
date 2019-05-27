import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {constantRouterMap} from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      name: '',
      avatar: '',
      phone: '',
      sex: '',
      level: ''
    },
    addRoutes: []
  },
  mutations: {
    CHANGE_USER_INFO(state, userInfo) {
      state.userInfo = {
        ...userInfo
      }
    },
    CHANGE_ADD_ROUTES(state, addRoutes){
      state.addRoutes = addRoutes
    },
    CHANGE_NAME(state,name){
      state.userInfo.name = name
    },
    CHANGE_LEVEL(state,level){
      state.userInfo.level = level
    }
  },
  actions: {
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key),
      },
    }),
  ],
})
export default store
