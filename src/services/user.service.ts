import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type { UserProfileResponse, UpdateProfileRequest } from '@/types'

const USER_ENDPOINTS = {
  ME: '/users/me',
} as const

class UserService {
  async getProfile(): Promise<UserProfileResponse> {
    const url = buildApiUrl(USER_ENDPOINTS.ME)
    return await apiService.get<UserProfileResponse>(url)
  }

  async updateProfile(data: UpdateProfileRequest): Promise<void> {
    const url = buildApiUrl(USER_ENDPOINTS.ME)
    await apiService.put(url, data)
  }
}

export const userService = new UserService()
