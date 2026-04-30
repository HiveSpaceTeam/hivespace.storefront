// Filter param accepted by GET /api/v1/orders?processStatus=
export type CustomerOrderProcessStatus =
  | 'WaitingPayment'
  | 'Processing'
  | 'Shipping'
  | 'Delivered'
  | 'Cancelled'
  | 'ReturnRefund'

// Actual status values returned in the order response
export type OrderStatus =
  | 'Created'
  | 'Paid'
  | 'COD'
  | 'Confirmed'
  | 'ReadyToShip'
  | 'Shipped'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected'
  | 'Expired'
  | 'Refunding'
  | 'Refunded'
  | 'Solved'
  | 'Claimed'

export interface OrderItem {
  id: string
  productName: string
  productImage: string
  variation: string
  quantity: number
  tag?: string
  originalPrice: number
  unitPrice: number
  lineTotal: number
  currency: string
}

export interface Order {
  id: string
  shortId: string
  status: OrderStatus
  totalAmount: number
  currency: string
  createdAt: string
  itemCount: number
  items: OrderItem[]
}

export interface OrderPagination {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface OrdersResponse {
  orders: Order[]
  pagination: OrderPagination
}

export interface GetOrdersParams {
  processStatus?: CustomerOrderProcessStatus
  searchField: string
  searchValue: string
  page: number
  pageSize: number
}

export interface OrderDetailItem {
  id: string
  productId: number
  skuId: number
  productName: string
  skuName: string
  imageUrl: string
  quantity: number
  unitPrice: number
  lineTotal: number
  currency: string
  isCOD: boolean
}

export interface OrderDetail {
  id: string
  shortId: string
  userId: string
  storeId: string
  status: OrderStatus
  subTotal: number
  shippingFee: number
  totalAmount: number
  currency: string
  recipientName: string
  phone: string
  streetAddress: string
  commune: string
  province: string
  country: string
  notes?: string
  paymentMethod?: string
  createdAt: string
  paidAt?: string
  confirmedAt?: string
  items: OrderDetailItem[]
}
