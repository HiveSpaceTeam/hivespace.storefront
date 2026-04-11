import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from '@hivespace/shared'
import i18n from '@/i18n'
import { userService } from '@/services/user.service'
import type { ProfileFormData, UserProfileResponse } from '@/types'
import { GENDER_FROM_API, GENDER_TO_API } from '@/types'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<UserProfileResponse | null>(null)
  const form = ref<ProfileFormData>({
    name: '',
    gender: '',
    birthDay: null,
    birthMonth: null,
    birthYear: null,
  })
  const isLoading = ref(false)

  const fetchProfile = async () => {
    isLoading.value = true
    try {
      profile.value = await userService.getProfile()

      // Populate form from API response
      const dob = profile.value.dateOfBirth ? new Date(profile.value.dateOfBirth) : null
      form.value = {
        name: profile.value.fullName ?? '',
        gender: GENDER_FROM_API[profile.value.gender] ?? 'other',
        birthDay: dob ? dob.getDate() : null,
        birthMonth: dob ? dob.getMonth() + 1 : null,
        birthYear: dob ? dob.getFullYear() : null,
      }
    } finally {
      isLoading.value = false
    }
  }

  const setForm = (data: Partial<ProfileFormData>) => {
    form.value = { ...form.value, ...data }
  }

  const saveProfile = async () => {
    const appStore = useAppStore()
    if (!profile.value) return
    isLoading.value = true
    try {
      const { birthDay, birthMonth, birthYear } = form.value
      const dateOfBirth =
        birthDay && birthMonth && birthYear
          ? new Date(birthYear, birthMonth - 1, birthDay).toISOString()
          : null

      await userService.updateProfile({
        userName: profile.value.userName,
        fullName: form.value.name,
        phoneNumber: profile.value.phoneNumber,
        email: profile.value.email,
        gender: GENDER_TO_API[form.value.gender],
        dateOfBirth,
      })

      // Sync local profile cache
      profile.value = {
        ...profile.value,
        fullName: form.value.name,
        gender: GENDER_TO_API[form.value.gender],
        dateOfBirth,
      }

      appStore.notifySuccess(i18n.global.t('storefront.profilePage.saveSuccess'))
    } finally {
      isLoading.value = false
    }
  }

  return { profile, form, isLoading, fetchProfile, setForm, saveProfile }
})
