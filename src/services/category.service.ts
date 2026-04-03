import type { HomepageCategory } from '@/types'
import { apiService } from './api.ts'
import { buildApiUrl } from '@/config'

const CATEGORY_ENDPOINTS = {
  HOMEPAGE: '/categories/homepage',
} as const

class CategoryService {
  async getHomepageCategories(): Promise<HomepageCategory[]> {
    const url = buildApiUrl(CATEGORY_ENDPOINTS.HOMEPAGE)
    return await apiService.get<HomepageCategory[]>(url)
  }
}

export const categoryService = new CategoryService()
