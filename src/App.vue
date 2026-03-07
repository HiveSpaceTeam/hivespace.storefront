<template>
  <StorefrontLayout>
    <RouterView @navigate="handleNavigate" />
  </StorefrontLayout>
  <!-- Global modal outlet -->
  <ModalManager />
  <!-- Global toast notifications -->
  <ToastContainer :toasts="appStore.notifications" @removeToast="appStore.removeNotification" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ToastContainer, ModalManager, useAppStore } from '@hivespace/shared'
import StorefrontLayout from '@/components/layout/StorefrontLayout.vue'

const appStore = useAppStore()
const router = useRouter()

const handleNavigate = (path: string) => {
  router.push(path)
}
</script>
