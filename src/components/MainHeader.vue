<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HeartIcon from '@/components/icons/IconHeart.vue'
import UserIcon from '@/components/icons/IconUser.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive
    },
  },
}
</script>

<template>
  <header>
    <div class="wrapper">
      <a href="/" class="logo">
        <img alt="Netshoes" src="@/assets/logo.svg" width="160" height="25" />
      </a>

      <nav aria-label="Menu">
        <RouterLink to="/wishlist">
          <HeartIcon />
          <span>Wishlist</span>
        </RouterLink>
        <a href="javascript:" @click="toggle">
          <UserIcon />
          <nav :class="isActive ? 'show' : 'hide'" @mouseout="toggle" aria-label="Menu do usuário">
            <RouterLink to="/">Entrar</RouterLink>
            <RouterLink to="/">Minha conta</RouterLink>
            <RouterLink to="/">Endereços</RouterLink>
            <RouterLink to="/">Minha Netshoes</RouterLink>
          </nav>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  background: var(--ds-color-primary);
}

.wrapper {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px;
  max-width: var(--ds-breakpoint-xxl);
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

nav {
  position: relative;
  top: -5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

nav a span {
  display: none;
  margin: 0 5px;
}

@media (min-width: 992px) {
  .logo {
    position: relative;
    left: 0;
    transform: unset;
  }

  nav {
    width: auto;
    display: block;
  }

  nav a span {
    display: inline-block;
  }
}

nav a {
  position: relative;
  color: var(--ds-color-white);
  text-decoration: none;
  font-weight: 500;
  padding: 0 20px;
}

nav svg {
  position: relative;
  top: 8px;
  height: 28px;
  width: 28px;
}

nav nav {
  position: absolute;
  top: 40px;
  right: 8px;
  width: 150px;
  border-radius: 8px;
  box-shadow: 1px 1px 3px var(--ds-color-dark);
  background: var(--ds-color-white);
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s linear;
  z-index: 1;
}

nav nav.show {
  opacity: 1;
  pointer-events: all;
}

nav nav:after {
  content: '';
  display: block;
  position: absolute;
  right: 14px;
  top: -24px;
  width: 0;
  height: 0;
  border-bottom: 12px solid var(--ds-color-white);
  border-top: 12px solid transparent;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

nav nav a {
  display: block;
  color: var(--ds-color-dark);
  font-size: 1rem;
  font-weight: 400;
  line-height: 2;
  padding: 4px 16px;
  border-radius: 8px;
}

nav nav a:hover {
  background: var(--ds-color-soft);
  white-space: nowrap;
  color: var(--ds-color-primary);
}
</style>
