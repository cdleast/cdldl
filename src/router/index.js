import Vue from 'vue'
import VueRouter from 'vue-router'
import users from './users' // 登录注册
import pages from './pages' // 功能展示


Vue.use(VueRouter)


const routes = [
	...users, ...pages,
	{
		path: '/', name: 'layout', redirect: '/home', component: () => import('@/components/Layout'), children: [
			{ path: '/home', meta: { title: '首页' }, name: 'home', component: () => import('@/views/home') },
			{ path: '/member', meta: { title: '会员管理' }, name: 'member', component: () => import('@/views/member') },
		]
	},

]


// 解决 点击同一路由，控制台报错问题，适用所有UI框架
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
