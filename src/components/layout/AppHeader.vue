<template>
  <SharedAppHeader
    :show-sidebar-toggle="showSidebarToggle"
    :user="user"
    :menu-items="menuItems"
    header-class="bg-surface dark:bg-surface-dark"
    container-class="container mx-auto"
    @toggle-sidebar="handleToggle"
    @theme-changed="handleThemeChange"
    @language-changed="handleCultureChange"
    @sign-out="logout"
  >
    <template #bottom>
      <slot name="bottom" />
    </template>
  </SharedAppHeader>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  AppHeader as SharedAppHeader,
  useAuth,
  type MenuItem,
  stringToNumericTheme,
  stringToNumericCulture,
} from '@hivespace/shared'

import { UserCircle, Settings as SettingsIcon, LifeBuoy as SupportIcon } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'

interface Props {
  showSidebarToggle?: boolean
}

const { getCurrentUser, logout } = useAuth()
withDefaults(defineProps<Props>(), {
  showSidebarToggle: true,
})
const userStore = useUserStore()
const user = ref()

const menuItems: MenuItem[] = [
  { href: '/profile', icon: UserCircle, textKey: 'common.profile.editProfile' },
  { href: '/chat', icon: SettingsIcon, textKey: 'common.profile.accountSettings' },
  { href: '/profile', icon: SupportIcon, textKey: 'common.profile.support' },
]

const isMobileOpen = ref(false)

const handleToggle = () => {
  isMobileOpen.value = !isMobileOpen.value
}

const handleThemeChange = async (theme: string) => {
  await userStore.updateTheme(stringToNumericTheme(theme))
}

const handleCultureChange = async (culture: string) => {
  await userStore.updateCulture(stringToNumericCulture(culture))
}

onMounted(async () => {
  user.value = await getCurrentUser()
})
</script>
