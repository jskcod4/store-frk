import { getAllCategories } from '@/modules/category/application/get-detail/get-detail.category'
import type { Category } from '@/modules/category/domain/category'
import type { CategoryRepository } from '@/modules/category/domain/category.repository'

import {
  transformCategoryColorToFilterOptions,
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

  onMounted(() => {
    fetchCategoryDetail()
  })

  watch(
    filters,
    (change) => {
      store.addFilters(change)
    },
    { deep: true }
  )

  watch(data, ({ category }) => {
    if (!category) return
    if (!Object.keys(category).length) return

    if (category.subcategories.length > 0) {
      subCategories.value = transformCategoryToSubCategory(category.subcategories)
    }

    if (category.colors.length > 0) {
      filters.value.push({
        id: 'color',
        name: 'Color',
        options: transformCategoryColorToFilterOptions(category.colors)
      })
    }

    if (category.sizes.length > 0) {
      filters.value.push({
        id: 'size',
        name: 'Size',
        options: transformCategorySizeToFilterOptions(category.sizes)
      })
    }

    if (category.price) {
      filters.value.push({
        id: 'price',
        name: 'Price',
        options: [
          { value: '0-25', label: '$0 - $25', checked: false },
          { value: '25-50', label: '$25 - $50', checked: false },
          { value: '50-100', label: '$50 - $100', checked: false },
          { value: '100-200', label: '$100 - $200', checked: false },
          { value: '200+', label: '$200+', checked: false }
        ]
      })
    }
  })

  return { data, fetchCategoryDetail, filters, subCategories }
}
