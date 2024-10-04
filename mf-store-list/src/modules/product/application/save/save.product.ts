import type { ProductRepository } from '../../domain'
import type { Product } from '../../domain/product'

export function saveProduct(productRepository: ProductRepository, product: Product): Promise<void> {
  return productRepository.saveProducts([product])
}
