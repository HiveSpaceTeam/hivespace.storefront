import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type { OrdersResponse, GetOrdersParams, OrderDetail } from '@/types'

const ORDER_ENDPOINTS = {
  ORDERS: '/orders',
} as const

class OrderService {
  async getOrders(params: GetOrdersParams): Promise<OrdersResponse> {
    const url = buildApiUrl(ORDER_ENDPOINTS.ORDERS)
    return await apiService.get<OrdersResponse>(url, { params })
  }

  async getOrderById(orderId: string): Promise<OrderDetail> {
    const url = buildApiUrl(`${ORDER_ENDPOINTS.ORDERS}/${orderId}`)
    return await apiService.get<OrderDetail>(url)
  }
}

export const orderService = new OrderService()
