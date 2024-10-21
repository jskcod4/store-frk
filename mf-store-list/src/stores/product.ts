import type { UiCategoryFilter } from '@/modules/category/infraestructure'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const activeFilters = ref<UiCategoryFilter[]>([])

  function addFilters(items: UiCategoryFilter[]) {
    for (const item of items) {
      activeFilters.value.push(item)
    }
  }

  function changeFilters() {}

  return { activeFilters, addFilters, changeFilters }
})
