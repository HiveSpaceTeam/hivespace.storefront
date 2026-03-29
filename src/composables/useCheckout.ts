import { ref, computed } from 'vue'
import { checkoutService } from '@/services/checkout.service'
import type { CheckoutPreview, CheckoutRequest, CheckoutResult } from '@/types'

export function useCheckout() {
  const preview = ref<CheckoutPreview | null>(null)
  const loading = ref(false)
  const submitting = ref(false)
  const error = ref<string | null>(null)

  const storeCouponMap = ref<Record<string, string>>({})
  const platformCouponCode = ref('')

  async function fetchPreview() {
    loading.value = true
    error.value = null
    try {
      const storeCoupons = Object.entries(storeCouponMap.value)
        .filter(([, code]) => !!code)
        .map(([storeId, couponCode]) => ({ storeId, couponCode }))

      preview.value = await checkoutService.getPreview({
        storeCoupons: storeCoupons.length ? storeCoupons : undefined,
        platformCouponCodes: platformCouponCode.value ? [platformCouponCode.value] : undefined,
      })
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to load checkout'
    } finally {
      loading.value = false
    }
  }

  function applyStoreCoupon(storeId: string, code: string) {
    storeCouponMap.value = { ...storeCouponMap.value, [storeId]: code }
    fetchPreview()
  }

  function applyPlatformCoupon(code: string) {
    platformCouponCode.value = code
    fetchPreview()
  }

  async function submitCheckout(request: Omit<CheckoutRequest, 'couponCodes'>): Promise<CheckoutResult> {
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
  const totalSaved = computed(
    () => originalSubtotal.value - subtotal.value + shippingDiscount.value,
  )

  return {
    loading,
    submitting,
    error,
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
}
