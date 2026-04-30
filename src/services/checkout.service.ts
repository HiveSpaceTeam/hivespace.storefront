import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type {
  CheckoutPreview,
  CheckoutPreviewRequest,
  CheckoutRequest,
  CheckoutResult,
  StoreCouponSummary,
  CouponApplyRequest,
  CouponApplyResponse,
} from '@/types'

const CHECKOUT_ENDPOINTS = {
  PREVIEW:  '/orders/checkout/preview',
  CHECKOUT: '/orders/checkout',
} as const

const COUPON_ENDPOINTS = {
  PLATFORM_LIST: '/coupons/platform',
  STORE_LIST:    (storeId: string) => `/coupons/store/${encodeURIComponent(storeId)}`,
  APPLY:         '/coupons/apply',
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

  async getPlatformCoupons(): Promise<StoreCouponSummary[]> {
    const url = buildApiUrl(COUPON_ENDPOINTS.PLATFORM_LIST)
    return await apiService.get<StoreCouponSummary[]>(url)
  }

  async getStoreCoupons(storeId: string): Promise<StoreCouponSummary[]> {
    const url = buildApiUrl(COUPON_ENDPOINTS.STORE_LIST(storeId))
    return await apiService.get<StoreCouponSummary[]>(url)
  }

  async applyCoupon(request: CouponApplyRequest): Promise<CouponApplyResponse> {
    const url = buildApiUrl(COUPON_ENDPOINTS.APPLY)
    return await apiService.post<CouponApplyResponse>(url, request)
  }
}

export const checkoutService = new CheckoutService()
