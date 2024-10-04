import { CategoryMock } from '../../domain'
import type { Category } from '../../domain/category'
import type { CategoryRepository } from '../../domain/category.repository'

export async function getAllCategories(CategoryRepository: CategoryRepository): Promise<Category> {
  // await CategoryRepository.saveCategoryDetail(CategoryMock)
  return CategoryRepository.getCategoryDetail()
}
