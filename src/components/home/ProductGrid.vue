<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
    <ProductCard 
      v-for="product in products" 
      :key="product.id" 
      :product="product" 
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductSummary } from '@/types';
import ProductCard from '@/components/home/ProductCard.vue'
defineProps<{
  products: ProductSummary[]
}>()
</script>
