import type { Product } from '../domain/product'
import type { ProductRepository } from '../domain/product.repository'

export function createLocalStorageProductRepository(): ProductRepository {
  return {
    async getProducts(): Promise<Product[]> {
      const products = localStorage.getItem('products')
      return products ? JSON.parse(products) : []
    },
    async saveProducts(products: Product[]) {
      for (const product of products) {
        this.saveOneProduct(product)
      }
    },
    async saveOneProduct(product: Product) {
      const products = getAllFromLocalStorage()

      products.set(product.id, product)

      const productsParsed = Array.from(products.entries())

      localStorage.setItem('products', JSON.stringify(productsParsed))

      await Promise.resolve()
    }
  }
}

function getAllFromLocalStorage(): Map<string, Product> {
  const products = localStorage.getItem('products')

  if (products === null) {
    return new Map()
  }

  const productsParsed = JSON.parse(products) as Product[]

  const resultsToMap = new Map(productsParsed as Iterable<[string, Product]>)

  return resultsToMap
}
