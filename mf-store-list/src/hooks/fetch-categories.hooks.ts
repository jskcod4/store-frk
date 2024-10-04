import { getAllCategories } from '@/modules/category/application/get-detail/get-detail.category'
import type { Category } from '@/modules/category/domain/category'
import type { CategoryRepository } from '@/modules/category/domain/category.repository'
import { reactive } from 'vue'

export function useFetchCategories(repository: CategoryRepository) {
  const data = reactive({
    isLoading: false,
    error: false,
    category: {} as Category
  })

  async function fetchCategoryDetail() {
    try {
      data.isLoading = true
      const res = await getAllCategories(repository)
      data.category = res
      data.error = false
    } catch (error) {
      data.error = true
    } finally {
      data.isLoading = false
    }
  }

  return { data, fetchCategoryDetail }
}
