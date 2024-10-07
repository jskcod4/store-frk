import { DefaultCategoryRepository } from '@/config'
import { useFetchCategories } from '@/hooks/fetch-categories.hooks'
import { CategoryMock } from '@/modules/category/domain'
import CategoryTemplate from '@/templates/CategoryTemplate.vue'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

describe('CategoryTemplate.vue', () => {
  it('Render', () => {
    const wrapper = shallowMount(CategoryTemplate, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    expect(wrapper.get('#category-template').isVisible()).toBe(true)
  })

  it('initial state make empty', () => {
    const fakeRepository = DefaultCategoryRepository
    const { data } = useFetchCategories(fakeRepository)

    expect(data.category).toEqual({})
    expect(data.isLoading).toEqual(false)
    expect(data.error).toEqual(false)
  })

  it('fetch category', async () => {
    const fakeRepository = DefaultCategoryRepository

    fakeRepository.saveCategoryDetail(CategoryMock)

    const { data, fetchCategoryDetail } = useFetchCategories(fakeRepository)

    await fetchCategoryDetail()

    expect(data.category).toEqual(CategoryMock)
    expect(data.isLoading).toEqual(false)
    expect(data.error).toEqual(false)
  })

  it('fetch products error', async () => {
    const fakeRepository = DefaultCategoryRepository

    fakeRepository.saveCategoryDetail(CategoryMock)

    const { data, fetchCategoryDetail } = useFetchCategories(fakeRepository)

    fakeRepository.getCategoryDetail = () => {
      throw new Error('Error')
    }

    await fetchCategoryDetail()

    expect(data.category).toEqual({})
    expect(data.isLoading).toEqual(false)
    expect(data.error).toEqual(true)
  })

  it('fetch category with set is loading as false', async () => {
    const fakeRepository = DefaultCategoryRepository

    fakeRepository.saveCategoryDetail(CategoryMock)

    const { data, fetchCategoryDetail } = useFetchCategories(fakeRepository)

    await fetchCategoryDetail()

    expect(data.isLoading).toEqual(false)
  })
})
