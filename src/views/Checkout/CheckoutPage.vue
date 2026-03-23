<template>
  <div class="min-h-screen flex flex-col bg-[#f5f5f5] dark:bg-surface-dark">
    <CheckoutHeader />

    <main class="flex-grow py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- LEFT: Main Content -->
          <div class="flex-grow min-w-0">

            <!-- ==================== SHIPPING METHOD ==================== -->
            <h2 class="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">
              {{ t('storefront.checkout.shippingMethodTitle') }}
            </h2>

            <div
              v-for="(pkg, pkgIdx) in deliveryPackages"
              :key="pkgIdx"
              class="bg-white dark:bg-card-dark rounded-sm shadow-sm mb-3"
            >
              <!-- Package header -->
              <div class="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <span class="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                  {{ t('storefront.checkout.deliveryGroup', { index: pkgIdx + 1 }) }}:
                  {{ t('storefront.checkout.deliveryDate', { date: pkg.deliveryDate }) }}
                </span>
                <span class="text-xs font-semibold uppercase px-2 py-0.5 rounded-sm"
                  :class="pkg.shippingType === 'economy'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'"
                >
                  {{ pkg.shippingType === 'economy'
                    ? t('storefront.checkout.economyShipping')
                    : t('storefront.checkout.fastShipping')
                  }}
                </span>
                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span v-if="pkg.originalShipping" class="line-through">{{ formatPrice(pkg.originalShipping) }}</span>
                  <span class="font-semibold"
                    :class="pkg.shippingFee === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'"
                  >
                    {{ pkg.shippingFee === 0 ? t('storefront.checkout.shippingFree') : formatPrice(pkg.shippingFee) }}
                  </span>
                </div>
                <span v-if="pkg.deliveryPartner" class="ml-auto text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <Truck class="w-3.5 h-3.5" />
                  {{ t('storefront.checkout.deliveredBy', { partner: pkg.deliveryPartner }) }}
                </span>
              </div>

              <!-- Items in package -->
              <div
                v-for="item in pkg.items"
                :key="item.id"
                class="flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-800 last:border-b-0"
              >
                <div class="w-12 h-12 shrink-0 rounded overflow-hidden border border-gray-100 dark:border-gray-700">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow min-w-0">
                  <p class="text-sm text-gray-800 dark:text-gray-200 line-clamp-1">{{ item.name }}</p>
                  <p v-if="item.variant" class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ item.variant }}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ formatPrice(item.price) }}</p>
                  <p class="text-xs text-gray-400">{{ t('storefront.checkout.qty', { qty: item.quantity }) }}</p>
                </div>
              </div>
            </div>

            <!-- Eco shipping checkbox -->
            <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm mb-6 px-4 py-3">
              <label class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" v-model="joinEcoShipping" class="w-4 h-4 accent-primary rounded" />
                {{ t('storefront.checkout.joinEcoShipping') }}
              </label>
            </div>

            <!-- ==================== PAYMENT METHOD ==================== -->
            <h2 class="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">
              {{ t('storefront.checkout.paymentMethodTitle') }}
            </h2>

            <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm mb-6">
              <label
                v-for="method in paymentMethods"
                :key="method.id"
                class="flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-800 last:border-b-0 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  :value="method.id"
                  v-model="selectedPaymentMethod"
                  class="w-4 h-4 accent-primary"
                />
                <span class="text-xl" v-if="method.icon">{{ method.icon }}</span>
                <div class="flex-grow">
                  <span class="text-sm text-gray-800 dark:text-gray-200">{{ method.label }}</span>
                  <span v-if="method.sublabel" class="block text-xs text-gray-400 dark:text-gray-500">{{ method.sublabel }}</span>
                </div>
                <span
                  v-if="method.tag"
                  class="text-[10px] font-bold px-1.5 py-0.5 rounded-sm"
                  :class="method.tagClass"
                >{{ method.tag }}</span>
              </label>
            </div>

            <!-- ==================== VOUCHERS GRID ==================== -->
            <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4 mb-4">
              <div class="flex items-center gap-2 mb-3">
                <Ticket class="w-4 h-4 text-primary" />
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {{ t('storefront.checkout.vouchersTitle') }}
                </span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <div
                  v-for="voucher in vouchers"
                  :key="voucher.code"
                  class="relative border rounded-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  :class="selectedVoucher === voucher.code
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700'"
                  @click="selectedVoucher = selectedVoucher === voucher.code ? '' : voucher.code"
                >
                  <!-- Voucher left accent -->
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  <div class="pl-3 pr-2 py-2.5">
                    <div class="flex items-start justify-between gap-1 mb-1">
                      <span class="text-sm font-bold text-primary leading-tight">{{ voucher.title }}</span>
                      <span class="text-[10px] text-primary border border-primary px-1 py-0.5 rounded-sm whitespace-nowrap shrink-0">
                        {{ t('storefront.checkout.voucherHiveSpace') }}
                      </span>
                    </div>
                    <p class="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                      {{ t('storefront.checkout.voucherMinOrder', { amount: formatPriceShort(voucher.minOrder) }) }}
                    </p>
                    <div class="flex items-center justify-between mt-1.5">
                      <span class="text-[10px] text-gray-400">{{ t('storefront.checkout.voucherExpiry', { date: voucher.expiresAt }) }}</span>
                      <input
                        type="radio"
                        name="voucher"
                        :value="voucher.code"
                        v-model="selectedVoucher"
                        class="w-3.5 h-3.5 accent-primary"
                        @click.stop
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-3 flex items-center gap-1">
                <Ticket class="w-3 h-3" />
                {{ t('storefront.checkout.voucherUsageNote') }}
              </p>
            </div>
          </div>

          <!-- RIGHT: Sidebar -->
          <div class="lg:w-[340px] shrink-0">
            <div class="sticky top-4 space-y-3">

              <!-- Delivery Address -->
              <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ t('storefront.checkout.deliveryAddress') }}
                  </span>
                  <button class="text-sm text-primary hover:text-primary-dark transition-colors">
                    {{ t('storefront.checkout.changeAddress') }}
                  </button>
                </div>
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {{ address.name }}
                  <span class="text-gray-400 font-normal mx-1">|</span>
                  {{ address.phone }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{{ address.detail }}</p>
                <div v-if="address.isDefault" class="mt-2">
                  <span class="text-[10px] border border-green-500 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-sm">
                    Mặc định
                  </span>
                </div>
              </div>

              <!-- Promotions -->
              <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <Ticket class="w-4 h-4 text-primary" />
                    {{ t('storefront.checkout.promotionTitle') }}
                  </span>
                  <button class="text-sm text-primary hover:underline flex items-center gap-0.5">
                    {{ t('storefront.checkout.selectOrEnterCode') }}
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
                <div v-if="appliedPromotion" class="mt-2 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1.5 rounded">
                  {{ t('storefront.checkout.canApply') }}: <strong>{{ appliedPromotion }}</strong>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ t('storefront.checkout.orderSummary') }}
                  </span>
                  <button class="text-sm text-primary hover:underline flex items-center gap-0.5">
                    {{ t('storefront.checkout.itemsCount', { count: totalItems }) }}
                    <ChevronDown class="w-4 h-4" />
                  </button>
                </div>

                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400">{{ t('storefront.checkout.itemsSubtotal') }}</span>
                    <span class="text-gray-800 dark:text-gray-200">{{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400">{{ t('storefront.checkout.shippingFeeTotal') }}</span>
                    <span class="text-gray-800 dark:text-gray-200">{{ formatPrice(totalShippingFee) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400">{{ t('storefront.checkout.shippingDiscount') }}</span>
                    <span class="text-green-600">-{{ formatPrice(shippingDiscount) }}</span>
                  </div>
                </div>

                <div class="border-t border-gray-100 dark:border-gray-700 mt-3 pt-3">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('storefront.checkout.totalPayment') }}
                    </span>
                    <span class="text-xl font-bold text-primary">{{ formatPrice(totalPayment) }}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-green-600 dark:text-green-400">
                      ({{ t('storefront.checkout.savedAmount') }} {{ formatPrice(totalSaved) }})
                    </span>
                  </div>
                  <p class="text-[11px] text-gray-400 dark:text-gray-500 mt-2 leading-relaxed">
                    {{ t('storefront.checkout.vatNote') }}
                  </p>
                </div>

                <button
                  class="w-full mt-4 bg-primary hover:bg-primary-dark text-white py-3 rounded-sm font-medium text-sm transition-colors shadow-sm hover:shadow-md"
                >
                  {{ t('storefront.checkout.placeOrder') }}
                </button>
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
import { ref, computed } from 'vue'
import { Truck, Ticket, ChevronRight, ChevronDown } from 'lucide-vue-next'
import CheckoutHeader from '@/components/layout/CheckoutHeader.vue'
import StorefrontFooter from '@/components/layout/StorefrontFooter.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// ============ Types ============
interface CheckoutItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  variant?: string
}

interface DeliveryPackage {
  deliveryDate: string
  shippingType: 'economy' | 'fast'
  shippingFee: number
  originalShipping?: number
  deliveryPartner?: string
  items: CheckoutItem[]
}

interface Voucher {
  code: string
  title: string
  minOrder: number
  expiresAt: string
}

// ============ Mock data ============
const address = {
  name: 'Lê Quang Vũ',
  phone: '0349836895',
  detail: 'Số 16 Trần Nhật Duật, Phường Tân Định, Quận 1, TP. Hồ Chí Minh',
  isDefault: true,
}

const deliveryPackages = ref<DeliveryPackage[]>([
  {
    deliveryDate: 'Thứ 3, 14/03',
    shippingType: 'economy',
    shippingFee: 0,
    originalShipping: 16500,
    deliveryPartner: 'HiveSpace Logistics',
    items: [
      {
        id: '1',
        name: 'Điện thoại Samsung Galaxy S24 Ultra 5G 256GB - Chính hãng',
        image: 'https://picsum.photos/200?random=101',
        price: 30990000,
        quantity: 1,
        variant: 'Titanium Đen',
      },
    ],
  },
  {
    deliveryDate: 'Thứ 4, 15/03',
    shippingType: 'economy',
    shippingFee: 0,
    originalShipping: 19800,
    deliveryPartner: 'Giao Hàng Tiết Kiệm',
    items: [
      {
        id: '2',
        name: 'Tai nghe Sony WH-1000XM5 chống ồn chủ động Wireless',
        image: 'https://picsum.photos/200?random=102',
        price: 6990000,
        quantity: 1,
      },
      {
        id: '3',
        name: 'Ốp lưng iPhone 15 Pro Max MagSafe siêu mỏng, chống sốc cao cấp',
        image: 'https://picsum.photos/200?random=103',
        price: 275000,
        quantity: 2,
        variant: 'Trong suốt',
      },
    ],
  },
  {
    deliveryDate: 'Thứ 5, 16/03',
    shippingType: 'economy',
    shippingFee: 14300,
    originalShipping: 24800,
    deliveryPartner: 'Viettel Post',
    items: [
      {
        id: '4',
        name: 'Bàn phím cơ Keychron K8 Pro TKL Wireless Bluetooth - Switch Gateron Brown',
        image: 'https://picsum.photos/200?random=104',
        price: 2490000,
        quantity: 1,
      },
    ],
  },
  {
    deliveryDate: 'Thứ 3, 14/03',
    shippingType: 'fast',
    shippingFee: 0,
    originalShipping: 64000,
    deliveryPartner: 'HiveSpace Express',
    items: [
      {
        id: '5',
        name: 'Chuột không dây Logitech MX Master 3S - Ergonomic, Silent Click',
        image: 'https://picsum.photos/200?random=105',
        price: 2290000,
        quantity: 1,
        variant: 'Xám',
      },
      {
        id: '6',
        name: 'Miếng dán cường lực full màn Samsung Galaxy S24 Ultra UV Glass',
        image: 'https://picsum.photos/200?random=106',
        price: 149000,
        quantity: 3,
      },
    ],
  },
  {
    deliveryDate: 'Thứ 6, 17/03',
    shippingType: 'economy',
    shippingFee: 22000,
    deliveryPartner: 'J&T Express',
    items: [
      {
        id: '7',
        name: 'Sạc nhanh Anker Nano II 65W GaN USB-C PD cho MacBook/Laptop/Điện thoại',
        image: 'https://picsum.photos/200?random=107',
        price: 890000,
        quantity: 1,
      },
    ],
  },
  {
    deliveryDate: 'Thứ 2, 20/03',
    shippingType: 'economy',
    shippingFee: 0,
    originalShipping: 22000,
    deliveryPartner: 'Giao Hàng Nhanh',
    items: [
      {
        id: '8',
        name: 'Cáp sạc dây dù USB-C to Lightning 20W MFi cho iPhone - Dài 1.8m',
        image: 'https://picsum.photos/200?random=108',
        price: 145000,
        quantity: 2,
      },
    ],
  },
])

const paymentMethods = computed(() => [
  { id: 'momo', icon: '💜', label: t('storefront.checkout.momo'), tag: 'Giảm 50k', tagClass: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' },
  { id: 'credit', icon: '💳', label: t('storefront.checkout.creditCard'), sublabel: t('storefront.checkout.addNewCard') },
  { id: 'bank', icon: '🏦', label: t('storefront.checkout.bankTransfer') },
  { id: 'kredivo', icon: '🟢', label: t('storefront.checkout.kredivo') },
  { id: 'zalopay', icon: '💙', label: t('storefront.checkout.zaloPay') },
  { id: 'vnpay', icon: '🔵', label: t('storefront.checkout.vnPay'), sublabel: t('storefront.checkout.scanToPay') },
  { id: 'cod', icon: '📦', label: t('storefront.checkout.cod') },
])

const selectedPaymentMethod = ref('momo')
const joinEcoShipping = ref(false)
const selectedVoucher = ref('')
const appliedPromotion = ref('')

const vouchers = ref<Voucher[]>([
  { code: 'FREESHIP1', title: 'Freeship', minOrder: 149000, expiresAt: '31/03/2026' },
  { code: 'FREESHIP2', title: 'Freeship', minOrder: 249000, expiresAt: '15/04/2026' },
  { code: 'GIAM30K', title: 'Giảm 30k', minOrder: 299000, expiresAt: '31/03/2026' },
  { code: 'GIAM50K', title: 'Giảm 50k', minOrder: 499000, expiresAt: '20/04/2026' },
  { code: 'GIAM10P', title: 'Giảm 10%', minOrder: 199000, expiresAt: '25/03/2026' },
  { code: 'GIAM70K', title: 'Giảm 70k', minOrder: 699000, expiresAt: '30/04/2026' },
  { code: 'GIAM100K', title: 'Giảm 100k', minOrder: 999000, expiresAt: '15/05/2026' },
  { code: 'GIAM150K', title: 'Giảm 150k', minOrder: 1999000, expiresAt: '30/04/2026' },
  { code: 'GIAM30P', title: 'Giảm 30%', minOrder: 399000, expiresAt: '01/04/2026' },
  { code: 'FREESHIP3', title: 'Freeship', minOrder: 0, expiresAt: '31/03/2026' },
])

// ============ Computed ============
const totalItems = computed(() =>
  deliveryPackages.value.reduce((sum, pkg) => sum + pkg.items.reduce((s, i) => s + i.quantity, 0), 0),
)

const subtotal = computed(() =>
  deliveryPackages.value.reduce(
    (sum, pkg) => sum + pkg.items.reduce((s, i) => s + i.price * i.quantity, 0),
    0,
  ),
)

const totalShippingFee = computed(() =>
  deliveryPackages.value.reduce((sum, pkg) => sum + pkg.shippingFee, 0),
)

const shippingDiscount = computed(() =>
  deliveryPackages.value.reduce((sum, pkg) => sum + (pkg.originalShipping ? pkg.originalShipping - pkg.shippingFee : 0), 0),
)

const totalPayment = computed(() => subtotal.value + totalShippingFee.value)

const totalSaved = computed(() => shippingDiscount.value)

// ============ Helpers ============
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

const formatPriceShort = (price: number) => {
  if (price >= 1000000) return `${(price / 1000000).toFixed(0)}tr`
  if (price >= 1000) return `${(price / 1000).toFixed(0)}k`
  return `${price}đ`
}
</script>
