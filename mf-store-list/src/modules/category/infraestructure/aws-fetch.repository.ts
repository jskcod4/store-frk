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

export const awsCategoryAdapter = async (response: Category[]): Promise<Category> => {
  if (response.length >= 1) {
    return response[0]
  }

  return {
    id: '0',
    name: 'Default category',
    colors: [],
    subcategories: [],
    prices: [],
    sizes: []
  }
}
