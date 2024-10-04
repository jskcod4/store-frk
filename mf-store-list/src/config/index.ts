import { createLocalStorageCategoryRepository } from '@/modules/category/infraestructure'
import { createLocalStorageProductRepository } from '@/modules/product/infrastructure'

export const DefaultProductRepository = createLocalStorageProductRepository()
export const DefaultCategoryRepository = createLocalStorageCategoryRepository()
