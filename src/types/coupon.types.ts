// Matches CouponSummaryDto from the backend — returned by GET /api/v1/coupons/store/{storeId}
export interface StoreCouponSummary {
  id: string
  code: string
  name: string
  startDateTime: string
  endDateTime: string
  discountType: number       // 0 = FixedAmount, 1 = Percentage
  discountAmount?: number | null
  discountCurrency: string
  discountPercentage?: number | null
  maxDiscountAmount?: number | null
  minOrderAmount: number
  maxUsageCount: number
  currentUsageCount: number
  isHidden: boolean
  isActive: boolean
  applicableProductIds: number[]
  status: number             // 0 = Ongoing, 1 = Upcoming, 2 = Expired
}

// Request / response for POST /api/v1/coupons/apply
export interface CouponApplyRequest {
  couponCode: string
  storeId?: string
}

export interface CouponApplyResponse {
  isValid: boolean
  couponCode: string
  errorCode?: string | null
  discountAmount: number
  equivalentPercent: number
}
