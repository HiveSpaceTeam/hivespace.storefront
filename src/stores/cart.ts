import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cartService } from '@/services/cart.service'
import type { CartItem, CartGroup, CartItemResponse } from '@/types'

const parseSkuAttributes = (raw: string): string => {
  try {
    const attrs = JSON.parse(raw) as Record<string, string>
    return Object.entries(attrs).map(([k, v]) => `${k}: ${v}`).join(', ')
  } catch {
    return raw
  }
}

const mapApiItemsToGroups = (items: CartItemResponse[]): CartGroup[] => {
  const groupMap = new Map<string, CartGroup>()

  for (const item of items) {
    if (!groupMap.has(item.storeName)) {
      groupMap.set(item.storeName, {
        sellerName: item.storeName,
        isMall: false,
        selected: false,
        items: [],
      })
    }

    const group = groupMap.get(item.storeName)!
    group.items.push({
      id: item.cartItemId,
      cartItemId: item.cartItemId,
      skuId: item.skuId,
      name: item.productName,
      image: item.skuImageUrl || item.productThumbnailUrl,
      price: item.price,
      quantity: item.quantity,
      variant: item.skuAttributes ? parseSkuAttributes(item.skuAttributes) : undefined,
      selected: item.isSelected,
    })
  }

  for (const group of groupMap.values()) {
    group.selected = group.items.length > 0 && group.items.every(i => i.selected)
  }

  return Array.from(groupMap.values())
}

export const useCartStore = defineStore('cart', () => {
  const cartGroups = ref<CartGroup[]>([])
  const isLoading = ref(false)

  const loadCart = async () => {
    isLoading.value = true
    try {
      const response = await cartService.getCartItems()
      cartGroups.value = mapApiItemsToGroups(response.items)
    } finally {
      isLoading.value = false
    }
  }

  const syncItem = async (item: CartItem) => {
    await cartService.updateCartItems({
      selectAll: null,
      items: [{ cartItemId: item.cartItemId, skuId: item.skuId, quantity: item.quantity, isSelected: item.selected }],
    })
  }

  const syncItems = async (items: CartItem[], selectAll: boolean | null = null) => {
    if (items.length === 0) return
    await cartService.updateCartItems({
      selectAll,
      items: items.map(i => ({ cartItemId: i.cartItemId, skuId: i.skuId, quantity: i.quantity, isSelected: i.selected })),
    })
  }

  const removeItem = async (cartItemId: string) => {
    await cartService.removeCartItem(cartItemId)
    for (const group of cartGroups.value) {
      group.items = group.items.filter(i => i.cartItemId !== cartItemId)
    }
    cartGroups.value = cartGroups.value.filter(g => g.items.length > 0)
  }

  const removeItems = async (cartItemIds: string[]) => {
    if (cartItemIds.length === 0) return
    await Promise.all(cartItemIds.map(id => cartService.removeCartItem(id)))
    for (const group of cartGroups.value) {
      group.items = group.items.filter(i => !cartItemIds.includes(i.cartItemId))
    }
    cartGroups.value = cartGroups.value.filter(g => g.items.length > 0)
  }

  return { cartGroups, isLoading, loadCart, syncItem, syncItems, removeItem, removeItems }
})
