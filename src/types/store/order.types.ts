import type { Order, OrderStatus } from '@/types/api/order.types'

export interface OrdersState {
  orders: Order[]
  activeTab: OrderStatus | 'all'
  searchQuery: string
  isLoading: boolean
}
