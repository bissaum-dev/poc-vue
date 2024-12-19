<script lang="ts">
import TitleBreadcrumb from '@/components/TitleBreadcrumb.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductCachedStore } from '@/stores/ProductCached'
import { useWishlistStore } from '@/stores/WishlistStore'

export default {
  components: {
    TitleBreadcrumb,
    ProductCard,
  },
  data() {
    return {
      links: [{ name: 'Home', link: '/' }],
      cached: useProductCachedStore(),
      wished: useWishlistStore(),
      wishedIds: [] as string[],
    }
  },
  mounted() {
    if (!this.cached.products.length) {
      ;(async () => await this.cached.fetchProduct('/product'))()
    }
    ;(async () => await this.wished.fetchWishlist('/wishlist'))()
    this.wishedIds = this.wished.wishlist.map((item) => item.productId)
  },
  methods: {
    addOrRemoveWish(isAdd: boolean, id: string) {
      if (isAdd) {
        ;(async () => await this.wished.addToWishlist('/wishlist', id))()
      } else {
        ;(async () => await this.wished.removeFromWishlist('/wishlist', id))()
      }
    },
  },
}
</script>

<template>
  <main>
    <div class="wrapper">
      <TitleBreadcrumb :items="links" />
      <div v-if="cached.isLoading" class="loading-list">
        <p>Carregando...</p>
      </div>
      <div class="product-list">
        <ProductCard
          v-for="product in cached.products"
          :product-id="product.id"
          :key="product.code"
          :image="product.image"
          :product="product.name"
          :rate="product.rating"
          :full-price="product.fullPriceInCents"
          :sale-price="product.salePriceInCents"
          :is-active="wishedIds.includes(product.id)"
          :on-toggle="(isActive: boolean) => addOrRemoveWish(isActive, product.id)"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  padding: 20px;
  min-width: var(--ds-breakpoint-sm);
  max-width: var(--ds-breakpoint-xxl);
}
</style>
