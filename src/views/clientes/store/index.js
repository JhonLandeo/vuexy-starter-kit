import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        S_UPDATE_TABLE: false,
    },
    
    mutations: {
        M_UPDATE_TABLE(state, payload){
            state.S_UPDATE_TABLE = payload
        }
    },
    
}
