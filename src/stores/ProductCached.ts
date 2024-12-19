import { defineStore } from 'pinia'
import axios from 'axios'
import { baseApiUrl } from '@/const'

export interface IProduct {
  id: string
  code: string
  image: string
  name: string
  rating: number
  fullPriceInCents: string
  salePriceInCents: string
}

export const useProductCachedStore = defineStore('productCache', {
  state: () => ({
    products: [] as IProduct[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProduct(apiUrl: string) {
      if (this.products.length > 0) {
        return
      }

      this.isLoading = true
      this.error = null

      try {
        const { data } = await axios.get(`${baseApiUrl}${apiUrl}`)
        if (data.status === 200) {
          this.products = data.data
        }
      } catch (err) {
        console.error(err)
        this.error = 'Erro ao carregar produtos cacheados'
      } finally {
        this.isLoading = false
      }
    },
  },
})
