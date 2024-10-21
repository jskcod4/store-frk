export interface Product {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
  stock: number
  category: string
  tag: ProductTag
}

export enum ProductTag {
  NEW = 'NUEVO',
  SALE = 'PROMOCIÓN',
  HOT = 'MEJOR VENDIDO'
}
