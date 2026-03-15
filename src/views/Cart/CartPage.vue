<template>
  <div class="min-h-screen flex flex-col bg-[#f5f5f5] dark:bg-surface-dark">
    <!-- Cart Header -->
    <CartHeader />

    <!-- Main Cart Content -->
    <main class="flex-grow py-6">
      <div class="container mx-auto px-4">
        <!-- Free shipping banner -->
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-sm p-3 mb-4 flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
          <Truck class="w-5 h-5 shrink-0" />
          <span>Bạn đã được <strong>Miễn phí vận chuyển</strong> cho đơn hàng từ 300.000₫</span>
        </div>

        <div class="flex flex-col lg:flex-row gap-4">
          <!-- LEFT: Cart Items -->
          <div class="flex-grow">
            <!-- Select all header -->
            <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm mb-3 p-4">
              <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="w-4 h-4 accent-primary rounded" />
                  <span>Chọn Tất Cả ({{ totalItems }} sản phẩm)</span>
                </label>
                <div class="hidden md:flex items-center ml-auto gap-0 text-gray-500 dark:text-gray-400 text-xs">
                  <span class="w-28 text-center">Đơn Giá</span>
                  <span class="w-32 text-center">Số Lượng</span>
                  <span class="w-28 text-center">Thành Tiền</span>
                  <span class="w-16 text-center">
                    <button @click="removeSelected" class="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Cart items grouped by seller -->
            <div v-for="(group, groupIndex) in cartGroups" :key="groupIndex" class="bg-white dark:bg-card-dark rounded-sm shadow-sm mb-3 overflow-hidden">
              <!-- Seller header -->
              <div class="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-gray-700">
                <input type="checkbox" v-model="group.selected" @change="toggleGroupSelect(groupIndex)" class="w-4 h-4 accent-primary rounded" />
                <Store class="w-4 h-4 text-primary" />
                <span class="font-medium text-sm text-gray-800 dark:text-gray-200">{{ group.sellerName }}</span>
                <span v-if="group.isMall" class="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">Mall</span>
              </div>

              <!-- Items -->
              <div v-for="(item, itemIndex) in group.items" :key="item.id"
                class="flex items-start gap-3 p-4 border-b border-gray-50 dark:border-gray-800 last:border-b-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <input type="checkbox" v-model="item.selected" @change="updateGroupSelect(groupIndex)" class="w-4 h-4 accent-primary rounded mt-4 shrink-0" />
                
                <!-- Product image -->
                <div class="w-20 h-20 shrink-0 rounded-sm overflow-hidden border border-gray-100 dark:border-gray-700">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </div>

                <!-- Product details -->
                <div class="flex-grow min-w-0">
                  <h3 class="text-sm text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">{{ item.name }}</h3>
                  <div v-if="item.variant" class="mt-1">
                    <span class="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded">{{ item.variant }}</span>
                  </div>
                  <div class="flex items-center gap-1 mt-1">
                    <span v-if="item.isFreeShipping" class="text-[10px] text-primary border border-primary px-1 py-0.5 rounded-sm">Freeship</span>
                    <span v-if="item.isReturn" class="text-[10px] text-green-600 border border-green-500 px-1 py-0.5 rounded-sm">Đổi trả miễn phí</span>
                  </div>
                </div>

                <!-- Price, quantity, subtotal (desktop) -->
                <div class="hidden md:flex items-center gap-0 shrink-0">
                  <!-- Price -->
                  <div class="w-28 text-center">
                    <div v-if="item.originalPrice" class="text-xs text-gray-400 line-through">{{ formatPrice(item.originalPrice) }}</div>
                    <div class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ formatPrice(item.price) }}</div>
                  </div>

                  <!-- Quantity control -->
                  <div class="w-32 flex items-center justify-center">
                    <QuantityControl v-model="item.quantity" :min="1" size="md" />
                  </div>

                  <!-- Subtotal -->
                  <div class="w-28 text-center">
                    <span class="text-sm font-medium text-primary">{{ formatPrice(item.price * item.quantity) }}</span>
                  </div>

                  <!-- Remove -->
                  <div class="w-16 text-center">
                    <button @click="removeItem(groupIndex, itemIndex)" class="text-gray-400 hover:text-red-500 transition-colors p-1">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Mobile: Price + Quantity -->
                <div class="md:hidden flex flex-col items-end gap-2 shrink-0">
                  <span class="text-sm font-medium text-primary">{{ formatPrice(item.price) }}</span>
                  <QuantityControl v-model="item.quantity" :min="1" size="sm" />
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Order Summary -->
          <div class="lg:w-[320px] shrink-0">
            <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4 sticky top-20">
              <!-- Voucher section -->
              <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Ticket class="w-4 h-4 text-primary" />
                    HiveSpace Voucher
                  </span>
                </div>
                <div class="flex gap-2">
                  <input type="text" v-model="voucherCode" placeholder="Nhập mã voucher" class="flex-grow px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400" />
                  <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 text-sm rounded-sm transition-colors whitespace-nowrap">Áp Dụng</button>
                </div>
              </div>

              <div class="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Tạm tính</span>
                  <span class="text-gray-800 dark:text-gray-200">{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Giảm giá</span>
                  <span class="text-green-600">-{{ formatPrice(discount) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Phí vận chuyển</span>
                  <span class="text-gray-800 dark:text-gray-200">{{ shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee) }}</span>
                </div>
              </div>

              <div class="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Tổng tiền</span>
                  <div class="text-right">
                    <span class="text-xl font-bold text-primary">{{ formatPrice(total) }}</span>
                    <div class="text-xs text-gray-400">(Đã bao gồm VAT)</div>
                  </div>
                </div>
                <button class="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-sm font-medium text-sm transition-colors shadow-sm hover:shadow-md">
                  Mua Hàng ({{ selectedCount }})
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="mt-8">
          <div class="bg-white dark:bg-card-dark rounded-sm shadow-sm p-4">
            <h2 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Sản phẩm bạn có thể thích</h2>
            <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              <div v-for="product in recommendedProducts" :key="product.id"
                class="shrink-0 w-[160px] border border-gray-100 dark:border-gray-700 rounded-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div class="w-full h-[160px] overflow-hidden">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div class="p-2">
                  <p class="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 leading-snug mb-1">{{ product.name }}</p>
                  <div class="flex items-center gap-1">
                    <span class="text-sm font-medium text-primary">{{ formatPrice(product.price) }}</span>
                    <span v-if="product.discount" class="text-[10px] text-white bg-primary px-1 rounded">-{{ product.discount }}%</span>
                  </div>
                  <div class="text-[10px] text-gray-400 mt-0.5">Đã bán {{ product.sold }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <StorefrontFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Truck, Trash2, Store, Ticket } from 'lucide-vue-next'
import { QuantityControl } from '@hivespace/shared'
import CartHeader from '@/components/layout/CartHeader.vue'
import StorefrontFooter from '@/components/layout/StorefrontFooter.vue'

// Types
interface CartItem {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  quantity: number
  variant?: string
  selected: boolean
  isFreeShipping?: boolean
  isReturn?: boolean
}

interface CartGroup {
  sellerName: string
  isMall: boolean
  selected: boolean
  items: CartItem[]
}

// Mock data
const cartGroups = ref<CartGroup[]>([
  {
    sellerName: 'HiveSpace Official Store',
    isMall: true,
    selected: true,
    items: [
      {
        id: '1',
        name: '[CHÍNH HÃNG] Tai nghe Bluetooth không dây TWS Pro 5.0 - Âm thanh Hi-Fi, chống ồn chủ động ANC',
        image: 'https://picsum.photos/200?random=1',
        price: 589000,
        originalPrice: 1200000,
        quantity: 1,
        variant: 'Màu Đen',
        selected: true,
        isFreeShipping: true,
        isReturn: true,
      },
      {
        id: '2',
        name: 'Ốp lưng iPhone 15 Pro Max silicon cao cấp chống sốc, chống bẩn - Bảo vệ camera',
        image: 'https://picsum.photos/200?random=2',
        price: 159000,
        originalPrice: 350000,
        quantity: 2,
        variant: 'Trong suốt',
        selected: true,
        isFreeShipping: true,
      },
    ],
  },
  {
    sellerName: 'TechWorld Việt Nam',
    isMall: false,
    selected: true,
    items: [
      {
        id: '3',
        name: 'Cáp sạc nhanh USB-C to Lightning 20W cho iPhone - Dây dù chống đứt, dài 1.5m',
        image: 'https://picsum.photos/200?random=3',
        price: 89000,
        quantity: 1,
        selected: true,
        isFreeShipping: true,
        isReturn: true,
      },
    ],
  },
  {
    sellerName: 'Mỹ Phẩm Authentic',
    isMall: true,
    selected: false,
    items: [
      {
        id: '4',
        name: 'Kem chống nắng La Roche-Posay Anthelios UVMune 400 SPF50+ 50ml - Bảo vệ da tối ưu',
        image: 'https://picsum.photos/200?random=4',
        price: 425000,
        originalPrice: 530000,
        quantity: 1,
        variant: 'Fluide 50ml',
        selected: false,
        isFreeShipping: true,
      },
      {
        id: '5',
        name: 'Nước tẩy trang Bioderma Sensibio H2O 500ml - Dành cho da nhạy cảm',
        image: 'https://picsum.photos/200?random=5',
        price: 369000,
        originalPrice: 485000,
        quantity: 1,
        selected: false,
        isReturn: true,
      },
    ],
  },
  {
    sellerName: 'Thời Trang Plus',
    isMall: false,
    selected: true,
    items: [
      {
        id: '6',
        name: 'Áo thun nam cotton 100% cổ tròn basic - Form Regular thoáng mát, co giãn 4 chiều',
        image: 'https://picsum.photos/200?random=6',
        price: 129000,
        originalPrice: 250000,
        quantity: 3,
        variant: 'Trắng / XL',
        selected: true,
        isFreeShipping: true,
      },
    ],
  },
])

const voucherCode = ref('')
const selectAll = ref(false)

// Computed
const totalItems = computed(() =>
  cartGroups.value.reduce((sum, g) => sum + g.items.length, 0)
)

const selectedCount = computed(() =>
  cartGroups.value.reduce((sum, g) => sum + g.items.filter(i => i.selected).length, 0)
)

const subtotal = computed(() =>
  cartGroups.value.reduce(
    (sum, g) => sum + g.items.filter(i => i.selected).reduce((s, i) => s + i.price * i.quantity, 0),
    0
  )
)

const discount = computed(() => Math.floor(subtotal.value * 0.05)) // Mock 5% discount
const shippingFee = computed(() => (subtotal.value >= 300000 ? 0 : 30000))
const total = computed(() => subtotal.value - discount.value + shippingFee.value)

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

const toggleSelectAll = () => {
  cartGroups.value.forEach(g => {
    g.selected = selectAll.value
    g.items.forEach(i => (i.selected = selectAll.value))
  })
}

const toggleGroupSelect = (groupIndex: number) => {
  const group = cartGroups.value[groupIndex]
  if (!group) return
  group.items?.forEach(i => (i.selected = group.selected))
  updateSelectAll()
}

const updateGroupSelect = (groupIndex: number) => {
  const group = cartGroups.value[groupIndex]
  if (!group || !group.items) return
  group.selected = group.items.every(i => i.selected)
  updateSelectAll()
}

const updateSelectAll = () => {
  selectAll.value = cartGroups.value.every(g => g.selected)
}

// QuantityControl handles increment/decrement/input via v-model

const removeItem = (gIdx: number, iIdx: number) => {
  const group = cartGroups.value[gIdx]
  if (!group || !group.items) return
  
  group.items.splice(iIdx, 1)
  if (group.items.length === 0) {
    cartGroups.value.splice(gIdx, 1)
  }
  updateSelectAll()
}

const removeSelected = () => {
  cartGroups.value.forEach(g => {
    g.items = g.items.filter(i => !i.selected)
  })
  cartGroups.value = cartGroups.value.filter(g => g.items.length > 0)
  updateSelectAll()
}

// Recommended products
const recommendedProducts = Array.from({ length: 10 }).map((_, i) => ({
  id: `rec-${i}`,
  name: `Sản phẩm gợi ý ${i + 1} - Chất lượng cao, giá tốt nhất thị trường`,
  image: `https://picsum.photos/200?random=${i + 50}`,
  price: Math.floor(Math.random() * 500000) + 50000,
  discount: Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 10 : undefined,
  sold: Math.floor(Math.random() * 5000),
}))
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
