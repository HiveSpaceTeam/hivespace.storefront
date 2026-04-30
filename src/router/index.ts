import { createRouter, createWebHistory } from 'vue-router'
import { ServerError, Maintenance, NotFound, useAuth } from '@hivespace/shared'
import i18n from '@/i18n'

declare module 'vue-router' {
    interface RouteMeta {
        titleKey?: string
        allowAnonymous?: boolean
        layout?: string
    }
}

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
        meta: { titleKey: 'storefront.pageTitle.home', allowAnonymous: true },
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/Cart/CartPage.vue'),
        meta: { titleKey: 'storefront.pageTitle.cart', layout: 'none' },
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/Checkout/CheckoutPage.vue'),
        meta: { titleKey: 'storefront.pageTitle.checkout', layout: 'none' },
    },
    {
        path: '/product',
        name: 'Product',
        component: () => import('@/views/Product/ProductDetail.vue'),
        meta: { titleKey: 'storefront.pageTitle.product', allowAnonymous: true },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile/ProfilePage.vue'),
        meta: { titleKey: 'storefront.pageTitle.profile' },
    },
    {
        path: '/profile/address',
        name: 'ProfileAddress',
        component: () => import('@/views/Profile/AddressPage.vue'),
        meta: { titleKey: 'storefront.pageTitle.address' },
    },
    {
        path: '/orders',
        name: 'Orders',
        component: () => import('@/views/Profile/OrdersPage.vue'),
        meta: { titleKey: 'storefront.pageTitle.orders' },
    },
    {
        path: '/account/orders/:id',
        name: 'OrderDetail',
        component: () => import('@/views/Account/OrderDetailPage.vue'),
        meta: { titleKey: 'storefront.pageTitle.orderDetail' },
    },
    {
        path: '/server-error',
        name: 'ServerError',
        component: ServerError,
        meta: { titleKey: 'storefront.pageTitle.serverError', allowAnonymous: true },
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        meta: { titleKey: 'storefront.pageTitle.maintenance', allowAnonymous: true },
    },
    {
        path: '/payment/result',
        name: 'PaymentResult',
        component: () => import('@/views/Payment/PaymentResultPage.vue'),
        meta: { titleKey: 'storefront.pageTitle.paymentResult', allowAnonymous: true, layout: 'none' },
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: () => import('@/views/Notifications/NotificationsView.vue'),
        meta: { titleKey: 'storefront.pageTitle.notifications' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { titleKey: 'storefront.pageTitle.notFound', allowAnonymous: true },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    },
    routes,
})

router.beforeEach(async (to, _from, next) => {
    document.title = to.meta.titleKey ? i18n.global.t(to.meta.titleKey) : 'HiveSpace'
    // Let callback/error routes through without auth checks
    if (to.meta.allowAnonymous) {
        next()
        return
    }
    // For other routes, enforce presence of a local user; if missing, route to '/'
    const { getCurrentUser, login } = useAuth()
    const user = await getCurrentUser()
    if (!user) {
        next(false)
        await login()
        return
    }
    next()
})

export default router