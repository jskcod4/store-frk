import { URL_GET_CATEGORIES } from '@/config'
import type { Category, CategoryRepository } from '../domain'

export function createAwsFetchCategoryRepository(): CategoryRepository {
  return {
    async getCategoryDetail() {
      console.log('Fetching categories')
      const response = await fetch(URL_GET_CATEGORIES)
      const category = await awsCategoryAdapter(await response.json())
      return category
    },
    async saveCategoryDetail(category: Category) {}
  }
}

interface CategoryFetchResponse {
  statusCode: number
  body: Category[]
}

export const awsCategoryAdapter = async (response: CategoryFetchResponse): Promise<Category> => {
  if (response.statusCode !== 200) {
    throw new Error('Error fetching products')
  }
  return response.body[0]
}
