import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type { UserAddress, AddressApiPayload } from '@/types'

const ADDRESS_ENDPOINTS = {
  BASE: '/users/address',
  BY_ID: (id: string) => `/users/address/${id}`,
  DEFAULT_ADDR: '/users/address/default',
  SET_DEFAULT: (id: string) => `/users/address/${id}/default`,
} as const

class AddressService {
  async getAddresses(): Promise<UserAddress[]> {
    const url = buildApiUrl(ADDRESS_ENDPOINTS.BASE)
    return await apiService.get<UserAddress[]>(url)
  }

  async getAddressById(id: string): Promise<UserAddress> {
    const url = buildApiUrl(ADDRESS_ENDPOINTS.BY_ID(id))
    return await apiService.get<UserAddress>(url)
  }

  async createAddress(data: AddressApiPayload): Promise<UserAddress> {
    const url = buildApiUrl(ADDRESS_ENDPOINTS.BASE)
    return await apiService.post<UserAddress>(url, data)
  }

  async updateAddress(id: string, data: AddressApiPayload): Promise<void> {
    const url = buildApiUrl(ADDRESS_ENDPOINTS.BY_ID(id))
    await apiService.put(url, { ...data, id })
  }

  async deleteAddress(id: string): Promise<void> {
    const url = buildApiUrl(ADDRESS_ENDPOINTS.BY_ID(id))
    await apiService.delete(url)
  }

  async getDefaultAddress(): Promise<UserAddress> {
    const url = buildApiUrl(ADDRESS_ENDPOINTS.DEFAULT_ADDR)
    return await apiService.get<UserAddress>(url)
  }

  async setDefaultAddress(id: string): Promise<void> {
    const url = buildApiUrl(ADDRESS_ENDPOINTS.SET_DEFAULT(id))
    await apiService.put(url, {})
  }
}

export const addressService = new AddressService()
