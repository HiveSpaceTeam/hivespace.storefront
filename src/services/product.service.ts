import type {
  ProductSummary,
  PagingRequest,
  PagedResponse
} from '@/types/index.ts'
import { apiService } from './api.ts'
import { buildApiUrl } from '@/config'

const PRODUCT_ENDPOINTS = {
  PRODUCTS: '/products/summaries',
} as const

class ProductService {
  
  /**
   * Retrieve products list
   */
  async getProducts(params: PagingRequest): Promise<PagedResponse<ProductSummary>> {
    const url = buildApiUrl(PRODUCT_ENDPOINTS.PRODUCTS)
    return await apiService.get<PagedResponse<ProductSummary>>(url, { params })
  }

}

export const productService = new ProductService()
