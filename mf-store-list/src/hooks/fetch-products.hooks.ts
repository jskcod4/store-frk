import {
  transformUICategoryToCriteria,
  type UiCategoryFilter
} from '@/modules/category/infraestructure'
import { getAllProducts } from '@/modules/product/application/get-all'
import { findByCriteria } from '@/modules/product/application/find-by-criterial'
import type { ProductRepository } from '@/modules/product/domain'
import type { Product } from '@/modules/product/domain/product'
import { Criteria } from '@/modules/shared'
import { useProductStore } from '@/stores/product'
import { onMounted, reactive, watch } from 'vue'

export function useFetchProducts(repository: ProductRepository) {
  const data = reactive({
    isLoading: false,
    error: false,
    products: [] as Product[]
  })

  const store = useProductStore()

  watch(store.activeFilters, async (change) => {
    if (!change) return
    if (!change.length) return

    await fetchFindByCriteria(change)
  })

  onMounted(() => {
    fetchProducts()
  })

  async function fetchFindByCriteria(uiChanges: UiCategoryFilter[]) {
    try {
      const criteriaParams = transformUICategoryToCriteria<Product>(uiChanges)
      data.isLoading = true
      const res = await findByCriteria(repository, criteriaParams)
      data.products = res
      data.error = false
    } catch (error) {
      data.error = true
    } finally {
      data.isLoading = false
    }
  }

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
