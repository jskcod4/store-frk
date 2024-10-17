import { createLocalStorageCategoryRepository } from '@/modules/category/infraestructure'
import { createAwsFetchCategoryRepository } from '@/modules/category/infraestructure/aws-fetch.repository'
import { createLocalStorageProductRepository } from '@/modules/product/infrastructure'
import { createAwsFetchProductRepository } from '@/modules/product/infrastructure/aws-fetch.repository'

export const LocalStorageProductRepository = createLocalStorageProductRepository()
export const LocalStorageCategoryRepository = createLocalStorageCategoryRepository()

export const AwsProductRepository = createAwsFetchProductRepository()
export const AwsCategoryRepository = createAwsFetchCategoryRepository()

export const URL_GET_PRODUCTS =
  'https://bo61hvbujj.execute-api.us-east-2.amazonaws.com/prod/products'

export const URL_GET_CATEGORIES =
  'https://bo61hvbujj.execute-api.us-east-2.amazonaws.com/prod/categories'

export const URL_SEARCH_PRODUCTS =
  'https://bo61hvbujj.execute-api.us-east-2.amazonaws.com/prod/search'
