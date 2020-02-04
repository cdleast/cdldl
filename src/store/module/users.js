// 设置属性，主要承载一些属性，存储数据的
const state = {
    users: {}
}

// 对应的一些方法,用来获取到属性(state)的状态
const getters = {
    getUsers: state => {
        return state.users;
    },
}

// 主要用来更改属性(state)的状态，完全是同步的操作
const mutations = {
    GET_USER(state, users) {
        state.users = users
    }
}

// 不直接操作，应用mutations，可以实现异步的操作
const actions = {
    getUsers({ commit }, users) {
        commit('GET_USER', users)
    }
}

// 暴露对象，让其他页面可以拿到
export default {
    state,
    getters,
    mutations,
    actions
}