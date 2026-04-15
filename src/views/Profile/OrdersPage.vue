<template>
  <div class="min-h-screen bg-[#f5f5f5] dark:bg-surface-dark py-6">
    <div class="container mx-auto px-4">
      <div class="flex gap-4 items-start">

        <!-- Sidebar -->
        <aside class="w-52 shrink-0">
          <div class="bg-white dark:bg-card-dark rounded shadow-sm overflow-hidden">
            <!-- User info -->
            <div class="flex items-center gap-3 px-4 py-5 border-b border-gray-100 dark:border-gray-700">
              <Avatar size="medium" />
              <div class="min-w-0">
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {{ displayUsername }}
                </p>
                <RouterLink to="/profile"
                  class="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors mt-0.5">
                  <Pencil class="w-3 h-3" />
                  {{ $t('storefront.profilePage.editProfile') }}
                </RouterLink>
              </div>
            </div>

            <!-- Nav -->
            <nav class="py-2">
              <RouterLink to="/notifications"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Bell class="w-4 h-4 shrink-0" />
                {{ $t('storefront.profilePage.navNotifications') }}
              </RouterLink>

              <div>
                <button @click="accountOpen = !accountOpen"
                  class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <User class="w-4 h-4 shrink-0 text-primary" />
                  <span class="flex-1 text-left">{{ $t('storefront.profilePage.navMyAccount') }}</span>
                  <ChevronDown class="w-3.5 h-3.5 transition-transform" :class="accountOpen ? 'rotate-180' : ''" />
                </button>
                <div v-show="accountOpen" class="pl-11 pr-3 pb-1 flex flex-col gap-0.5">
                  <RouterLink to="/profile"
                    class="block px-3 py-1.5 text-sm rounded transition-colors text-gray-500 dark:text-gray-400 hover:text-primary">
                    {{ $t('storefront.profilePage.navProfile') }}
                  </RouterLink>
                  <RouterLink to="/profile/address"
                    class="block px-3 py-1.5 text-sm rounded transition-colors text-gray-500 dark:text-gray-400 hover:text-primary">
                    {{ $t('storefront.profilePage.navAddress') }}
                  </RouterLink>
                  <RouterLink to="/profile/change-password"
                    class="block px-3 py-1.5 text-sm rounded transition-colors text-gray-500 dark:text-gray-400 hover:text-primary">
                    {{ $t('storefront.profilePage.navChangePassword') }}
                  </RouterLink>
                </div>
              </div>

              <RouterLink to="/orders"
                class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-primary">
                <ShoppingBag class="w-4 h-4 shrink-0 text-primary" />
                {{ $t('storefront.profilePage.navMyOrders') }}
              </RouterLink>
            </nav>
          </div>
        </aside>

        <!-- Main content -->
        <div class="flex-1 min-w-0">

          <!-- Tab bar -->
          <div class="bg-white dark:bg-card-dark rounded shadow-sm mb-3 overflow-x-auto">
            <div class="flex border-b border-gray-100 dark:border-gray-700 min-w-max">
              <button
                v-for="tab in tabs"
                :key="tab.value"
                @click="ordersStore.setTab(tab.value)"
                class="px-5 py-4 text-sm whitespace-nowrap transition-colors border-b-2 -mb-px"
                :class="activeTab === tab.value
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-primary'"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Search bar -->
          <div class="bg-white dark:bg-card-dark rounded shadow-sm mb-3 px-4 py-3">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                :value="searchQuery"
                @input="ordersStore.setSearchQuery(($event.target as HTMLInputElement).value)"
                :placeholder="$t('storefront.ordersPage.searchPlaceholder')"
                class="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <!-- Loading -->
          <div v-if="isLoading" class="flex justify-center py-16">
            <Spinner />
          </div>

          <!-- Empty state -->
          <div
            v-else-if="filteredOrders.length === 0"
            class="bg-white dark:bg-card-dark rounded shadow-sm py-16 flex flex-col items-center text-gray-400 gap-3"
          >
            <ShoppingBag class="w-16 h-16 opacity-30" />
            <p class="text-sm">{{ $t('storefront.ordersPage.emptyOrders') }}</p>
          </div>

          <!-- Order cards -->
          <div v-else class="flex flex-col gap-3">
            <div
              v-for="order in filteredOrders"
              :key="order.id"
              class="bg-white dark:bg-card-dark rounded shadow-sm overflow-hidden"
            >
              <!-- Shop header -->
              <div class="flex items-center gap-2 px-5 py-3 border-b border-gray-100 dark:border-gray-700">
                <component
                  v-if="order.shopBadge"
                  :is="'span'"
                  class="text-[10px] font-semibold px-1.5 py-0.5 rounded border border-primary text-primary"
                >
                  {{ order.shopBadge }}
                </component>
                <span class="text-sm font-medium text-gray-800 dark:text-gray-100">{{ order.shopName }}</span>
                <button class="flex items-center gap-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded hover:border-primary hover:text-primary transition-colors">
                  <Store class="w-3 h-3" />
                  {{ $t('storefront.ordersPage.viewShop') }}
                </button>
                <button class="flex items-center gap-1 text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded hover:border-primary hover:text-primary transition-colors">
                  <MessageCircle class="w-3 h-3" />
                  {{ $t('storefront.ordersPage.chat') }}
                </button>

                <!-- Status (right side) -->
                <div class="ml-auto flex items-center gap-2 text-xs text-gray-400">
                  <template v-if="order.status === 'completed'">
                    <span class="flex items-center gap-1">
                      <Truck class="w-3.5 h-3.5" />
                      {{ $t('storefront.ordersPage.deliverySuccess') }}
                    </span>
                    <span class="text-gray-300">|</span>
                    <span class="text-primary font-semibold uppercase tracking-wide">
                      {{ $t('storefront.ordersPage.statusCompleted') }}
                    </span>
                  </template>
                  <template v-else-if="order.status === 'cancelled'">
                    <span class="text-gray-400 font-semibold uppercase tracking-wide">
                      {{ $t('storefront.ordersPage.statusCancelled') }}
                    </span>
                  </template>
                  <template v-else-if="order.status === 'shipping'">
                    <span class="text-blue-500 font-semibold uppercase tracking-wide">
                      {{ $t('storefront.ordersPage.statusShipping') }}
                    </span>
                  </template>
                  <template v-else-if="order.status === 'pending_payment'">
                    <span class="text-orange-500 font-semibold uppercase tracking-wide">
                      {{ $t('storefront.ordersPage.statusPendingPayment') }}
                    </span>
                  </template>
                  <template v-else-if="order.status === 'pending_delivery'">
                    <span class="text-yellow-500 font-semibold uppercase tracking-wide">
                      {{ $t('storefront.ordersPage.statusPendingDelivery') }}
                    </span>
                  </template>
                  <template v-else-if="order.status === 'return_refund'">
                    <span class="text-red-500 font-semibold uppercase tracking-wide">
                      {{ $t('storefront.ordersPage.statusReturnRefund') }}
                    </span>
                  </template>
                </div>
              </div>

              <!-- Product items -->
              <div class="px-5 py-3 flex flex-col gap-4">
                <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex items-start gap-3"
                >
                  <img
                    :src="item.imageUrl"
                    :alt="item.productName"
                    class="w-20 h-20 object-cover rounded border border-gray-100 dark:border-gray-700 shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-800 dark:text-gray-100 line-clamp-2">{{ item.productName }}</p>
                    <p class="text-xs text-gray-400 mt-1">{{ item.variantLabel }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">{{ $t('storefront.ordersPage.qty', { qty: item.quantity }) }}</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p v-if="item.originalPrice && item.originalPrice !== item.finalPrice"
                      class="text-xs text-gray-400 line-through">
                      {{ formatPrice(item.originalPrice) }}
                    </p>
                    <p class="text-sm text-gray-800 dark:text-gray-100">{{ formatPrice(item.finalPrice) }}</p>
                  </div>
                </div>
              </div>

              <!-- Total row -->
              <div class="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-end items-center gap-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t('storefront.ordersPage.total') }}</span>
                <span class="text-base font-semibold text-primary">{{ formatPrice(order.totalPrice) }}</span>
              </div>

              <!-- Footer info + action buttons -->
              <div class="px-5 pb-4 flex items-center justify-between">
                <div class="text-xs text-gray-400">
                  <span v-if="order.status === 'completed'" class="text-primary cursor-pointer hover:underline">
                    {{ $t('storefront.ordersPage.btnReview') }}
                  </span>
                </div>

                <!-- Action buttons -->
                <div class="flex items-center gap-2">
                  <template v-if="order.status === 'completed'">
                    <Button variant="primary" size="sm" @click="() => {}">
                      {{ $t('storefront.ordersPage.btnReview') }}
                    </Button>
                    <Button variant="outline" size="sm" @click="() => {}">
                      {{ $t('storefront.ordersPage.btnRequestReturn') }}
                    </Button>
                    <Button variant="outline" size="sm" @click="() => {}">
                      {{ $t('storefront.ordersPage.btnMore') }}
                    </Button>
                  </template>
                  <template v-else-if="order.status === 'cancelled'">
                    <Button variant="primary" size="sm" @click="() => {}">
                      {{ $t('storefront.ordersPage.btnBuyAgain') }}
                    </Button>
                    <Button variant="outline" size="sm" @click="() => {}">
                      {{ $t('storefront.ordersPage.btnViewRefundInfo') }}
                    </Button>
                    <Button variant="outline" size="sm" @click="() => {}">
                      {{ $t('storefront.ordersPage.btnContactSeller') }}
                    </Button>
                  </template>
                  <template v-else>
                    <Button variant="outline" size="sm" @click="() => {}">
                      {{ $t('storefront.ordersPage.btnContactSeller') }}
                    </Button>
                    <Button variant="outline" size="sm" @click="() => {}">
                      {{ $t('storefront.ordersPage.btnMore') }}
                    </Button>
                  </template>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth, Avatar, Button, Spinner } from '@hivespace/shared'
