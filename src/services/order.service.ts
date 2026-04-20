import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type { OrdersResponse, GetOrdersParams } from '@/types'

const ORDER_ENDPOINTS = {
  ORDERS: '/orders',
} as const

class OrderService {
  async getOrders(params: GetOrdersParams): Promise<OrdersResponse> {
    const url = buildApiUrl(ORDER_ENDPOINTS.ORDERS)
    return await apiService.get<OrdersResponse>(url, { params })
  }
}

export const orderService = new OrderService()
