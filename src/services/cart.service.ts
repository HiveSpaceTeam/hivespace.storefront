import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type {
  GetCartItemsResponse,
  AddCartItemRequest,
  AddCartItemResponse,
  UpdateCartItemsRequest,
} from '@/types'

const CART_ENDPOINTS = {
  ITEMS: '/carts/items',
  ITEM: (cartItemId: string) => `/carts/items/${cartItemId}`,
} as const

class CartService {
  async getCartItems(): Promise<GetCartItemsResponse> {
    const url = buildApiUrl(CART_ENDPOINTS.ITEMS)
    return await apiService.get<GetCartItemsResponse>(url)
  }

  async addCartItem(data: AddCartItemRequest): Promise<AddCartItemResponse> {
    const url = buildApiUrl(CART_ENDPOINTS.ITEMS)
    return await apiService.post<AddCartItemResponse>(url, data)
  }

  async removeCartItem(cartItemId: string): Promise<void> {
    const url = buildApiUrl(CART_ENDPOINTS.ITEM(cartItemId))
    await apiService.delete(url)
  }

  async updateCartItems(data: UpdateCartItemsRequest): Promise<void> {
    const url = buildApiUrl(CART_ENDPOINTS.ITEMS)
    await apiService.put(url, data)
  }
}

export const cartService = new CartService()
