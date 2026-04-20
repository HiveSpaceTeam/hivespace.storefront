<template>
  <Modal @close="handleClose">
    <template #body>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            {{ isEdit ? $t('storefront.address.modalEditTitle') : $t('storefront.address.modalAddTitle') }}
          </h2>
          <button type="button" @click="handleClose"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="px-6 py-5 flex flex-col gap-4">
          <!-- Name + Phone row -->
          <div class="grid grid-cols-2 gap-3">
            <Input
              v-model="formData.fullName"
              :placeholder="$t('storefront.address.fullName')"
              :label="$t('storefront.address.fullName')"
              required
            />
            <Input
              v-model="formData.phoneNumber"
              :placeholder="$t('storefront.address.phone')"
              :label="$t('storefront.address.phone')"
              required
            />
          </div>

          <!-- Province / District -->
          <div class="grid grid-cols-2 gap-3">
            <Input
              v-model="formData.province"
              :placeholder="$t('storefront.address.province')"
              :label="$t('storefront.address.province')"
              required
            />
            <Input
              v-model="formData.district"
              :placeholder="$t('storefront.address.ward')"
              :label="$t('storefront.address.ward')"
              required
            />
          </div>

          <!-- Specific address (street) -->
          <TextArea
            v-model="formData.street"
            :placeholder="$t('storefront.address.detailPlaceholder')"
            :label="$t('storefront.address.detail')"
            :rows="2"
            required
          />

          <!-- Default checkbox -->
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="formData.isDefault"
              class="w-4 h-4 accent-primary rounded"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              {{ $t('storefront.address.setDefault') }}
            </span>
          </label>
        </form>

        <!-- Footer -->
        <div class="flex justify-end gap-3 px-6 pb-6">
          <Button type="button" variant="outline" :onClick="handleClose">
            {{ $t('storefront.address.cancel') }}
          </Button>
          <Button type="button" variant="primary" :loading="isLoading" :onClick="handleSubmit">
            {{ $t('storefront.address.confirm') }}
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { Modal, Input, TextArea, Button } from '@hivespace/shared'
import { storeToRefs } from 'pinia'
import { X } from 'lucide-vue-next'
import { useAddressStore } from '@/stores/address'
import type { AddressFormData } from '@/types'

const addressStore = useAddressStore()
const { editingAddress, isLoading } = storeToRefs(addressStore)

const isEdit = computed(() => !!editingAddress.value)

const formData = reactive<AddressFormData>({
  fullName: '',
  phoneNumber: '',
  province: '',
  district: '',
  street: '',
  isDefault: false,
})

watch(editingAddress, (addr) => {
  if (addr) {
    formData.fullName = addr.fullName
    formData.phoneNumber = addr.phoneNumber
    formData.province = addr.province
    formData.district = addr.district
    formData.street = addr.street
    formData.isDefault = addr.isDefault
  } else {
    formData.fullName = ''
    formData.phoneNumber = ''
    formData.province = ''
    formData.district = ''
    formData.street = ''
    formData.isDefault = false
  }
}, { immediate: true })

const handleClose = () => addressStore.closeFormModal()

const handleSubmit = async () => {
  if (!formData.fullName || !formData.phoneNumber || !formData.province || !formData.district || !formData.street) return
  await addressStore.saveAddress({ ...formData })
}
</script>
