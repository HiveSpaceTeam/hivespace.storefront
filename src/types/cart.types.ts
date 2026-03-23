// Cart API types

export interface CartItemResponse {
  cartItemId: string
  productId: number
  skuId: number
  quantity: number
  isSelected: boolean
  productName: string
  productThumbnailUrl: string
  productStatus: number
  price: number
  currency: string
  skuNo: string
  skuImageUrl: string
  skuAttributes: string
  storeName: string
  storeStatus: number
  createdAt: string
  updatedAt: string
}

export interface CartPagination {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface GetCartItemsResponse {
  items: CartItemResponse[]
  pagination: CartPagination
}

export interface AddCartItemRequest {
  productId: number
  skuId: number
  quantity: number
}

export interface AddCartItemResponse {
  cartItemId: string
}

export interface UpdateCartItemPayload {
  cartItemId: string
  skuId: number
  quantity: number
  isSelected: boolean
}

export interface UpdateCartItemsRequest {
  selectAll: boolean | null
  items: UpdateCartItemPayload[]
}

export interface ApiErrorItem {
  code: string
  messageCode: string
  source: string
}

export interface ApiErrorResponse {
  errors: ApiErrorItem[]
  status: string
  timestamp: string
  traceId: string
  version: string
}
