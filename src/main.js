import Vue from 'vue'
import ElementUI from 'element-ui' // ElementUI 组件库
import 'element-ui/lib/theme-chalk/index.css' // ElementUI 样式
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 全局使用
Vue.use(ElementUI)
Vue.prototype.$axios = axios

Vue.config.productionTip = process.env.NODE_ENV === 'production'
// console.log(process.env.VUE_APP_SERVICE_URL) // 开发环境 development, 生产环境 production 

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
