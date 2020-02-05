import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along' // 持久化存储 state 的 vuex 扩展
import users from './module/users' // 登录用户
import member from './module/member' // 会员管理
import order from './module/order' // 点餐系统

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        users, member, order
    },
    plugins: [createVuexAlong()]
})

export default store