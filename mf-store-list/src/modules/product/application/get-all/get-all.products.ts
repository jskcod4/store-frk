import type { Product } from '../../domain/product'
import type { ProductRepository } from '../../domain/product.repository'

export function getAllProducts(productRepository: ProductRepository): Promise<Product[]> {
  return productRepository.getProducts()
}
