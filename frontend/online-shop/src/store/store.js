import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            username: null,
            email: null,
            token: null,
            admin: null 
        } 
    },
    mutations: {
        login: (state, user) => {
            state.user = user
            localStorage.setItem('online-shop_user', JSON.stringify(state.user))
        },
        logout: (state) => {
            state.user = {
                username: null,
                email: null,
                token: null,
                admin: null 
            }
            localStorage.removeItem('online-shop_user')
        },
        initialize: (state) => {
            if (localStorage.getItem('online-shop_user')) {
                state.user = JSON.parse(localStorage.getItem('online-shop_user'))
            }
        }
    }
})