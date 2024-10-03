import { ProductMock } from '@/modules/product/shared/product.mock'
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
    expect(store.products).toHaveLength(0)

    const { id, name, price } = ProductMock

    store.addToCart({ id, name, price })
    store.addToCart({ id, name, price })
    expect(store.products).toHaveLength(1)
  })

  it('Remove from shopping cart', () => {
    const store = useShoppingCartStore()

    const { id, name, price } = ProductMock

    store.addToCart({ id, name, price })
    store.removeFromCart(id)

    expect(store.products).toHaveLength(0)
  })
})
