import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
import { ProductMock } from '@/modules/product/shared/product.mock'

describe('ProductCard', () => {
  it('renders properly', () => {
    const productMock = ProductMock
    const wrapper = shallowMount(ProductCard, {
      props: productMock,
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    expect(wrapper.text()).toContain(productMock.name)
    expect(wrapper.text()).toContain(productMock.price)
    expect(wrapper.text()).toContain(productMock.tag)
  })
})
