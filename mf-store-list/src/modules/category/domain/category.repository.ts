import type { Category } from './category'

export interface CategoryRepository {
  getCategoryDetail(): Promise<Category>
  saveCategoryDetail(category: Category): Promise<void>
}
