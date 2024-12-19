/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useWishlistStore } from '../WishlistStore'
import '../ProductCached'

vi.mock('axios')

vi.mock('../ProductCached', () => ({
  useProductCachedStore: vi.fn(() => ({
    products: [
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
    ],
  })),
}))

describe('Wishlist Store', () => {
  let wishlistStore: any

  beforeEach(() => {
    setActivePinia(createPinia())
    wishlistStore = useWishlistStore()
  })

  it('fetches wishlist and maps products correctly', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        status: 200,
        data: [
          { id: '1', productId: '1' },
          { id: '2', productId: '2' },
        ],
      },
    })

    await wishlistStore.fetchWishlist('/wishlist')

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/wishlist'))
    expect(wishlistStore.wishlist).toEqual([
      { id: '1', productId: '1' },
      { id: '2', productId: '2' },
    ])
    expect(wishlistStore.products).toEqual([
      { id: '1', name: 'Product 1', wishedId: '1' },
      { id: '2', name: 'Product 2', wishedId: '2' },
    ])
  })

  it('adds item to wishlist correctly', async () => {
    axios.post.mockResolvedValueOnce({
      data: { id: '3', productId: '3' },
    })

    await wishlistStore.addToWishlist('/wishlist', '3')

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/wishlist/3'))
  })

  it('removes item from wishlist correctly', async () => {
    wishlistStore.wishlist = [
      { id: '1', productId: '1' },
      { id: '2', productId: '2' },
    ]

    axios.delete.mockResolvedValueOnce({
      data: { status: 200 },
    })

    await wishlistStore.removeFromWishlist('/wishlist', '1')
    expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/wishlist/1'))
    expect(wishlistStore.wishlist).not.toContainEqual({ id: '1', productId: '1' })
  })
})
