/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductCachedStore } from '../ProductCached'
import { baseApiUrl } from '../../const'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('useProductCachedStore', () => {
  let store: any

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useProductCachedStore()
  })

  it('should initialize with the correct default state', () => {
    expect(store.products).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should fetch products and update the state on success', async () => {
    const mockProducts = [
      {
        id: '1',
        code: 'prod1',
        image: 'image1.jpg',
        name: 'Product 1',
        rating: 5,
        fullPriceInCents: '1000',
        salePriceInCents: '800',
      },
    ]

    axios.get.mockResolvedValueOnce({
      data: {
        status: 200,
        data: mockProducts,
      },
    })

    await store.fetchProduct('/products')

    expect(axios.get).toHaveBeenCalledWith(`${baseApiUrl}/products`)
    expect(store.products).toEqual(mockProducts)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should handle errors and update the state on failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'))

    await store.fetchProduct('/products')

    expect(store.products).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('Erro ao carregar produtos cacheados')
  })

  it('should not fetch products if they are already cached', async () => {
    store.products = [
      {
        id: '1',
        code: 'prod1',
        image: 'image1.jpg',
        name: 'Product 1',
        rating: 5,
        fullPriceInCents: '1000',
        salePriceInCents: '800',
      },
    ]

    await store.fetchProduct('/products')
    expect(store.products.length).toBe(1)
  })
})
