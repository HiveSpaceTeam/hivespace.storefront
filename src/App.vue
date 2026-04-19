<template>
  <StorefrontLayout v-if="showDefaultLayout">
    <RouterView @navigate="handleNavigate" />
  </StorefrontLayout>
  <RouterView v-else @navigate="handleNavigate" />
  <!-- Global modal outlet -->
  <ModalManager />
  <!-- Global toast notifications -->
  <ToastContainer :toasts="appStore.notifications" @removeToast="appStore.removeNotification" />
  <!-- In-app notification preview toasts -->
  <NotificationPreviewToast :toasts="toastQueue" @dismiss="notificationStore.dismissToast" @click="handleToastClick" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ToastContainer,
  ModalManager,
  useAppStore,
  useAuth,
  useNotificationHub,
  NotificationPreviewToast,
} from '@hivespace/shared'
import StorefrontLayout from '@/components/layout/StorefrontLayout.vue'
import { useNotificationStore } from '@/stores/notification'
import { config } from '@/config'

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()

const notificationStore = useNotificationStore()
const toastQueue = computed(() => notificationStore.toastQueue)
const { currentUser, getCurrentUser } = useAuth()

const showDefaultLayout = computed(() => route.meta?.layout !== 'none')

const handleNavigate = (path: string) => {
  router.push(path)
}

const { connect, disconnect } = useNotificationHub(
  config.api.baseUrl,
  (event) => notificationStore.prependFromHub(event),
)

const handleToastClick = (id: string) => {
  const notification = toastQueue.value.find((n) => n.id === id)
  notificationStore.markAsRead(id)
  notificationStore.dismissToast(id)
  router.push(notification?.link ?? '/')
}

onMounted(async () => {
  const user = await getCurrentUser()
  if (user) {
    await connect()
    await notificationStore.fetchUnreadCount()
  }
})

watch(() => currentUser.value, async (user, prevUser) => {
  const tokenChanged = user?.access_token !== prevUser?.access_token
  if (user && tokenChanged) {
    await connect()
    await notificationStore.fetchUnreadCount()
  } else if (!user && prevUser) {
    await disconnect()
  }
})

onUnmounted(async () => {
  await disconnect()
})
</script>
