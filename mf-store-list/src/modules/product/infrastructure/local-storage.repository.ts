import type { Criteria } from '@/modules/shared'
import type { Product } from '../domain/product'
import type { ProductRepository } from '../domain/product.repository'

export function createLocalStorageProductRepository(): ProductRepository {
  return {
    async findByCriteria(criteria: Criteria<Product>): Promise<Product[]> {
      return new Promise((resolve) => {
        const products = localStorage.getItem('products')
        const convertedProducts = (products ? JSON.parse(products) : []) as Product[]
        setTimeout(() => {
          resolve(convertedProducts)
        }, 2000)
      })
    },
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
