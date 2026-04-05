// Product-related types
export interface ProductVariantOption {
  optionId: string
  value: string
}

export interface ProductVariant {
  id: string // Using UUID string
  name: string
  options: ProductVariantOption[]
}

export interface ProductSkuImage {
  skuId: string
  fileId: string
}

export interface ProductImage {
  skuId?: string
  fileId: string
}

export interface ProductSku {
  id?: string // Keep for backward compatibility
  key?: string // New composite key based on variant combinations
  skuVariants: {
    variantId: string // Using UUID string to match ProductVariant.id
    value: string
    optionId: string
  }[]
  price: { amount: number; currency: number }
  quantity?: number | string
  skuNo?: string
  imageFileName?: string
  images?: ProductSkuImage[]
}

export interface Product {
  id?: string
  name: string
  category: string
  description?: string
  variants: ProductVariant[]
  skus: ProductSku[]
  images?: ProductImage[]
  // Add more fields as needed
}

// Search/paging contracts
export interface ProductSearchRequest {
  keyword?: string
  sort?: 'ASC' | 'DESC'
  pageSize: number
  pageIndex: number
}

export interface PagedResponse<T> {
  items: T[]
  pagination: {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

export interface Product {
  id?: string
  name: string
  category: string
  description?: string
  variants: ProductVariant[]
  skus: ProductSku[]
  images?: ProductImage[]
  // Add more fields as needed
}

export interface ProductDetail {
  id?: string
  name: string
  category: string
  description?: string
  variants: ProductVariant[]
  skus: ProductSku[]
  images?: ProductImage[]
  currentSeller: CurrentSeller
}

export interface CurrentSeller {
  id: string
  storeName: string  ,
  logoUrl: string
}



export interface ProductSummary {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  soldCount: number
  rating: number
  discountPercentage?: number
  isMall?: boolean
  isPreferred?: boolean
  isFreeShipping?: boolean
  isVoucher?: boolean
}

export interface PagingRequest {
  pageSize: number
  pageIndex: number
}