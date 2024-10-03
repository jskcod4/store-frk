import type { Product } from './product'

export interface ProductRepository {
  getProducts(): Promise<Product[]>
  saveProducts(products: Product[]): Promise<void>
  saveOneProduct(product: Product): Promise<void>
}
