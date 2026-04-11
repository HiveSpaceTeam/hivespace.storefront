// Matches API response from GET /api/v1/users/address
export interface UserAddress {
  id: string
  fullName: string
  phoneNumber: string
  street: string
  ward: string
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
  ward: string
  street: string
  isDefault: boolean
}

export interface AddressApiPayload {
  fullName: string
  phoneNumber: string
  street: string
  ward: string
  district: string
  province: string
  country: string
  zipCode: string
  isDefault: boolean
}

/** "Hà Nội, Quận Cầu Giấy, Phường Mai Dịch" → { province, district, ward } */
export const parseLocation = (location: string) => {
  const parts = location.split(',').map(p => p.trim())
  return {
    province: parts[0] ?? '',
    district: parts[1] ?? '',
    ward: parts[2] ?? '',
  }
}

/** { province, district, ward } → "Hà Nội, Quận Cầu Giấy, Phường Mai Dịch" */
export const formatLocation = (addr: Pick<UserAddress, 'province' | 'district' | 'ward'>) =>
  [addr.province, addr.district, addr.ward].filter(Boolean).join(', ')
