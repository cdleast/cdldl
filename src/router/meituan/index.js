export default [
    {
        path: '/', component: () => import('@/components/Layout'), children: [
            { path: '/meituan', meta: { title: '美团移动' }, name: 'meituan', component: () => import('@/views/meituan') }
        ]
    },
]