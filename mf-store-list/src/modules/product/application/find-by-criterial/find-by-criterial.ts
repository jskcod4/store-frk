import type { Criteria } from '@/modules/shared'
import type { Product } from '../../domain/product'
import type { ProductRepository } from '../../domain'

export function findByCriteria(
  productRepository: ProductRepository,
  criteria: Criteria<Product>
): Promise<Product[]> {
  return productRepository.findByCriteria(criteria)
}
