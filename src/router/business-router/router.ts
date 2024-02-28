import { component } from 'v-viewer';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '',
        redirect: '/login'  // 重定向
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/layout',
        name: 'layout',
        component: () => import('@/views/layout/index.vue'),
        redirect: '/layout/main',  // 重定向（这个属性的值要写全，有几层是几层）
        children: [//嵌套二级子路由
            {
                path: 'main',
                name: 'main',
                meta: { title: '主入口' },
                component: () => import('@/views/business/main/main.vue')
            },
        ]
    }
];

export default routes;

