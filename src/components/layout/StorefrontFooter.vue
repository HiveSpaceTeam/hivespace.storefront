<template>
  <footer class="bg-card dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 pt-12 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Customer Service -->
        <div>
          <h3 class="text-sm font-bold uppercase mb-4 text-gray-800 dark:text-gray-200">Customer Service</h3>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><a href="#" class="hover:text-primary transition-colors">Help Centre</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">HiveSpace Blog</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Payment Methods</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">HiveSpace Coins</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Order Tracking</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Free Shipping</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Return & Refund</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <!-- About HiveSpace -->
        <div>
          <h3 class="text-sm font-bold uppercase mb-4 text-gray-800 dark:text-gray-200">About HiveSpace</h3>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li><a href="#" class="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">HiveSpace Policies</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Seller Centre</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Flash Sales</a></li>
          </ul>
        </div>

        <!-- Payment & Logistics -->
        <div>
          <h3 class="text-sm font-bold uppercase mb-4 text-gray-800 dark:text-gray-200">Payment</h3>
          <div class="flex flex-wrap gap-2 mb-6 text-gray-800 dark:text-gray-300">
            <div class="w-12 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm flex items-center justify-center p-1">Visa</div>
            <div class="w-12 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm flex items-center justify-center p-1">MC</div>
            <div class="w-12 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm flex items-center justify-center p-1">JCB</div>
            <div class="w-12 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm flex items-center justify-center p-1">COD</div>
          </div>
          
          <h3 class="text-sm font-bold uppercase mb-4 text-gray-800 dark:text-gray-200">Logistics</h3>
          <div class="flex flex-wrap gap-2 text-gray-800 dark:text-gray-300">
            <div class="w-16 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm flex items-center justify-center text-xs">Express</div>
            <div class="w-16 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm flex items-center justify-center text-xs">Standard</div>
          </div>
        </div>

        <!-- Follow Us & App Download -->
        <div>
          <h3 class="text-sm font-bold uppercase mb-4 text-gray-800 dark:text-gray-200">Follow Us</h3>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <li><a href="#" class="flex items-center hover:text-primary transition-colors"><Facebook class="w-4 h-4 mr-2" /> Facebook</a></li>
            <li><a href="#" class="flex items-center hover:text-primary transition-colors"><Instagram class="w-4 h-4 mr-2" /> Instagram</a></li>
            <li><a href="#" class="flex items-center hover:text-primary transition-colors"><Linkedin class="w-4 h-4 mr-2" /> LinkedIn</a></li>
          </ul>

          <h3 class="text-sm font-bold uppercase mb-4 text-gray-800 dark:text-gray-200">Download App</h3>
          <div class="flex items-center gap-2">
            <div class="p-2 border border-gray-200 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800">
              <QrCode class="w-16 h-16 text-gray-400 dark:text-gray-500" />
            </div>
            <div class="flex flex-col gap-2 text-gray-800 dark:text-gray-300">
              <div class="h-7 w-24 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded flex items-center justify-center text-[10px] whitespace-nowrap px-1">App Store</div>
              <div class="h-7 w-24 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded flex items-center justify-center text-[10px] whitespace-nowrap px-1">Google Play</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div class="mb-4 md:mb-0">
          © 2026 HiveSpace. All Rights Reserved.
        </div>
        <div class="flex items-center space-x-4">
          <span>Country & Region:</span>
          <a href="#" class="hover:text-primary transition-colors border-r border-gray-300 dark:border-gray-700 pr-4">Singapore</a>
          <a href="#" class="hover:text-primary transition-colors border-r border-gray-300 dark:border-gray-700 pr-4">Indonesia</a>
          <a href="#" class="hover:text-primary transition-colors border-r border-gray-300 dark:border-gray-700 pr-4">Thailand</a>
          <a href="#" class="hover:text-primary transition-colors border-r border-gray-300 dark:border-gray-700 pr-4">Malaysia</a>
          <a href="#" class="hover:text-primary transition-colors">Vietnam</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Instagram, Linkedin, QrCode } from 'lucide-vue-next'
</script>
