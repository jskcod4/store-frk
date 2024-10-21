import type { UiCategoryFilter } from '@/modules/category/infraestructure'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const activeFilters = ref<UiCategoryFilter[]>([])

  function addFilters(items: UiCategoryFilter[]) {
    for (const item of items) {
      activeFilters.value.push(item)
    }
  }

  function changeFilters() {}

  function clearFilters() {
    activeFilters.value = []
  }

  return { activeFilters, addFilters, changeFilters, clearFilters }
})
