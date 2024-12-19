<template>
  <div class="rating">
    <span
      v-for="index in 5"
      :key="index"
      :style="{ color: index <= normalizedValue + 0.5 ? '#e6910a' : '#c5c7c9' }"
      class="star"
    >
      {{ index <= normalizedValue ? '★' : '☆' }}
    </span>
    <span class="value">{{ displayValue }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    value: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    normalizedValue() {
      return Math.min(5, Math.max(0, this.value))
    },
    displayValue() {
      return Number(this.value).toFixed(1)
    },
  },
}
</script>

<style scoped>
.rating {
  line-height: 1.6;
}
.star {
  font-size: 1.25rem;
}
.value {
  position: relative;
  top: -2px;
  margin-left: 5px;
  font-size: 0.85rem;
}
</style>
