<template>
  <div class="bg-white dark:bg-card-dark mt-4 shadow-sm relative group overflow-hidden">
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 uppercase">{{ $t('storefront.categories') }}</h2>
      </div>
      
      <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-y-6">
        <a href="#" v-for="(category, index) in categories" :key="index" class="flex flex-col items-center group cursor-pointer border-r border-b border-gray-100 dark:border-gray-800 py-4 hover:shadow-md transition-shadow">
          <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2 group-hover:-translate-y-1 transition-transform">
            <component :is="category.icon" class="w-8 h-8 text-primary" />
          </div>
          <span class="text-xs text-center text-gray-700 dark:text-gray-300 leading-tight px-1">{{ category.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Shirt, 
  Smartphone, 
  Monitor, 
  Camera, 
  Watch, 
  Briefcase, 
  Bike, 
  Coffee,
  Heart,
  Home
} from 'lucide-vue-next'

const categories = [
  { name: 'Men Clothes', icon: Shirt },
  { name: 'Mobile & Gadgets', icon: Smartphone },
  { name: 'Computers', icon: Monitor },
  { name: 'Cameras', icon: Camera },
  { name: 'Watches', icon: Watch },
  { name: 'Bags', icon: Briefcase },
  { name: 'Sports', icon: Bike },
  { name: 'Groceries', icon: Coffee },
  { name: 'Health', icon: Heart },
  { name: 'Home & Living', icon: Home },
  { name: 'Women Clothes', icon: Shirt },
  { name: 'Gaming', icon: Monitor },
  { name: 'Accessories', icon: Watch },
  { name: 'Toys', icon: Heart },
  { name: 'Stationery', icon: Briefcase },
  { name: 'Pets', icon: Home },
  { name: 'Automotive', icon: Bike },
  { name: 'Books', icon: Coffee },
  { name: 'Tickets', icon: Smartphone },
  { name: 'Services', icon: Camera },
]
</script>
