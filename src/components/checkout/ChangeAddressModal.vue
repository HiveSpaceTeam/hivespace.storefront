<template>
  <Modal @close="emit('update:modelValue', false)">
    <template #body>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-base font-semibold text-gray-800 dark:text-gray-100">
            {{ t('checkout.changeAddressTitle') }}
          </h2>
          <button type="button" @click="emit('update:modelValue', false)"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <!-- Loading -->
          <div v-if="isLoading" class="flex justify-center py-8">
            <Spinner />
          </div>

          <!-- Empty -->
          <div v-else-if="addresses.length === 0"
            class="text-center py-8 text-sm text-gray-400">
            {{ t('checkout.noAddresses') }}
          </div>

          <!-- Address list -->
          <div v-else class="flex flex-col gap-3">
            <label
              v-for="addr in addresses"
              :key="addr.id"
              class="flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors"
              :class="selectedId === addr.id
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'"
            >
              <input
                type="radio"
                :value="addr.id"
                v-model="selectedId"
                class="mt-1 accent-primary shrink-0"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ addr.fullName }}</span>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ addr.phoneNumber }}</span>
                  <Badge v-if="addr.isDefault" class="rounded-sm" variant="light" size="sm" color="success">
                    {{ t('checkout.defaultAddress') }}
                  </Badge>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {{ [addr.street, addr.ward, addr.district, addr.province].filter(Boolean).join(', ') }}
                </p>
              </div>
            </label>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <Button type="button" variant="outline" @click="emit('update:modelValue', false)">
            {{ t('storefront.address.cancel') }}
          </Button>
          <Button type="button" variant="primary" :disabled="!selectedId" @click="handleConfirm">
            {{ t('checkout.confirmAddress') }}
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import { Modal, Button, Badge, Spinner } from '@hivespace/shared'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useAddressStore } from '@/stores/address'
import type { UserAddress } from '@/types'

const props = defineProps<{
  modelValue: boolean
  currentAddressId?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'select': [address: UserAddress]
}>()

const { t } = useI18n()
const addressStore = useAddressStore()
const { addresses, isLoading } = storeToRefs(addressStore)

const selectedId = ref<string | null>(props.currentAddressId ?? null)

onMounted(async () => {
  await addressStore.fetchAddresses()
})

watch(() => props.currentAddressId, (id) => {
  selectedId.value = id ?? null
})

const handleConfirm = () => {
  const addr = addresses.value.find(a => a.id === selectedId.value)
  if (addr) {
    emit('select', addr)
    emit('update:modelValue', false)
  }
}
</script>
