<template>
  <StorefrontLayout v-if="showDefaultLayout">
    <RouterView @navigate="handleNavigate" />
  </StorefrontLayout>
  <RouterView v-else @navigate="handleNavigate" />
  <!-- Global modal outlet -->
  <ModalManager />
  <!-- Global toast notifications -->
  <ToastContainer :toasts="appStore.notifications" @removeToast="appStore.removeNotification" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ToastContainer, ModalManager, useAppStore } from '@hivespace/shared'
import StorefrontLayout from '@/components/layout/StorefrontLayout.vue'

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()

const showDefaultLayout = computed(() => route.meta?.layout !== 'none')

const handleNavigate = (path: string) => {
  router.push(path)
}
</script>
