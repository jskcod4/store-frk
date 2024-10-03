import type { Product } from '../domain/product'

export const ProductMock: Product = {
  id: '1',
  name: 'Product 1',
  price: 1000,
  description: 'Description of product 1',
  imageUrl: 'https://via.placeholder.com/150',
  stock: 10,
  category: 'Category 1'
}

export const ProductsMock: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 1000,
    description: 'Description of product 1',
    imageUrl: 'https://via.placeholder.com/150',
    stock: 10,
    category: 'Category 1'
  },
  {
    id: '2',
    name: 'Product 2',
    price: 2000,
    description: 'Description of product 2',
    imageUrl: 'https://via.placeholder.com/150',
    stock: 20,
    category: 'Category 2'
  },
  {
    id: '3',
    name: 'Product 3',
    price: 3000,
    description: 'Description of product 3',
    imageUrl: 'https://via.placeholder.com/150',
    stock: 30,
    category: 'Category 3'
  }
]
