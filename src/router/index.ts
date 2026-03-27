import { createRouter, createWebHistory } from 'vue-router'
import { ServerError, Maintenance, NotFound } from '@hivespace/shared'

const routes = [
    {
        path: '/callback/logout',
        name: 'LogoutCallback',
        component: () => import('@/views/Callback/LogoutCallback.vue'),
        meta: { allowAnonymous: true },
    },
    {
        path: '/callback/login',
        name: 'Callback',
        component: () => import('@/views/Callback/LoginCallback.vue'),
        meta: { allowAnonymous: true },
    },
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
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/Checkout/CheckoutPage.vue'),
        meta: { title: 'Thanh Toán - HiveSpace', layout: 'none' },
    },
    {
        path: '/product',
        name: 'Product',
        component: () => import('@/views/Product/ProductDetail.vue'),
        meta: { title: 'HiveSpace - Mua sắm trực tuyến' },
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
