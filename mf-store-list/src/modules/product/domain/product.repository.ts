import type { Criteria } from '@/modules/shared'
import type { Product } from './product'

export interface ProductRepository {
  findByCriteria(criteria: Criteria<Product>): Promise<Product[]>
  getProducts(): Promise<Product[]>
  saveProducts(products: Product[]): Promise<void>
  saveOneProduct(product: Product): Promise<void>
}
