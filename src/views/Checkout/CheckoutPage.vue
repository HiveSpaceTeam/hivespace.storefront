<template>
  <div class="min-h-screen flex flex-col bg-[#f5f5f5] dark:bg-surface-dark">
    <FullscreenLoader :visible="submitting" :message="t('checkout.placingOrder')" />
    <CheckoutHeader />

    <main class="flex-grow py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- LEFT: Main Content -->
          <div class="flex-grow min-w-0">

            <!-- ==================== CARD 1: SHIPPING METHOD ==================== -->
            <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm mb-4 p-4">
              <h2 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                {{ t('checkout.shippingMethodTitle') }}
              </h2>

              <div v-for="(pkg, pkgIdx) in packages" :key="pkg.storeId"
                class="border border-gray-200 dark:border-gray-700 rounded-lg mb-3">
                <!-- Package header -->
                <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span class="text-base font-medium text-yellow-600 dark:text-yellow-400 shrink-0">
                    {{ t('checkout.deliveryGroup', { index: pkgIdx + 1 }) }}
                  </span>
                  <span class="text-sm font-semibold uppercase px-2 py-0.5 rounded-sm shrink-0" :class="pkg.shippingType === 'economy'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'">
                    {{ pkg.shippingType === 'economy' ? t('checkout.economyShipping') : t('checkout.fastShipping') }}
                  </span>
                  <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 shrink-0">
                    <span v-if="pkg.originalShippingFee" class="line-through">{{ formatPrice(pkg.originalShippingFee)
                      }}</span>
                    <span class="font-semibold"
                      :class="pkg.shippingFee === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'">
                      {{ pkg.shippingFee === 0 ? t('checkout.shippingFree') : formatPrice(pkg.shippingFee) }}
                    </span>
                  </div>
                  <div class="flex-grow"></div>
                  <div class="shrink-0 w-28 text-right text-sm text-gray-400 dark:text-gray-500">{{
                    t('checkout.colUnitPrice') }}</div>
                  <div class="shrink-0 w-16 text-center text-sm text-gray-400 dark:text-gray-500">{{
                    t('checkout.colQuantity') }}</div>
                  <div class="shrink-0 w-28 text-right text-sm text-gray-400 dark:text-gray-500">{{
                    t('checkout.colLineTotal') }}</div>
                </div>

                <!-- Items in package -->
                <div v-for="item in pkg.items" :key="item.cartItemId"
                  class="flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-800 last:border-b-0">
                  <!-- Image + name -->
                  <div class="w-12 h-12 shrink-0 rounded overflow-hidden border border-gray-100 dark:border-gray-700">
                    <img :src="item.imageUrl" :alt="item.productName" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-grow min-w-0">
                    <p class="text-base text-gray-800 dark:text-gray-200 line-clamp-1">{{ item.productName }}</p>
                    <div v-if="item.skuAttributes && Object.keys(JSON.parse(item.skuAttributes || '{}')).length > 0" class="mt-1">
                      <span
                        class="text-sm text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {{ parseSkuAttributes(item.skuAttributes) }}
                      </span>
                    </div>
                  </div>
                  <!-- Unit price -->
                  <div class="shrink-0 w-28 text-right">
                    <p class="text-base font-medium text-primary">{{ formatPrice(item.price) }}</p>
                    <p v-if="item.originalPrice && item.originalPrice > item.price"
                      class="text-sm text-gray-400 line-through">{{ formatPrice(item.originalPrice) }}</p>
                  </div>
                  <!-- Quantity -->
                  <div class="shrink-0 w-16 text-center text-base text-gray-600 dark:text-gray-400">
                    {{ item.quantity }}
                  </div>
                  <!-- Line total -->
                  <div class="shrink-0 w-28 text-right">
                    <p class="text-base font-medium text-primary">{{ formatPrice(item.lineTotal) }}</p>
                  </div>
                </div>

                <!-- Store coupon row -->
                <div class="relative border-t border-gray-100 dark:border-gray-800">
                  <div class="flex items-center gap-2 px-4 py-3">
                    <Ticket class="w-4 h-4 text-primary" />
                    <button @click="shopCouponOpenMap[pkg.storeId] = !shopCouponOpenMap[pkg.storeId]"
                      class="flex items-center gap-1 text-base text-primary hover:text-primary-dark transition-colors">
                      <span>{{ t('checkout.storeCoupon') }}</span>
                      <ChevronRight class="w-4 h-4 transition-transform"
                        :class="{ 'rotate-90': shopCouponOpenMap[pkg.storeId] }" />
                    </button>
                    <span v-if="storeCouponMap[pkg.storeId]"
                      class="ml-auto text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                      {{ storeCouponMap[pkg.storeId] }}
                    </span>
                  </div>
                  <ShopCouponModal :model-value="!!shopCouponOpenMap[pkg.storeId]"
                    @update:model-value="shopCouponOpenMap[pkg.storeId] = false" :shop-name="pkg.storeName ?? ''"
                    :coupons="[]" @apply-coupon="(code: string) => applyStoreCoupon(pkg.storeId, code)" />
                </div>
              </div>

            </div><!-- end Card 1 -->

            <!-- ==================== CARD 2: PAYMENT METHOD ==================== -->
            <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm mb-6 p-4">
              <h2 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                {{ t('checkout.paymentMethodTitle') }}
              </h2>

              <RadioGroup class="" gapClass="gap-0" direction="vertical" v-model="selectedPaymentMethod"
                :options="paymentMethodOptions"
                optionClass="px-4 py-3 border-b border-gray-50 dark:border-gray-800 last:border-b-0 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors w-full">
                <template #option="{ option }">
                  <div class="flex items-center gap-3 w-full flex-1 min-w-0">
                    <span class="text-2xl shrink-0" v-if="option.icon">{{ option.icon }}</span>
                    <div class="flex-grow min-w-0 truncate">
                      <span class="text-base text-gray-800 dark:text-gray-200">{{ option.label }}</span>
                      <span v-if="option.subLabel" class="block text-sm text-gray-400 dark:text-gray-500 truncate">{{
                        option.subLabel }}</span>
                    </div>
                    <Badge v-if="option.tag" size="sm" color="error" variant="light"
                      class="text-xs px-1.5 py-0.5 rounded-sm" :class="option.tagClass">{{ option.tag
                      }}</Badge>
                  </div>
                </template>
              </RadioGroup>
            </div><!-- end Card 2 -->
          </div>

          <!-- RIGHT: Sidebar -->
          <div class="lg:w-[340px] shrink-0">
            <div class="sticky top-4 space-y-3">

              <!-- Delivery Address -->
              <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-base font-medium text-gray-700 dark:text-gray-300">
                    {{ t('checkout.deliveryAddress') }}
                  </span>
                  <button class="text-base text-primary hover:text-primary-dark transition-colors">
                    {{ t('checkout.changeAddress') }}
                  </button>
                </div>
                <p class="text-base font-semibold text-gray-800 dark:text-gray-200">
                  {{ address.name }}
                  <span class="text-gray-400 font-normal mx-1">|</span>
                  {{ address.phone }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{{ address.detail }}</p>
                <div v-if="address.isDefault" class="mt-2">
                  <Badge class="rounded-sm" variant="light" size="sm" color="success">
                    {{ t('checkout.defaultAddress') }}
                  </Badge>
                </div>
              </div>

              <!-- Promotions -->
              <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4">
                <div class="flex items-center justify-between">
                  <span class="text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <Ticket class="w-4 h-4 text-primary" />
                    {{ t('checkout.promotionTitle') }}
                  </span>
                  <div class="relative">
                    <button @click="platformCouponModalOpen = true"
                      class="text-base text-primary hover:underline flex items-center gap-0.5">
                      {{ platformCouponCode || t('checkout.selectOrEnterCode') }}
                      <ChevronRight class="w-4 h-4" />
                    </button>
                    <ShopCouponModal :model-value="platformCouponModalOpen"
                      @update:model-value="platformCouponModalOpen = false" shop-name="Platform" :coupons="[]"
                      @apply-coupon="applyPlatformCoupon" />
                  </div>
                </div>
                <div v-if="platformCouponCode"
                  class="mt-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1.5 rounded">
                  {{ t('checkout.canApply') }}: <strong>{{ platformCouponCode }}</strong>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-base font-medium text-gray-700 dark:text-gray-300">
                    {{ t('checkout.orderSummary') }}
                  </span>
                  <button class="text-base text-primary hover:underline flex items-center gap-0.5">
                    {{ t('checkout.itemsCount', { count: totalItems }) }}
                    <ChevronDown class="w-4 h-4" />
                  </button>
                </div>

                <div class="space-y-2 text-base">
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400">{{ t('checkout.itemsSubtotal') }}</span>
                    <span class="text-gray-800 dark:text-gray-200">{{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400">{{ t('checkout.shippingFeeTotal') }}</span>
                    <span class="text-gray-800 dark:text-gray-200">{{ formatPrice(totalShippingFee) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400">{{ t('checkout.shippingDiscount') }}</span>
                    <span class="text-green-600">-{{ formatPrice(shippingDiscount) }}</span>
                  </div>
                </div>

                <div class="border-t border-gray-100 dark:border-gray-700 mt-3 pt-3">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-base font-medium text-gray-700 dark:text-gray-300">
                      {{ t('checkout.totalPayment') }}
                    </span>
                    <span class="text-2xl font-bold text-primary">{{ formatPrice(grandTotal) }}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-sm text-green-600 dark:text-green-400">
                      ({{ t('checkout.savedAmount') }} {{ formatPrice(totalSaved) }})
                    </span>
                  </div>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-2 leading-relaxed">
                    {{ t('checkout.vatNote') }}
                  </p>
                </div>

                <Button @click="handlePlaceOrder" :disabled="submitting" variant="primary" size="md"
                  class="w-full mt-4 rounded-sm">
                  {{ t('checkout.placeOrder') }}
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>

    <StorefrontFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Ticket, ChevronRight, ChevronDown } from 'lucide-vue-next'
import CheckoutHeader from '@/components/layout/CheckoutHeader.vue'
import StorefrontFooter from '@/components/layout/StorefrontFooter.vue'
import ShopCouponModal from '@/components/common/ShopCouponModal.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCheckoutStore } from '@/stores/checkout'
import { RadioGroup, useAppStore, FullscreenLoader, Button, Badge } from '@hivespace/shared'
import { PaymentMethod } from '@/types'

const { t } = useI18n()
const router = useRouter()
const appStore = useAppStore()

const checkoutStore = useCheckoutStore()
const {
  packages,
  totalItems,
  subtotal,
  totalShippingFee,
  grandTotal,
  shippingDiscount,
  totalSaved,
  storeCouponMap,
  platformCouponCode,
  submitting,
} = storeToRefs(checkoutStore)
const { fetchPreview, applyStoreCoupon, applyPlatformCoupon, submitCheckout } = checkoutStore

// ============ Modal open state ============
const shopCouponOpenMap = ref<Record<string, boolean>>({})
const platformCouponModalOpen = ref(false)

// ============ Other page state ============
const address = {
  name: 'Lê Quang Vũ',
  phone: '0349836895',
  detail: 'Số 16 Trần Nhật Duật, Phường Tân Định, Quận 1, TP. Hồ Chí Minh',
  consume: "Cổ Nhuế",
  province: "Hà Nội",
  isDefault: true,
}

const selectedPaymentMethod = ref('momo')

const paymentMethodOptions = computed(() => [
  { value: 'momo', icon: '💜', label: t('checkout.momo'), tag: t('checkout.momoPromo'), tagClass: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  { value: 'credit', icon: '💳', label: t('checkout.creditCard'), subLabel: t('checkout.addNewCard') },
  { value: 'bank', icon: '🏦', label: t('checkout.bankTransfer') },
  { value: 'kredivo', icon: '🟢', label: t('checkout.kredivo') },
  { value: 'zalopay', icon: '💙', label: t('checkout.zaloPay') },
  { value: 'vnpay', icon: '🔵', label: t('checkout.vnPay'), subLabel: t('checkout.scanToPay') },
  { value: 'cod', icon: '📦', label: t('checkout.cod') },
])

// ============ Payment method mapping ============
const paymentMethodMap: Record<string, PaymentMethod> = {
  momo: PaymentMethod.MOMO,
  vnpay: PaymentMethod.VNPAY,
  cod: PaymentMethod.COD,
}

async function handlePlaceOrder() {
  const deliveryAddressDto = {
    recipientName: address.name,
    phone: address.phone,
    streetAddress: address.detail,
    commune: address.consume,
    province: address.province,
  }
  const paymentMethod = paymentMethodMap[selectedPaymentMethod.value] ?? PaymentMethod.COD

  try {
    const result = await submitCheckout({ deliveryAddress: deliveryAddressDto, paymentMethod })
    if (result.paymentUrl) {
      window.location.href = result.paymentUrl
    } else {
      appStore.notifySuccess(t('checkout.orderSuccessTitle'), t('checkout.orderSuccessMessage'))
      router.push({ name: 'Home' })
    }
  } catch {
    appStore.notifyError(t('checkout.orderFailedTitle'), t('checkout.orderFailedMessage'))
  }
}

// ============ Helpers ============
const parseSkuAttributes = (raw: string): string => {
  try {
    const attrs = JSON.parse(raw) as Record<string, string>
    return Object.entries(attrs).map(([k, v]) => `${k}: ${v}`).join(', ')
  } catch {
    return raw
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

onMounted(() => fetchPreview())
</script>
