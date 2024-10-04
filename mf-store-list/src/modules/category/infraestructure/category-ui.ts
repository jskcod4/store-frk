export interface UiCategoryFilter {
  id: string
  name: string
  options: {
    value: string
    label: string
    checked: boolean
  }[]
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
