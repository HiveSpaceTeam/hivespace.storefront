// Matches API response from GET /api/v1/users/address
export interface UserAddress {
  id: string
  fullName: string
  phoneNumber: string
  street: string
  district: string
  province: string
  country: string
  zipCode: string
  isDefault: boolean
}

// Used by AddressFormModal
export interface AddressFormData {
  fullName: string
  phoneNumber: string
  province: string
  district: string
  street: string
  isDefault: boolean
}

export interface AddressApiPayload {
  fullName: string
  phoneNumber: string
  street: string
  district: string
  province: string
  country: string
  zipCode: string
  isDefault: boolean
}

/** { province, district } → "Hà Nội, Quận Cầu Giấy" */
export const formatLocation = (addr: Pick<UserAddress, 'province' | 'district'>) =>
  [addr.province, addr.district].filter(Boolean).join(', ')
