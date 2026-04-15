import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Order, OrderStatus } from '@/types'

const FAKE_ORDERS: Order[] = [
  {
    id: 'ORD001',
    shopId: 'shop1',
    shopName: 'Nhà Thuốc Long Châu',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 145000,
    createdAt: '2026-03-20T09:00:00Z',
    updatedAt: '2026-03-22T14:00:00Z',
    items: [
      {
        id: 'item001',
        productId: 'p001',
        productName: 'Sữa rửa mặt CeraVe Hydrating Facial Cleanser dành cho da khô và da thường 236ml',
        variantLabel: 'Phân loại: 236ml',
        imageUrl: 'https://picsum.photos/seed/cerave/80/80',
        quantity: 1,
        originalPrice: 185000,
        finalPrice: 145000,
      },
    ],
  },
  {
    id: 'ORD002',
    shopId: 'shop2',
    shopName: 'Biti\'s Official Store',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 689000,
    createdAt: '2026-03-18T10:30:00Z',
    updatedAt: '2026-03-21T08:00:00Z',
    items: [
      {
        id: 'item002',
        productId: 'p002',
        productName: 'Giày Thể Thao Nam Biti\'s Hunter X Street DSMH09300 - Đế Boost Êm Ái Thoáng Khí',
        variantLabel: 'Màu: Đen | Size: 42',
        imageUrl: 'https://picsum.photos/seed/bitis1/80/80',
        quantity: 1,
        originalPrice: 899000,
        finalPrice: 589000,
      },
      {
        id: 'item003',
        productId: 'p003',
        productName: 'Tất thể thao cổ thấp Biti\'s chống hôi chân kháng khuẩn (1 đôi)',
        variantLabel: 'Size: L',
        imageUrl: 'https://picsum.photos/seed/bitis2/80/80',
        quantity: 2,
        originalPrice: 65000,
        finalPrice: 50000,
      },
    ],
  },
  {
    id: 'ORD003',
    shopId: 'shop3',
    shopName: 'Samsung Việt Nam Official',
    shopBadge: 'Mall',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 12490000,
    createdAt: '2026-03-10T11:00:00Z',
    updatedAt: '2026-03-13T16:00:00Z',
    items: [
      {
        id: 'item004',
        productId: 'p004',
        productName: 'Điện Thoại Samsung Galaxy A55 5G 8GB/256GB - Chính Hãng Việt Nam, Bảo Hành 24 Tháng',
        variantLabel: 'Màu: Xanh Navy | Bộ nhớ: 8GB/256GB',
        imageUrl: 'https://picsum.photos/seed/samsung55/80/80',
        quantity: 1,
        originalPrice: 13490000,
        finalPrice: 12490000,
      },
    ],
  },
  {
    id: 'ORD004',
    shopId: 'shop4',
    shopName: 'Bookstore Fahasa',
    shopBadge: undefined,
    status: 'cancelled',
    statusLabel: 'Đã Hủy',
    totalPrice: 178000,
    createdAt: '2026-03-05T08:00:00Z',
    updatedAt: '2026-03-05T15:00:00Z',
    items: [
      {
        id: 'item005',
        productId: 'p005',
        productName: 'Đắc Nhân Tâm - Dale Carnegie (Bìa Cứng, Tái Bản 2024)',
        variantLabel: 'x1',
        imageUrl: 'https://picsum.photos/seed/book1/80/80',
        quantity: 1,
        originalPrice: 120000,
        finalPrice: 98000,
      },
      {
        id: 'item006',
        productId: 'p006',
        productName: 'Nhà Giả Kim - Paulo Coelho (Bìa Mềm)',
        variantLabel: 'x1',
        imageUrl: 'https://picsum.photos/seed/book2/80/80',
        quantity: 1,
        originalPrice: 95000,
        finalPrice: 80000,
      },
    ],
  },
  {
    id: 'ORD005',
    shopId: 'shop5',
    shopName: 'Vinamilk Official',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 215000,
    createdAt: '2026-02-28T07:00:00Z',
    updatedAt: '2026-03-02T10:00:00Z',
    items: [
      {
        id: 'item007',
        productId: 'p007',
        productName: 'Thùng 48 Hộp Sữa Tươi Tiệt Trùng Vinamilk 100% Có Đường 180ml',
        variantLabel: 'Phân loại: 180ml x 48 hộp',
        imageUrl: 'https://picsum.photos/seed/vinamilk/80/80',
        quantity: 1,
        originalPrice: 245000,
        finalPrice: 215000,
      },
    ],
  },
  {
    id: 'ORD006',
    shopId: 'shop6',
    shopName: 'Điện Máy Xanh',
    shopBadge: 'Yêu Thích',
    status: 'cancelled',
    statusLabel: 'Đã Hủy',
    totalPrice: 3290000,
    createdAt: '2026-02-20T13:00:00Z',
    updatedAt: '2026-02-20T18:00:00Z',
    items: [
      {
        id: 'item008',
        productId: 'p008',
        productName: 'Nồi Chiên Không Dầu Philips HD9200/91 4.1L - Tự Động Điều Chỉnh Nhiệt Độ',
        variantLabel: 'Dung tích: 4.1L | Màu: Đen',
        imageUrl: 'https://picsum.photos/seed/philips/80/80',
        quantity: 1,
        originalPrice: 3990000,
        finalPrice: 3290000,
      },
    ],
  },
  {
    id: 'ORD007',
    shopId: 'shop7',
    shopName: 'The Coffee House',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 310000,
    createdAt: '2026-02-14T09:00:00Z',
    updatedAt: '2026-02-16T11:00:00Z',
    items: [
      {
        id: 'item009',
        productId: 'p009',
        productName: 'Cà Phê Rang Xay The Coffee House - Blend Đặc Biệt 500g (Pha Phin/Pha Máy)',
        variantLabel: 'Loại: Blend Đặc Biệt | 500g',
        imageUrl: 'https://picsum.photos/seed/coffee/80/80',
        quantity: 2,
        originalPrice: 175000,
        finalPrice: 155000,
      },
    ],
  },
  {
    id: 'ORD008',
    shopId: 'shop8',
    shopName: 'Uniqlo Việt Nam',
    shopBadge: 'Mall',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 899000,
    createdAt: '2026-02-10T14:00:00Z',
    updatedAt: '2026-02-13T09:00:00Z',
    items: [
      {
        id: 'item010',
        productId: 'p010',
        productName: 'Áo Khoác Lông Vũ Siêu Nhẹ Uniqlo Ultra Light Down Nam (Mùa Đông 2025)',
        variantLabel: 'Màu: Xám Đậm | Size: L',
        imageUrl: 'https://picsum.photos/seed/uniqlo/80/80',
        quantity: 1,
        originalPrice: 1190000,
        finalPrice: 899000,
      },
    ],
  },
  {
    id: 'ORD009',
    shopId: 'shop9',
    shopName: 'Nutifood Official',
    shopBadge: 'Yêu Thích',
    status: 'shipping',
    statusLabel: 'Đang Vận Chuyển',
    totalPrice: 425000,
    createdAt: '2026-04-14T08:00:00Z',
    updatedAt: '2026-04-15T07:00:00Z',
    items: [
      {
        id: 'item011',
        productId: 'p011',
        productName: 'Sữa Bột Nutifood NutiMilk Gold Cho Trẻ 1-3 Tuổi Lon 900g - Hỗ Trợ Phát Triển Trí Não',
        variantLabel: 'Khối lượng: 900g',
        imageUrl: 'https://picsum.photos/seed/nutifood/80/80',
        quantity: 1,
        originalPrice: 465000,
        finalPrice: 425000,
      },
    ],
  },
  {
    id: 'ORD010',
    shopId: 'shop10',
    shopName: 'Guardian Việt Nam',
    shopBadge: 'Yêu Thích',
    status: 'pending_payment',
    statusLabel: 'Chờ Thanh Toán',
    totalPrice: 568000,
    createdAt: '2026-04-16T06:30:00Z',
    updatedAt: '2026-04-16T06:30:00Z',
    items: [
      {
        id: 'item012',
        productId: 'p012',
        productName: 'Kem Chống Nắng Anessa Perfect UV Sunscreen SPF50+ PA++++ 60g - Chống Nước Chống Mồ Hôi',
        variantLabel: 'Dung tích: 60g',
        imageUrl: 'https://picsum.photos/seed/anessa/80/80',
        quantity: 1,
        originalPrice: 620000,
        finalPrice: 568000,
      },
    ],
  },
]

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])
  const activeTab = ref<OrderStatus | 'all'>('all')
  const searchQuery = ref('')
  const isLoading = ref(false)

  const filteredOrders = computed(() => {
    let result = orders.value

    if (activeTab.value !== 'all') {
      result = result.filter((o) => o.status === activeTab.value)
    }

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase()
      result = result.filter(
        (o) =>
          o.shopName.toLowerCase().includes(q) ||
          o.items.some((item) => item.productName.toLowerCase().includes(q)),
      )
    }

    return result
  })

  const fetchOrders = async () => {
    isLoading.value = true
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      orders.value = FAKE_ORDERS
    } finally {
      isLoading.value = false
    }
  }

  const setTab = (tab: OrderStatus | 'all') => {
    activeTab.value = tab
  }

  const setSearchQuery = (q: string) => {
    searchQuery.value = q
  }

  return { orders, activeTab, searchQuery, filteredOrders, isLoading, fetchOrders, setTab, setSearchQuery }
})
