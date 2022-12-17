import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import client from '@/views/clientes/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    client,
  },
  

  strict: process.env.DEV,
})
