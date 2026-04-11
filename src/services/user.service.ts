import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type { UserProfileResponse, UpdateProfileRequest } from '@/types'

const USER_ENDPOINTS = {
  SETTINGS: '/users/settings',
  ME: '/users/me',
} as const

class UserService {
  async getProfile(): Promise<UserProfileResponse> {
    const url = buildApiUrl(USER_ENDPOINTS.SETTINGS)
    return await apiService.get<UserProfileResponse>(url)
  }

  async updateProfile(data: UpdateProfileRequest): Promise<void> {
    const url = buildApiUrl(USER_ENDPOINTS.SETTINGS)
    await apiService.put(url, data)
  }
}

export const userService = new UserService()
