export interface Category {
  id: string
  name: string
  colors: string[]
  subcategories: string[]
  price: {
    min: number
    max: number
  }
  sizes: string[]
}
