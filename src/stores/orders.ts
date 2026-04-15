import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Order, OrderStatus } from '@/types'

const FAKE_ORDERS: Order[] = [
  {
    id: 'ORD001',
    shopId: 'shop1',
    shopName: 'DULY.COSMETIC',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 98771,
    createdAt: '2025-05-11T10:00:00Z',
    updatedAt: '2025-05-13T08:00:00Z',
    items: [
      {
        id: 'item001',
        productId: 'p001',
        productName: 'Dầu gội đầu KERATIN MARUBI cặp dầu gội xả phục hồi tóc khô rụng tóc 750ml chính hãng',
        variantLabel: 'Phân loại hàng: 6#',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 152000,
        finalPrice: 98771,
      },
    ],
  },
  {
    id: 'ORD002',
    shopId: 'shop2',
    shopName: 'TOKYOLIFE OFFICIAL',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 548000,
    createdAt: '2025-05-11T11:00:00Z',
    updatedAt: '2025-05-13T09:00:00Z',
    items: [
      {
        id: 'item002',
        productId: 'p002',
        productName: 'Áo khoác chống nắng nữ SunStop Master chống tia UV dạng dài thoáng mát tối ưu TOKYOLIFE 4000096',
        variantLabel: 'Phân loại hàng: Ống tay 12.M',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 709000,
        finalPrice: 389000,
      },
      {
        id: 'item003',
        productId: 'p003',
        productName: 'Tất Tite Vải Tải Sử Dụng TOKYOLIFE 4000565',
        variantLabel: 'x1',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 0,
        finalPrice: 159000,
      },
    ],
  },
  {
    id: 'ORD003',
    shopId: 'shop3',
    shopName: 'DUREX CHÍNH HÃNG',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 267120,
    createdAt: '2025-05-09T10:00:00Z',
    updatedAt: '2025-05-11T08:00:00Z',
    items: [
      {
        id: 'item004',
        productId: 'p004',
        productName: 'Bao Cao Su Durex Invisible Siêu Mỏng, Size 52 mm, Hộp 10 Bao Mỏng Ôm Ra Mát - Hộp Lớn Siêu Tiết Kiệm',
        variantLabel: 'Phân loại hàng: Chính hãng',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 318000,
        finalPrice: 267120,
      },
    ],
  },
  {
    id: 'ORD004',
    shopId: 'shop4',
    shopName: 'L&H Beauty Corner',
    shopBadge: undefined,
    status: 'cancelled',
    statusLabel: 'Đã Hủy',
    totalPrice: 195000,
    createdAt: '2025-05-08T10:00:00Z',
    updatedAt: '2025-05-09T08:00:00Z',
    items: [
      {
        id: 'item005',
        productId: 'p005',
        productName: 'Nước hoa nữ Flora hồng chất 10ml nhiều bùa hương thơm ngọt ngào gợi cảm lưu thư',
        variantLabel: 'x1',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 0,
        finalPrice: 175104,
      },
      {
        id: 'item006',
        productId: 'p006',
        productName: 'Nước hoa nam, nước hoa U Li La Male le 10ml nam tính, phóng khoáng, mạnh mẽ - L.E.M.A.L.E',
        variantLabel: 'x1',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 0,
        finalPrice: 109266,
      },
    ],
  },
  {
    id: 'ORD005',
    shopId: 'shop5',
    shopName: 'UKIO Official Store',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 287550,
    createdAt: '2025-04-24T10:00:00Z',
    updatedAt: '2025-04-26T08:00:00Z',
    items: [
      {
        id: 'item007',
        productId: 'p007',
        productName: 'Đồng hồ led đề bàn báo thức UKIO màn hình LCD cao cấp đo nhiệt độ - ngày, tháng',
        variantLabel: 'Phân loại hàng: Đen carbon',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 175000,
        finalPrice: 287550,
      },
    ],
  },
  {
    id: 'ORD006',
    shopId: 'shop6',
    shopName: 'Gear24h Store',
    shopBadge: 'Yêu Thích',
    status: 'cancelled',
    statusLabel: 'Đã Hủy',
    totalPrice: 959200,
    createdAt: '2025-04-22T10:00:00Z',
    updatedAt: '2025-04-23T08:00:00Z',
    items: [
      {
        id: 'item008',
        productId: 'p008',
        productName: 'Giá Treo / ARM màn hình Human Motion T6 Pro | Màn 17 -> 32 cm®, Trong tải tối đa 9kg)',
        variantLabel: 'Phân loại hàng: Đen (Oct 2020 - 3 đỉng)',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 1100000,
        finalPrice: 959200,
      },
    ],
  },
  {
    id: 'ORD007',
    shopId: 'shop7',
    shopName: 'Elan Sneaker',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 803400,
    createdAt: '2025-04-24T10:00:00Z',
    updatedAt: '2025-04-26T08:00:00Z',
    items: [
      {
        id: 'item009',
        productId: 'p009',
        productName: '[Elan Sneaker] "Giày Adidas Ultraboost 6.0 - Êm Ái, Phong Cách Thể Thao Cho Nam Nữ"',
        variantLabel: 'Phân loại hàng: 42',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 1000000,
        finalPrice: 680000,
      },
      {
        id: 'item010',
        productId: 'p010',
        productName: 'Box đóng gói bảo vệ giày chống va đập',
        variantLabel: 'x1',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 0,
        finalPrice: 123400,
      },
    ],
  },
  {
    id: 'ORD008',
    shopId: 'shop8',
    shopName: 'Andy Store',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 175100,
    createdAt: '2025-04-24T10:00:00Z',
    updatedAt: '2025-04-26T08:00:00Z',
    items: [
      {
        id: 'item011',
        productId: 'p011',
        productName: '[Hàng Loại 1] Cross Nam Nữ - Dép sục nam nữ Classic Clop siêu êm',
        variantLabel: 'Phân loại hàng: Đen 42',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 226000,
        finalPrice: 175100,
      },
    ],
  },
  {
    id: 'ORD009',
    shopId: 'shop9',
    shopName: 'Giày Nuddo',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 310750,
    createdAt: '2025-04-24T10:00:00Z',
    updatedAt: '2025-04-26T08:00:00Z',
    items: [
      {
        id: 'item012',
        productId: 'p012',
        productName: 'Giày Công Sở Nữ 3 Phân Đế Vuông, Guốc Nập Viên Hằng Không Mũi Vuông Da mềm NUDDO NU005',
        variantLabel: 'Phân loại hàng: Đen 35',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 380000,
        finalPrice: 310750,
      },
    ],
  },
  {
    id: 'ORD010',
    shopId: 'shop10',
    shopName: 'Hime Store Việt Nam',
    shopBadge: 'Yêu Thích',
    status: 'completed',
    statusLabel: 'Hoàn Thành',
    totalPrice: 322800,
    createdAt: '2025-04-24T10:00:00Z',
    updatedAt: '2025-04-26T08:00:00Z',
    items: [
      {
        id: 'item013',
        productId: 'p013',
        productName: 'Socola Nama Royce Nhật Bản Đủ Vị, Kèm Thiệt Na Viết Thiệp Quà Tặng Valentine Ý Nghĩa (ONLY HOA TỐC)',
        variantLabel: 'Phân loại hàng: Cacao',
        imageUrl: 'https://placehold.co/80x80/f5f5f5/999?text=SP',
        quantity: 1,
        originalPrice: 312000,
        finalPrice: 322800,
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
