import { ProductMock, ProductsMock } from '@/modules/product/shared/product.mock'
import { useShoppingCartStore } from '@/stores/shopping-cart'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('ShoppingCart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Add to shopping cart', () => {
    const store = useShoppingCartStore()
    expect(store.products).toHaveLength(0)

    const { id, name, price } = ProductMock

    store.addToCart({ id, name, price })
    expect(store.products).toHaveLength(1)
  })

  it('Adding repeat product must be add quatity', () => {
    const store = useShoppingCartStore()
    const QUATITY_TO_ADD = 5
    expect(store.products).toHaveLength(0)

    const { id, name, price } = ProductMock

    for (let i = 0; i < QUATITY_TO_ADD; i++) {
      store.addToCart({ id, name, price })
    }

    expect(store.products).toHaveLength(1)

    store.products.forEach((product) => {
      expect(product.quantity).toBe(QUATITY_TO_ADD)
    })
  })

  it('Adding different products must be add to array products', () => {
    const store = useShoppingCartStore()
    expect(store.products).toHaveLength(0)

    const products = ProductsMock

    products.forEach((product) => {
      store.addToCart(product)
    })

    expect(store.products).toHaveLength(products.length)
  })

  it('Remove from shopping cart', () => {
    const store = useShoppingCartStore()

    const { id, name, price } = ProductMock

    store.addToCart({ id, name, price })
    store.removeFromCart(id)

    expect(store.products).toHaveLength(0)
  })

  it('Remove repeated item must be decrement products array and must be cero', () => {
    const store = useShoppingCartStore()
    const QUATITY_TO_ADD = 5
    expect(store.products).toHaveLength(0)

    const { id, name, price } = ProductMock

    for (let i = 0; i < QUATITY_TO_ADD; i++) {
      store.addToCart({ id, name, price })
    }

    for (let i = 0; i < QUATITY_TO_ADD; i++) {
      store.removeFromCart(id)
    }

    expect(store.products).toHaveLength(0)
  })

  it('Remove repeat item must be decrement product quatity', () => {
    const store = useShoppingCartStore()
    const products = ProductsMock

    products.forEach((product) => {
      store.addToCart(product)
    })

    for (let i = 0; i < products.length - 1; i++) {
      store.removeFromCart(products[i].id)
    }

    expect(store.products).toHaveLength(1)
  })
})
