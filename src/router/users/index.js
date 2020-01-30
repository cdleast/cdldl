export default [
    // 登录
    { path: '/login', name: 'login', component: () => import('@/components/Login') },
    
    // 注册
    { path: '/register', name: 'register', component: () => import('@/components/Register') },

]