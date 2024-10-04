import { getAllProducts } from '@/modules/product/application/get-all'
import type { ProductRepository } from '@/modules/product/domain'
import type { Product } from '@/modules/product/domain/product'
import { reactive } from 'vue'

export function useFetchProducts(repository: ProductRepository) {
  const data = reactive({
    isLoading: false,
    error: false,
    products: [] as Product[]
  })

  async function fetchProducts() {
    try {
      data.isLoading = true
      const res = await getAllProducts(repository)
      data.products = res
      data.error = false
    } catch (error) {
      data.error = true
    } finally {
      data.isLoading = false
    }
  }

  return { data, fetchProducts }
}
