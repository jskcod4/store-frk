import { getAllCategories } from '@/modules/category/application/get-detail/get-detail.category'
import type { Category } from '@/modules/category/domain/category'
import type { CategoryRepository } from '@/modules/category/domain/category.repository'

import {
  transformCategoryColorToFilterOptions,
  transformCategoryPriceToFilterOptions,
  transformCategorySizeToFilterOptions,
  transformCategoryToSubCategory,
  type UiCategoryFilter
} from '@/modules/category/infraestructure'
import { useProductStore } from '@/stores/product'

import { onMounted, reactive, ref, watch } from 'vue'

export function useFetchCategories(repository: CategoryRepository) {
  const data = reactive({
    isLoading: false,
    error: false,
    category: {} as Category
  })

  const filters = ref<UiCategoryFilter[]>([])

  const subCategories = ref<{ name: string; href: string }[]>([])

  const store = useProductStore()

  async function fetchCategoryDetail() {
    try {
      data.isLoading = true
      const res = await getAllCategories(repository)
      data.category = res
      data.error = false
    } catch (error) {
      data.error = true
    } finally {
      data.isLoading = false
    }
  }

  function applyFilters(evt: Event) {
    evt.preventDefault()
    store.addFilters(filters.value)
    store.changeFilters()
  }

  onMounted(() => {
    fetchCategoryDetail()
  })

  watch(data, ({ category }) => {
    if (!category) return
    if (!Object.keys(category).length) return

    if (category.subcategories.length > 0) {
      subCategories.value = transformCategoryToSubCategory(category.subcategories)
    }

    const localFilters: UiCategoryFilter[] = []

    if (category.colors.length > 0) {
      localFilters.push({
        id: 'colors',
        name: 'Color',
        options: transformCategoryColorToFilterOptions(category.colors)
      })
    }

    if (category.sizes.length > 0) {
      localFilters.push({
        id: 'sizes',
        name: 'Talla',
        options: transformCategorySizeToFilterOptions(category.sizes)
      })
    }

    if (category.prices.length > 0) {
      localFilters.push({
        id: 'prices',
        name: 'Precio',
        options: transformCategoryPriceToFilterOptions(category.prices)
      })
    }

    filters.value = localFilters
  })

  return { data, fetchCategoryDetail, filters, subCategories, applyFilters }
}
