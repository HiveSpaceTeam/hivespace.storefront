<template>
  <div class="min-h-screen bg-[#f5f5f5] dark:bg-surface-dark py-6">
    <div class="container mx-auto px-4">
      <div class="flex gap-4 items-start">

        <!-- Sidebar (same structure as ProfilePage) -->
        <aside class="w-52 shrink-0">
          <div class="bg-white dark:bg-card-dark rounded shadow-sm overflow-hidden">
            <div class="flex items-center gap-3 px-4 py-5 border-b border-gray-100 dark:border-gray-700">
              <Avatar size="medium" />
              <div class="min-w-0">
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{{ displayUsername }}</p>
                <RouterLink to="/profile"
                  class="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors mt-0.5">
                  <Pencil class="w-3 h-3" />
                  {{ $t('storefront.profilePage.editProfile') }}
                </RouterLink>
              </div>
            </div>
            <nav class="py-2">
              <RouterLink to="/notifications"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Bell class="w-4 h-4 shrink-0" />
                {{ $t('storefront.profilePage.navNotifications') }}
              </RouterLink>
              <div>
                <button @click="accountOpen = !accountOpen"
                  class="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <User class="w-4 h-4 shrink-0 text-primary" />
                  <span class="flex-1 text-left">{{ $t('storefront.profilePage.navMyAccount') }}</span>
                  <ChevronDown class="w-3.5 h-3.5 transition-transform" :class="accountOpen ? 'rotate-180' : ''" />
                </button>
                <div v-show="accountOpen" class="pl-11 pr-3 pb-1 flex flex-col gap-0.5">
                  <RouterLink to="/profile"
                    class="block px-3 py-1.5 text-sm rounded transition-colors text-gray-500 dark:text-gray-400 hover:text-primary">
                    {{ $t('storefront.profilePage.navProfile') }}
                  </RouterLink>
                  <RouterLink to="/profile/address"
                    class="block px-3 py-1.5 text-sm rounded transition-colors text-primary font-medium">
                    {{ $t('storefront.profilePage.navAddress') }}
                  </RouterLink>
                  <RouterLink to="/profile/change-password"
                    class="block px-3 py-1.5 text-sm rounded transition-colors text-gray-500 dark:text-gray-400 hover:text-primary">
                    {{ $t('storefront.profilePage.navChangePassword') }}
                  </RouterLink>
                </div>
              </div>
              <RouterLink to="/orders"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <ShoppingBag class="w-4 h-4 shrink-0 text-primary" />
                {{ $t('storefront.profilePage.navMyOrders') }}
              </RouterLink>
            </nav>
          </div>
        </aside>

        <!-- Main content -->
        <div class="flex-1 bg-white dark:bg-card-dark rounded shadow-sm">
          <!-- Header -->
          <div class="flex items-center justify-between px-8 py-5 border-b border-gray-100 dark:border-gray-700">
            <h1 class="text-lg font-medium text-gray-800 dark:text-gray-100">
              {{ $t('storefront.address.pageTitle') }}
            </h1>
            <Button variant="outline" size="sm" :startIcon="PlusIcon" :onClick="handleAdd">
              {{ $t('storefront.address.addAddress') }}
            </Button>
          </div>

          <!-- Address list -->
          <div class="px-8 py-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              {{ $t('storefront.address.pageTitle') }}
            </p>

            <div v-for="(addr, idx) in addresses" :key="addr.id">
              <div v-if="idx > 0" class="border-t border-gray-100 dark:border-gray-700 my-1" />

              <div class="py-4">
                <!-- Top row: name / phone / actions -->
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-medium text-sm text-gray-800 dark:text-gray-100">{{ addr.fullName }}</span>
                      <span class="text-gray-300 dark:text-gray-600">|</span>
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{ addr.phoneNumber }}</span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                      {{ addr.street }}<br />
                      {{ formatLocation(addr) }}
                    </p>
                    <!-- Badges -->
                    <div class="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge v-if="addr.isDefault" variant="solid" color="error" size="sm">
                        {{ $t('storefront.address.defaultBadge') }}
                      </Badge>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-col items-end gap-2 shrink-0">
                    <div class="flex items-center gap-3">
                      <button type="button" @click="handleEdit(addr)"
                        class="text-primary text-xs hover:underline cursor-pointer">
                        {{ $t('storefront.address.update') }}
                      </button>
                      <button v-if="!addr.isDefault" type="button" @click="addressStore.openDeleteModal(addr.id)"
                        class="text-primary text-xs hover:underline cursor-pointer">
                        {{ $t('storefront.address.delete') }}
                      </button>
                    </div>
                    <button v-if="!addr.isDefault" type="button" @click="addressStore.setDefault(addr.id)"
                      class="text-xs border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1 rounded hover:border-gray-400 transition-colors">
                      {{ $t('storefront.address.setDefault') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="addresses.length === 0" class="py-16 text-center text-sm text-gray-400">
              {{ $t('storefront.address.pageTitle') }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Delete confirmation modal -->
  <Modal v-if="deleteModal.open" @close="addressStore.closeDeleteModal">
    <template #body>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center">
        <p class="text-sm text-gray-700 dark:text-gray-200 mb-6">
          {{ $t('storefront.address.deleteConfirmMessage') }}
        </p>
        <div class="flex justify-center gap-3">
          <Button variant="outline" :onClick="addressStore.closeDeleteModal">
            {{ $t('storefront.address.deleteCancel') }}
          </Button>
          <Button variant="danger" :loading="isLoading" :onClick="addressStore.confirmDelete">
            {{ $t('storefront.address.deleteConfirm') }}
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth, Avatar, Badge, Button, Modal, useModal } from '@hivespace/shared'
import { storeToRefs } from 'pinia'
import { Bell, User, ShoppingBag, ChevronDown, Pencil, Plus as PlusIcon } from 'lucide-vue-next'
import { useAddressStore } from '@/stores/address'
import AddressFormModal from '@/components/profile/AddressFormModal.vue'
import { formatLocation } from '@/types'
import type { UserAddress } from '@/types'

const { currentUser } = useAuth()
const { openModal } = useModal()
const addressStore = useAddressStore()
const { addresses, isLoading, deleteModal } = storeToRefs(addressStore)

const accountOpen = ref(true)

const displayUsername = computed(() =>
  currentUser.value?.profile?.preferred_username
  ?? currentUser.value?.profile?.name
  ?? currentUser.value?.profile?.sub
  ?? ''
)

const handleAdd = async () => {
  await openModal(AddressFormModal, { raw: true })
  await addressStore.fetchAddresses()
}

const handleEdit = async (addr: UserAddress) => {
  await openModal(AddressFormModal, { raw: true, address: addr })
  await addressStore.fetchAddresses()
}

onMounted(() => addressStore.fetchAddresses())
</script>
