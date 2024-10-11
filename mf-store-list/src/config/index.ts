import { createLocalStorageCategoryRepository } from '@/modules/category/infraestructure'
import { createLocalStorageProductRepository } from '@/modules/product/infrastructure'
import { createAwsFetchProductRepository } from '@/modules/product/infrastructure/aws-fetch.repository'

export const LocalStorageProductRepository = createLocalStorageProductRepository()
export const LocalStorageCategoryRepository = createLocalStorageCategoryRepository()

export const AwsProductRepository = createAwsFetchProductRepository

export const URL_GET_PRODUCTS =
  'https://bo61hvbujj.execute-api.us-east-2.amazonaws.com/prod/products'
