<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<script lang="ts">
export default {
  props: {
    items: {
      type: Array as () => { name: string; link: string }[],
      required: true,
    },
  },
}
</script>

<template>
  <nav>
    <ul>
      <li v-for="item in items" :key="item.link">
        <RouterLink :to="item.link">{{ item.name }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  padding-bottom: 20px;
  border: 0;
}

@media (min-width: 992px) {
  nav {
    border-bottom: 1px solid var(--ds-color-gray);
  }
}

nav ul {
  padding: 0;
  display: flex;
  justify-content: flex-start;
}

nav li {
  list-style: none;
}

nav li:not(:last-child)::after {
  content: '/';
  padding: 0 5px;
}

nav a {
  text-decoration: none;
  font-size: 1rem;
  color: var(--ds-color-secondary);
}

nav a:hover {
  text-decoration: underline;
}

nav li:last-child a {
  font-weight: 700;
  pointer-events: none;
}
</style>
