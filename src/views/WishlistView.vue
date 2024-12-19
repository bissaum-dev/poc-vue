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
      links: [
        { name: 'Home', link: '/' },
        { name: 'Wishlist', link: '/wishlist' },
      ],
      productStore: useProductCachedStore(),
      wishlist: useWishlistStore(),
    }
  },
  mounted() {
    if (!this.productStore.products.length) {
      ;(async () => await this.productStore.fetchProduct('/product'))()
    }
    ;(async () => await this.wishlist.fetchWishlist('/wishlist'))()
  },
  methods: {
    removeWish(id: string) {
      ;(async () => await this.wishlist.removeFromWishlist('/wishlist', id))()
    },
  },
}
</script>

<template>
  <main>
    <div class="wrapper">
      <TitleBreadcrumb :items="links" />
      <div v-if="wishlist.products.length" class="product-list">
        <ProductCard
          v-for="product in wishlist.products"
          data-cy="product-card"
          :product-id="product.id"
          :key="product.code"
          :image="product.image"
          :product="product.name"
          :rate="product.rating"
          :full-price="product.fullPriceInCents"
          :sale-price="product.salePriceInCents"
          :on-remove="() => removeWish(product.wishedId ?? '')"
          :is-favorite="true"
        />
      </div>
      <div v-if="!wishlist.products.length" class="empty-list">
        <p>Nenhum produto foi adicionado na lista de desejos</p>
        <RouterLink to="/">Ver produtos</RouterLink>
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