import { storeToRefs } from 'pinia'
import { Bell, User, ShoppingBag, ChevronDown, Pencil, Search, Store, MessageCircle, Truck } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useOrdersStore } from '@/stores/orders'
import type { OrderStatus } from '@/types'

const { currentUser } = useAuth()
const { t } = useI18n()
const ordersStore = useOrdersStore()
const { filteredOrders, activeTab, searchQuery, isLoading } = storeToRefs(ordersStore)

const accountOpen = ref(false)

const displayUsername = computed(() =>
  currentUser.value?.profile?.preferred_username
  ?? currentUser.value?.profile?.name
  ?? currentUser.value?.profile?.sub
  ?? ''
)

const tabs: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: t('storefront.ordersPage.tabAll') },
  { value: 'pending_payment', label: t('storefront.ordersPage.tabPendingPayment') },
  { value: 'shipping', label: t('storefront.ordersPage.tabShipping') },
  { value: 'pending_delivery', label: t('storefront.ordersPage.tabPendingDelivery') },
  { value: 'completed', label: t('storefront.ordersPage.tabCompleted') },
  { value: 'cancelled', label: t('storefront.ordersPage.tabCancelled') },
  { value: 'return_refund', label: t('storefront.ordersPage.tabReturnRefund') },
]

const formatPrice = (price: number) =>
  price.toLocaleString('vi-VN') + 'đ'

onMounted(() => ordersStore.fetchOrders())
</script>
