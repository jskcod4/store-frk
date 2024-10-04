import type { Category } from './category'

export const TEST = 'TESTING'

export const CategoryMock: Category = {
  id: '1',
  name: 'ELECTRONIC',
  colors: ['NAVY BLUE', 'BLACK', 'WHITE'],
  subcategories: ['SMARTPHONE', 'TABLETS', 'LAPTOPS'],
  price: {
    min: 100,
    max: 200
  },
  sizes: ['S', 'M', 'L']
}
