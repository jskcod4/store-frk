import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ProductList from '@/components/ProductList.vue'

describe('ProductList', () => {
  it('renders properly', () => {
    const wrapper = mount(ProductList)
    expect(wrapper.get('.product-list').isVisible()).toBe(true)
  })
})
