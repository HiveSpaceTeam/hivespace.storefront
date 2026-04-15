export type OrderStatus =
  | 'pending_payment'
  | 'shipping'
  | 'pending_delivery'
  | 'completed'
  | 'cancelled'
  | 'return_refund'

export interface OrderItem {
  id: string
  productId: string
  productName: string
  variantLabel: string
  imageUrl: string
  quantity: number
  originalPrice: number
  finalPrice: number
}

export interface Order {
  id: string
  shopId: string
  shopName: string
  shopBadge?: string
  status: OrderStatus
  statusLabel: string
  items: OrderItem[]
  totalPrice: number
  createdAt: string
  updatedAt: string
}
