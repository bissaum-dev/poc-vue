<script lang="ts">
import TitleBreadcrumb from '@/components/TitleBreadcrumb.vue'
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: {
    TitleBreadcrumb,
    ProductCard,
  },
  data() {
    return {
      links: [{ name: 'Home', link: '/' }],
      products: [] as {
        code: string
      }[],
    }
  },
  mounted() {
    fetch('https://poc-node-production.up.railway.app/product')
      .then((response) => response.json())
      .then((data) => {
        this.products = data
      })
      .catch((error) => {
        console.error('Erro ao buscar os itens:', error)
      })
  },
}
</script>

<template>
  <main>
    <div class="wrapper">
      <TitleBreadcrumb :items="links" />
      <div class="product-list">
        <ProductCard
          v-for="product in products"
          :key="product.code"
          image="https://static.netshoes.com.br/produtos/tenis-nike-revolution-7-feminino/26/JD8-6363-026/JD8-6363-026_zoom1.jpg?ts=1708096757?ims=544x"
          product="Tênis Nike Revolution 7 Feminino - Preto+Branco"
          :rate="3.5"
          full-price="39999"
          sale-price="30399"
        />
        <ProductCard
          image="https://static.netshoes.com.br/produtos/bola-de-futebol-society-penalty-8-x/78/D23-5694-078/D23-5694-078_zoom1.jpg?ts=1695700132?ims=544x"
          product="Bola de Futebol Society Penalty 8 X - Branco+Verde Limão"
          :rate="3"
          full-price="22000"
          sale-price="17499"
        />
        <ProductCard
          image="https://static.netshoes.com.br/produtos/kit-4-camiseta-masculina-segunda-pele-protecao-solar-uv-termica-praia-manga-longa-blusa-camisa/40/3R2-0087-240/3R2-0087-240_zoom1.jpg?ts=1690411979?ims=544x"
          product="Kit 4 Camiseta Masculina Segunda Pele Proteção Solar UV Térmica Praia Manga Longa Blusa Camisa - Cinza+Azul"
          :rate="4.5"
          full-price="20000"
          sale-price="8690"
        />
        <ProductCard
          image="https://static.netshoes.com.br/produtos/mesa-de-ping-pong-tenis-de-mesa-klopf-12-mm/08/140-1040-008/140-1040-008_zoom1.jpg?ts=1712923154?ims=544x"
          product="Mesa de Ping Pong / Tênis de Mesa Klopf - 12 mm - Azul"
          :rate="3"
          full-price="119900"
          sale-price="98990"
        />
        <ProductCard
          image="https://static.netshoes.com.br/produtos/chuteira-society-adidas-deportivo-ii-unissex-exclusiva/70/FB9-4074-070/FB9-4074-070_zoom1.jpg?ts=1710336224?ims=544x"
          product="Chuteira Society Adidas Deportivo II Unissex - Exclusiva - Preto"
          :rate="5"
          full-price="44999"
          sale-price="18999"
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
