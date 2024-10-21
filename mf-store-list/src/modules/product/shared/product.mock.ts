import { ProductTag, type Product } from '../domain/product'

export const ProductMock: Product = {
  id: '1',
  name: 'Product 1',
  price: 1000,
  description: 'Description of product 1',
  imageUrl: 'https://via.placeholder.com/150',
  stock: 10,
  category: 'Category 1',
  tag: ProductTag.NEW
}

export const ProductsMock: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 1000,
    description: 'Description of product 1',
    imageUrl: 'https://via.placeholder.com/150',
    stock: 10,
    tag: ProductTag.NEW,
    category: 'Category 1'
  },
  {
    id: '2',
    name: 'Product 2',
    price: 1000,
    description: 'Description of product 1',
    imageUrl: 'https://via.placeholder.com/150',
    stock: 10,
    tag: ProductTag.NEW,
    category: 'Category 1'
  }
]
