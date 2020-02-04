export default [
    {
        path: '/', component: () => import('@/components/Layout'), children: [
            {
                path: '/order',redirect:'/orderMenu', meta: { title: '点餐系统' }, name: 'order', component: () => import('@/views/order'), children: [
                    { path: '/orderMenu', meta: { title: '菜单管理' }, name: 'orderMenu', component: () => import('@/views/order/orderMenu') },
                    { path: '/orderChild2', meta: { title: '点餐系统子级2' }, name: 'orderChild2', component: () => import('@/views/order/orderChild2') }
                ]
            }
        ]
    },
]