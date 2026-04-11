import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAppStore } from '@hivespace/shared'
import i18n from '@/i18n'
import { addressService } from '@/services/address.service'
import type { UserAddress, AddressFormData } from '@/types'

const sortAddresses = (list: UserAddress[]) =>
  [...list].sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))

export const useAddressStore = defineStore('address', () => {
  const addresses = ref<UserAddress[]>([])
  const isLoading = ref(false)
  const formModal = ref<{ open: boolean; editId: string | null; editData: UserAddress | null }>({
    open: false,
    editId: null,
    editData: null,
  })
  const deleteModal = ref<{ open: boolean; deleteId: string | null }>({ open: false, deleteId: null })

  const editingAddress = computed(() => formModal.value.editData)

  const fetchAddresses = async () => {
    isLoading.value = true
    try {
      addresses.value = sortAddresses(await addressService.getAddresses())
    } finally {
      isLoading.value = false
    }
  }

  const openAddModal = () => {
    formModal.value = { open: true, editId: null, editData: null }
  }

  const openEditModal = async (id: string) => {
    formModal.value = { open: true, editId: id, editData: null }
    try {
      const addr = await addressService.getAddressById(id)
      formModal.value.editData = addr
    } catch {
      // fallback to local data nếu API lỗi
      formModal.value.editData = addresses.value.find(a => a.id === id) ?? null
    }
  }

  const closeFormModal = () => {
    formModal.value = { open: false, editId: null, editData: null }
  }

  const saveAddress = async (data: AddressFormData) => {
    const appStore = useAppStore()
    isLoading.value = true
    try {
      const payload = {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        street: data.street,
        province: data.province,
        district: data.district,
        ward: data.ward,
        country: 'Việt Nam',
        zipCode: '',
        isDefault: data.isDefault,
      }

      if (formModal.value.editId) {
        await addressService.updateAddress(formModal.value.editId, payload)
        const idx = addresses.value.findIndex(a => a.id === formModal.value.editId)
        if (idx !== -1) {
          addresses.value[idx] = { ...addresses.value[idx], ...payload }
        }
      } else {
        const created = await addressService.createAddress(payload)
        addresses.value.push(created)
      }

      closeFormModal()
      appStore.notifySuccess(i18n.global.t('storefront.address.saveSuccess'))
    } finally {
      isLoading.value = false
    }
  }

  const openDeleteModal = (id: string) => {
    deleteModal.value = { open: true, deleteId: id }
  }

  const closeDeleteModal = () => {
    deleteModal.value = { open: false, deleteId: null }
  }

  const confirmDelete = async () => {
    const appStore = useAppStore()
    if (!deleteModal.value.deleteId) return
    isLoading.value = true
    try {
      await addressService.deleteAddress(deleteModal.value.deleteId)
      addresses.value = addresses.value.filter(a => a.id !== deleteModal.value.deleteId)
      closeDeleteModal()
      appStore.notifySuccess(i18n.global.t('storefront.address.deleteSuccess'))
    } finally {
      isLoading.value = false
    }
  }

  const setDefault = async (id: string) => {
    const appStore = useAppStore()
    try {
      await addressService.setDefaultAddress(id)
      addresses.value = sortAddresses(addresses.value.map(a => ({ ...a, isDefault: a.id === id })))
      appStore.notifySuccess(i18n.global.t('storefront.address.setDefaultSuccess'))
    } catch {
      // error toast handled by apiService
    }
  }

  return {
    addresses,
    isLoading,
    formModal,
    deleteModal,
    editingAddress,
    fetchAddresses,
    openAddModal,
    openEditModal,
    closeFormModal,
    saveAddress,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    setDefault,
  }
})
