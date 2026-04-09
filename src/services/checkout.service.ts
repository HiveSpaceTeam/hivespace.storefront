import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type { CheckoutPreview, CheckoutPreviewRequest, CheckoutRequest, CheckoutResult } from '@/types'

const CHECKOUT_ENDPOINTS = {
  PREVIEW: '/orders/checkout/preview',
  CHECKOUT: '/orders/checkout',
} as const

class CheckoutService {
  async getPreview(request: CheckoutPreviewRequest = {}): Promise<CheckoutPreview> {
    const url = buildApiUrl(CHECKOUT_ENDPOINTS.PREVIEW)
    return await apiService.post<CheckoutPreview>(url, request)
  }

  async initiateCheckout(request: CheckoutRequest): Promise<CheckoutResult> {
    const url = buildApiUrl(CHECKOUT_ENDPOINTS.CHECKOUT)
    return await apiService.post<CheckoutResult>(url, request)
  }
}

export const checkoutService = new CheckoutService()
