import { Criteria } from '@/modules/shared'

export interface UiCategoryFilter {
  id: string
  name: string
  options: {
    value: string
    label: string
    checked: boolean
  }[]
}

export function transformUICategoryToCriteria<T>(items: UiCategoryFilter[]) {
  const criteria = new Criteria<T>()

  for (const item of items) {
    const activeOptions = item.options.filter((option) => option.checked)
    criteria.where(item.id, 'EQUAL', activeOptions)
  }

  return criteria
}

export function transformCategoryToSubCategory(subcategories: string[]) {
  return subcategories.map((subcategory) => ({
    name: subcategory,
    href: subcategory
  }))
}

export function transformCategoryColorToFilterOptions(colors: string[]) {
  return colors.map((color) => ({
    value: color,
    label: color,
    checked: false
  }))
}

export function transformCategorySizeToFilterOptions(sizes: string[]) {
  return sizes.map((size) => ({
    value: size,
    label: size,
    checked: false
  }))
}

export function transformCategoryPriceToFilterOptions(prices: string[]) {
  return prices.map((price) => ({
    value: price,
    label: price,
    checked: false
  }))
}
