import request from '@/utils/request'

export default {
    // 注册账户
    register(registerUser) {
        return request({
            url: '/register',
            method: 'post',
            data: registerUser
        })
    },

    // 获取注册账户
    getRegister() {
        return request({
            url: '/register',
            method: 'get'
        })
    },

    // 登录用户
    login(loginUser) {
        return request({ // Promise
            url: '/login',
            method: 'post',
            data: loginUser
        })
    },

    // 获取token
    getUserInfo(token) {
        return request({
            url: `/register/${token}`,
            method: 'get'
        })
    }

}