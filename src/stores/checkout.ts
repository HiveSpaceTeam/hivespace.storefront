import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { checkoutService } from '@/services/checkout.service'
import type { CheckoutPreview, CheckoutRequest, CheckoutResult } from '@/types'

export const useCheckoutStore = defineStore('checkout', () => {
  const preview = ref<CheckoutPreview | null>(null)
  const loading = ref(false)
  const submitting = ref(false)

  const storeCouponMap = ref<Record<string, string>>({})
  const platformCouponCode = ref('')

  const fetchPreview = async () => {
    loading.value = true
    try {
      const storeCoupons = Object.entries(storeCouponMap.value)
        .filter(([, code]) => !!code)
        .map(([storeId, couponCode]) => ({ storeId, couponCode }))

      preview.value = await checkoutService.getPreview({
        storeCoupons: storeCoupons.length ? storeCoupons : undefined,
        platformCouponCodes: platformCouponCode.value ? [platformCouponCode.value] : undefined,
      })
    } finally {
      loading.value = false
    }
  }

  const applyStoreCoupon = (storeId: string, code: string) => {
    storeCouponMap.value = { ...storeCouponMap.value, [storeId]: code }
    fetchPreview()
  }

  const applyPlatformCoupon = (code: string) => {
    platformCouponCode.value = code
    fetchPreview()
  }

  const submitCheckout = async (request: Omit<CheckoutRequest, 'couponCodes'>): Promise<CheckoutResult> => {
    submitting.value = true
    try {
      const couponCodes = platformCouponCode.value ? [platformCouponCode.value] : undefined
      return await checkoutService.initiateCheckout({ ...request, couponCodes })
    } finally {
      submitting.value = false
    }
  }

  const packages = computed(() => preview.value?.packages ?? [])
  const totalItems = computed(() => preview.value?.totalItems ?? 0)
  const subtotal = computed(() => preview.value?.subtotal ?? 0)
  const originalSubtotal = computed(() => preview.value?.originalSubtotal ?? 0)
  const totalShippingFee = computed(() => preview.value?.totalShippingFee ?? 0)
  const grandTotal = computed(() => preview.value?.grandTotal ?? 0)
  const shippingDiscount = computed(() =>
    packages.value.reduce(
      (sum, pkg) => sum + ((pkg.originalShippingFee ?? pkg.shippingFee) - pkg.shippingFee),
      0,
    ),
  )
  const totalSaved = computed(() => originalSubtotal.value - subtotal.value + shippingDiscount.value)

  return {
    preview,
    loading,
    submitting,
    storeCouponMap,
    platformCouponCode,
    fetchPreview,
    applyStoreCoupon,
    applyPlatformCoupon,
    submitCheckout,
    packages,
    totalItems,
    subtotal,
    originalSubtotal,
    totalShippingFee,
    grandTotal,
    shippingDiscount,
    totalSaved,
  }
})
