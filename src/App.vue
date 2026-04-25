<template>
  <StorefrontLayout v-if="showDefaultLayout">
    <RouterView @navigate="handleNavigate" />
  </StorefrontLayout>
  <RouterView v-else @navigate="handleNavigate" />
  <!-- Global modal outlet -->
  <ModalManager />
  <!-- Global toast notifications -->
  <ToastContainer :toasts="appToasts" @removeToast="appStore.removeNotification" />
  <!-- In-app notification preview toasts -->
  <NotificationPreviewToast :toasts="toastQueue" @dismiss="notificationStore.dismissToast" @click="handleToastClick" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ToastContainer,
  ModalManager,
  useAppStore,
  useAuth,
  useNotificationHub,
  NotificationPreviewToast,
  type InAppNotification,
} from '@hivespace/shared'
import StorefrontLayout from '@/components/layout/StorefrontLayout.vue'
import { useNotificationStore } from '@/stores'
import { config } from '@/config'

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()

const notificationStore = useNotificationStore()
const appToasts = computed(() => appStore.notifications.value)
const toastQueue = computed<InAppNotification[]>(() => notificationStore.toastQueue)
const { currentUser, getCurrentUser } = useAuth()
const isHubConnected = ref(false)

const showDefaultLayout = computed(() => route.meta?.layout !== 'none')

const handleNavigate = (path: string) => {
  router.push(path)
}

const { connect, disconnect } = useNotificationHub(
  config.api.baseUrl,
  (event) => notificationStore.prependFromHub(event),
)

const connectHub = async () => {
  if (isHubConnected.value) return
  await connect()
  isHubConnected.value = true
}

const disconnectHub = async () => {
  if (!isHubConnected.value) return
  await disconnect()
  isHubConnected.value = false
}

const handleToastClick = (id: string) => {
  const notification = toastQueue.value.find((n) => n.id === id)
  void notificationStore.markAsRead(id).catch((error) => {
    console.error('Failed to mark notification as read:', error)
  })
  notificationStore.dismissToast(id)
  router.push(notification?.link ?? '/')
}

onMounted(() => {
  // Hydrate auth state once; watcher below handles connection lifecycle.
  void getCurrentUser()
})

watch(() => currentUser.value?.access_token, async (token, prevToken) => {
  if (token) {
    if (prevToken && prevToken !== token) {
      await disconnectHub()
    }
    await connectHub()
    await notificationStore.fetchUnreadCount()
  } else if (prevToken) {
    await disconnectHub()
  }
}, { immediate: true })

onUnmounted(async () => {
  await disconnectHub()
})
</script>
