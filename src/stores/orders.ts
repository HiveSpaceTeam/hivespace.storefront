import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order, CustomerOrderProcessStatus } from '@/types'
import { orderService } from '@/services/order.service'

const PAGE_SIZE = 5

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])
  const activeTab = ref<CustomerOrderProcessStatus | 'all'>('all')
  const searchQuery = ref('')
  const isLoading = ref(false)
  const isLoadingMore = ref(false)
  const hasNextPage = ref(false)
  const currentPage = ref(1)

  let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null

  const fetchOrders = async () => {
    isLoading.value = true
    currentPage.value = 1
    orders.value = []
    try {
      const result = await orderService.getOrders({
        processStatus: activeTab.value === 'all' ? undefined : activeTab.value,
        searchField: 'OrderCode',
        searchValue: searchQuery.value.trim(),
        page: 1,
        pageSize: PAGE_SIZE,
      })
      orders.value = result.orders
      hasNextPage.value = result.pagination.hasNextPage
    } finally {
      isLoading.value = false
    }
  }

  const loadMore = async () => {
    if (isLoadingMore.value || !hasNextPage.value) return
    isLoadingMore.value = true
    try {
      const nextPage = currentPage.value + 1
      const result = await orderService.getOrders({
        processStatus: activeTab.value === 'all' ? undefined : activeTab.value,
        searchField: 'OrderCode',
        searchValue: searchQuery.value.trim(),
        page: nextPage,
        pageSize: PAGE_SIZE,
      })
      orders.value = [...orders.value, ...result.orders]
      currentPage.value = nextPage
      hasNextPage.value = result.pagination.hasNextPage
    } finally {
      isLoadingMore.value = false
    }
  }

  const setTab = (tab: CustomerOrderProcessStatus | 'all') => {
    activeTab.value = tab
    fetchOrders()
  }

  const setSearchQuery = (q: string) => {
    searchQuery.value = q
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer)
    searchDebounceTimer = setTimeout(() => fetchOrders(), 400)
  }

  return {
    orders,
    activeTab,
    searchQuery,
    isLoading,
    isLoadingMore,
    hasNextPage,
    fetchOrders,
    loadMore,
    setTab,
    setSearchQuery,
  }
})
