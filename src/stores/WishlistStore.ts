import axios from 'axios'
import { defineStore } from 'pinia'
import { baseApiUrl } from '@/const'
import { useProductCachedStore, type IProduct } from './ProductCached'

export interface IWishlist {
  id: string
  productId: string
}

export interface IWishlistProduct extends IProduct {
  wishedId?: string
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlist: [] as IWishlist[],
    products: [] as IWishlistProduct[],
    productStore: useProductCachedStore(),
  }),
  actions: {
    async fetchWishlist(endpoint: string) {
      const { data } = await axios.get(`${baseApiUrl}${endpoint}`)
      if (data.status === 200) {
        this.wishlist = data.data as IWishlist[]
        this.products = this.productStore.products
          .filter((item: IProduct) =>
            this.wishlist.some((wish: IWishlist) => wish.productId === item.id),
          )
          .map((item) => {
            const matchedProduct = this.wishlist.find(
              (wish: IWishlist) => wish.productId === item.id,
            )
            return { ...item, wishedId: matchedProduct?.id }
          })
      }
    },

    async addToWishlist(endpoint: string, id: string) {
      const { data } = await axios.post(`${baseApiUrl}${endpoint}/${id}`)
      if (data.status === 201) {
        this.wishlist.push(data)
      }
    },

    async removeFromWishlist(endpoint: string, id: string) {
      const { data } = await axios.delete(`${baseApiUrl}${endpoint}/${id}`)
      if (data.status === 200) {
        this.wishlist = this.wishlist.filter((item) => item.id !== id)
      }
    },
  },
})
