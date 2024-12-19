<script setup lang="ts">
import HeartIcon from '@/components/icons/IconHeart.vue'
import CloseIcon from '@/components/icons/IconClose.vue'
import ProductRating from '@/components/ProductRating.vue'
</script>

<script lang="ts">
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    product: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    fullPrice: {
      type: String,
      default: '0',
    },
    salePrice: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive
    },
    currency(value: number) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
}
</script>

<template>
  <div class="card">
    <p v-if="!isFavorite" class="action favorite">
      <a :class="isActive ? 'active' : 'idle'" href="javascript:" @click="toggle">
        <HeartIcon />
      </a>
    </p>
    <p v-if="isFavorite" class="action remove">
      <a href="javascript:" @click="toggle">
        <CloseIcon />
      </a>
    </p>
    <div class="product">
      <img :src="image" alt="Produto" />
    </div>
    <div class="offer">
      <h3 aria-label="Nome do Produto" class="title-product" :title="product">{{ product }}</h3>
      <ProductRating :value="rate" />
      <data aria-label="Preço" class="full-price" :value="fullPrice" currency="BRL">
        <s>{{ currency(Number(fullPrice) / 100) }}</s>
      </data>
      <data aria-label="Preço com desconto" class="sale-price" :value="salePrice" currency="BRL">
        <b>{{ currency(Number(salePrice) / 100) }}</b>
      </data>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  padding: 6px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 1px 1px 4px var(--ds-color-gray);
  background: var(--ds-color-white);
  transition: box-shadow 0.2s linear;
  cursor: pointer;
}
@media (min-width: 576px) {
  .card {
    width: 46%;
  }
}
@media (min-width: 768px) {
  .card {
    width: 46%;
  }
}
@media (min-width: 992px) {
  .card {
    width: 31%;
  }
}
@media (min-width: 1200px) {
  .card {
    width: 22.8%;
  }
}
@media (min-width: 1400px) {
  .card {
    width: 18%;
  }
}
.card:hover {
  box-shadow: 2px 2px 8px var(--ds-color-dark);
}
.card .action a {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 2px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  transition: background 0.2s linear;
}
.card .action svg {
  width: 24px;
  height: 24px;
}
.card .favorite a {
  background: var(--ds-color-gray);
}
.card .favorite a:hover {
  background: var(--ds-color-dark);
}
.card .favorite a.active {
  background: var(--ds-color-heart);
}
.card .remove a {
  background: var(--ds-color-white);
}
.card .remove a:hover {
  background: var(--ds-color-gray);
}
.card .product img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  border-radius: 16px;
}
.card .offer {
  padding: 10px;
  height: 130px;
}
.card .title-product {
  line-height: 1.2;
  font-size: 1rem;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card .full-price {
  display: block;
  line-height: 1.5;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--ds-color-gray);
}
.card .sale-price b {
  display: block;
  line-height: 1.2;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ds-color-secondary);
}
</style>
