import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决 点击同一路由，控制台报错问题，适用所有UI框架
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


const routes = [
	// 登录
	{ path: '/login', name: 'login', component: () => import('@/components/Login') },
	// 注册
	{ path: '/register', name: 'register', component: () => import('@/components/Register') },
	// 首页
	{
		path: '/', name: 'layout', redirect: '/home', component: () => import('@/components/Layout'), children: [
			{ path: '/home', meta: { title: '首页' }, name: 'home', component: () => import('@/views/home') }
		]
	},
	{
		path: '/member', component: () => import('@/components/Layout'), children: [
			{ path: '/', meta: { title: '会员管理' }, name: 'member', component: () => import('@/views/member') }
		]
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
