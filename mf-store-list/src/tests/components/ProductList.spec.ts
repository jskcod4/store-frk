import { describe, it, expect, vi } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import ProductList from '@/components/ProductList.vue'
import { useFetchProducts } from '@/hooks/fetch-products.hooks'
import { LocalStorageProductRepository } from '@/config'
import { ProductsMock } from '@/modules/product/shared/product.mock'
import { createTestingPinia } from '@pinia/testing'

describe('ProductList', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(ProductList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn()
          })
        ]
      }
    })
    expect(wrapper.get('.product-list').isVisible()).toBe(true)
  })

  it('data is empty', () => {
    const wrapper = shallowMount(ProductList)
    expect((wrapper.vm as any).data.products).toEqual([])
    expect((wrapper.vm as any).data.isLoading).toEqual(true)
    expect((wrapper.vm as any).data.error).toEqual(false)
  })

  it('initial state make empty', () => {
    const fakeRepository = LocalStorageProductRepository
    const { data } = useFetchProducts(fakeRepository)

    expect(data.products).toEqual([])
    expect(data.isLoading).toEqual(false)
    expect(data.error).toEqual(false)
  })

  it('fetch products', async () => {
    const fakeRepository = LocalStorageProductRepository

    fakeRepository.saveProducts(ProductsMock)

    const { data, fetchProducts } = useFetchProducts(fakeRepository)

    await fetchProducts()

    expect(data.products.length).toBeGreaterThan(0)
    expect(data.isLoading).toEqual(false)
    expect(data.error).toEqual(false)
  })

  it('fetch products error', async () => {
    const fakeRepository = LocalStorageProductRepository

    fakeRepository.saveProducts(ProductsMock)

    const { data, fetchProducts } = useFetchProducts(fakeRepository)

    fakeRepository.getProducts = () => {
      throw new Error('Error')
    }

    await fetchProducts()

    expect(data.products.length).toEqual(0)
    expect(data.isLoading).toEqual(false)
    expect(data.error).toEqual(true)
  })

  it('fetch products with success set isLoading as false', async () => {
    const fakeRepository = LocalStorageProductRepository

    fakeRepository.saveProducts(ProductsMock)

    const { data, fetchProducts } = useFetchProducts(fakeRepository)

    await fetchProducts()

    expect(data.isLoading).toEqual(false)
  })
})
