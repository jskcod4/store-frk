import type { Category } from '../domain/category'
import type { CategoryRepository } from '../domain/category.repository'

export function createLocalStorageCategoryRepository(): CategoryRepository {
  return {
    async getCategoryDetail(): Promise<Category> {
      const category = localStorage.getItem('category')
      return category ? JSON.parse(category) : null
    },
    async saveCategoryDetail(category: Category): Promise<void> {
      localStorage.setItem('category', JSON.stringify(category))
    }
  }
}
