import type {
  ProductSummary,
  PagingRequest,
  PagedResponse,
  Product
} from '@/types/index.ts'
import { apiService } from './api.ts'
import { buildApiUrl } from '@/config'

const PRODUCT_ENDPOINTS = {
  SUMMARIES: '/products/summaries',
  PRODUCTS: '/products',
} as const

class ProductService {
  
  /**
   * Retrieve products list
   */
  async getProducts(params: PagingRequest): Promise<PagedResponse<ProductSummary>> {
    const url = buildApiUrl(PRODUCT_ENDPOINTS.SUMMARIES)
    return await apiService.get<PagedResponse<ProductSummary>>(url, { params })
  }  
  
  /**
   * Retrieve a single product by id
   */
  async getProductById(id: string): Promise<Product> {
    const url = buildApiUrl(`${PRODUCT_ENDPOINTS.PRODUCTS}/${id}`)
    return await apiService.get<Product>(url)
  }

}

export const productService = new ProductService()
