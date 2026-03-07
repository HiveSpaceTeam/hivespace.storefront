<template>
  <div class="pb-16 bg-[#f5f5f5] dark:bg-surface-dark min-h-screen">
    <div class="h-4"></div> <!-- Top spacer -->
    
    <div class="container mx-auto">
      <HeroBanner />
      <CategoryBar />
      <FlashSale />
      
      <!-- Sticky Tabs for Product Sections -->
      <div class="mt-8 mb-4 sticky top-[130px] z-40 bg-white dark:bg-card-dark shadow-sm h-14 border-b-2 border-primary container mx-auto flex items-center justify-center">
        <h2 class="text-primary font-bold text-lg uppercase tracking-wider relative px-8 py-4 h-full flex items-center justify-center bg-white dark:bg-card-dark">
          Gợi Ý Hôm Nay
          <div class="absolute bottom-0 left-0 w-full h-[3px] bg-primary"></div>
        </h2>
      </div>

      <!-- Main Product Grid -->
      <ProductGrid :products="mockProducts" />
      
      <div class="mt-8 flex justify-center">
        <Button variant="outline" class="px-32 py-2.5 uppercase text-sm font-medium w-full sm:w-auto">
          Xem Thêm
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/home/HeroBanner.vue'
import CategoryBar from '@/components/home/CategoryBar.vue'
import FlashSale from '@/components/home/FlashSale.vue'
import ProductGrid from '@/components/home/ProductGrid.vue'
import type { ProductSummary } from '@/components/home/ProductCard.vue'
import { Button } from '@hivespace/shared'

// Mock Product Data
const mockProducts: ProductSummary[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `${i}`,
  name: `[CHÍNH HÃNG] Mẫu Sản phẩm Demo ${i + 1} - Thiết kế mới nhất năm nay, chất lượng cao, bền đẹp bảo hành 12 tháng`,
  price: Math.floor(Math.random() * 500000) + 50000,
  soldCount: Math.floor(Math.random() * 5000),
  image: `https://picsum.photos/400?random=${i + 100}`,
  discountPercentage: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 5 : undefined,
  rating: 4.5,
  isMall: Math.random() > 0.8,
  isPreferred: Math.random() > 0.6 && Math.random() <= 0.8,
  isFreeShipping: Math.random() > 0.5
}))
</script>
