export default [
    {
        path: '/pages', component: () => import('@/components/Layout'), children: [
            {
                path: '/', meta: { title: '功能管理' }, name: 'pages', component: () => import('@/pages/index'), children: [
                    { path: '/screening', meta: { title: '分类筛选器', activeChild: '/pages' }, name: 'screening', component: () => import('@/pages/screening') },
                    { path: '/fuzzySearch', meta: { title: '多条件和模糊查询', activeChild: '/pages' }, name: 'fuzzySearch', component: () => import('@/pages/fuzzySearch') },
                    { path: '/mohuSearch', meta: { title: '模糊查询', activeChild: '/pages' }, name: 'mohuSearch', component: () => import('@/pages/mohuSearch') },
                ]
            }
        ]
    },
]