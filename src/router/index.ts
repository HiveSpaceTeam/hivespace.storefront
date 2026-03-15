import { createRouter, createWebHistory } from 'vue-router'
import { ServerError, Maintenance, NotFound } from '@hivespace/shared'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/HomePage.vue'),
        meta: { title: 'HiveSpace - Mua sắm trực tuyến' },
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/Cart/CartPage.vue'),
        meta: { title: 'Giỏ Hàng - HiveSpace', layout: 'none' },
    },
    {
        path: '/server-error',
        name: 'ServerError',
        component: ServerError,
        meta: { title: 'Server Error' },
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        meta: { title: 'Maintenance' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { title: 'Not Found' },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    },
    routes,
})

router.beforeEach((to, _from, next) => {
    document.title = `${to.meta.title || 'HiveSpace'}`
    next()
})

export default router
