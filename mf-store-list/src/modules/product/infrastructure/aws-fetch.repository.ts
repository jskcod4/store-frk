import { URL_GET_PRODUCTS, URL_SEARCH_PRODUCTS } from '@/config'
import type { ProductRepository } from '../domain'
import type { Product } from '../domain/product'
import type { Criteria } from '@/modules/shared'

export function createAwsFetchProductRepository(): ProductRepository {
  return {
    async findByCriteria(criteria: Criteria<Product>) {
      const queryParams = transformCriteriaToAwsParams(criteria)
      const response = await fetch(`${URL_SEARCH_PRODUCTS}?${queryParams}`)
      const products = await awsProductAdapter(await response.json())
      return products
    },
    async getProducts() {
      const response = await fetch(URL_GET_PRODUCTS)
      const products = await awsProductAdapter(await response.json())
      return products
    },
    async saveProducts(products) {
      for (const product of products) {
        await this.saveOneProduct(product)
      }
    },
    async saveOneProduct(product) {
      await fetch('https://api.example.com/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
}

interface ProductFetchResponse {
  statusCode: number
  body: Product[]
}

export const awsProductAdapter = async (response: ProductFetchResponse): Promise<Product[]> => {
  if (response.statusCode !== 200) {
    throw new Error('Error fetching products')
  }
  return response.body
}

export const transformCriteriaToAwsParams = (criteria: Criteria<Product>): URLSearchParams => {
  const params: URLSearchParams = new URLSearchParams()
  const keys = Object.keys(criteria.filters)

  for (const key of keys) {
    if (criteria.filters[key]) {
      const data = criteria.filters[key]
      console.log((data as any).value)
      params.set(`${key}`, (data as any).value)
    }
  }
  return params
}
