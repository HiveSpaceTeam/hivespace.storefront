import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryService } from '@/services/category.service'
import type { HomepageCategory } from '@/types'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<HomepageCategory[]>([])
  const isLoading = ref(false)

  const fetchCategories = async () => {
    isLoading.value = true
    try {
      categories.value = await categoryService.getHomepageCategories()
    } finally {
      isLoading.value = false
    }
  }

  return { categories, isLoading, fetchCategories }
})
