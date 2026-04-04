// Product-related types
export interface ProductVariantOption {
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
  id?: string
  key?: string
  skuVariants: {
    variantName: string
    value: string
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
  data: T[]
  total: number
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

export interface ProductAttribute {
  attributeId: number
  attributeName: string
  groupId?: number
  groupName?: string
  selectedValueIds: number[]
  freeTextValue?: string
  nameValue: string[]
}

export interface ProductDetail {
  id?: string
  name: string
  category: string
  description?: string
  variants: ProductVariant[]
  skus: ProductSku[]
  images?: ProductImage[]
  attributes: ProductAttribute[]
  currentSeller: CurrentSeller | null
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