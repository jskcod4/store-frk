import type { Category } from './category'

export const TEST = 'TESTING'

export const CategoryMock: Category = {
  id: '1',
  name: 'ELECTRONIC',
  colors: ['NAVY BLUE', 'BLACK', 'WHITE'],
  subcategories: ['SMARTPHONE', 'TABLETS', 'LAPTOPS'],
  prices: ['$0 - $25', '$25 - $50', '$50 - $100', '$100 - $200', '$200+'],
  sizes: ['S', 'M', 'L']
}
