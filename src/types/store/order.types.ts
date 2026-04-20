import type { CustomerOrderProcessStatus } from '@/types/api/order.types'

export interface OrdersState {
  activeTab: CustomerOrderProcessStatus | 'all'
  searchQuery: string
  isLoading: boolean
  isLoadingMore: boolean
  hasNextPage: boolean
}
