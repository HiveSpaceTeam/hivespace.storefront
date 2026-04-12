import { apiService } from './api'
import { buildApiUrl } from '@/config'
import type { PaymentDto } from '@/types'

class PaymentService {
  async getPayment(paymentId: string): Promise<PaymentDto> {
    return await apiService.get<PaymentDto>(buildApiUrl(`/payments/${paymentId}`))
  }

  async getPaymentByOrder(orderId: string): Promise<PaymentDto> {
    return await apiService.get<PaymentDto>(buildApiUrl(`/payments/by-order/${orderId}`))
  }
}

export const paymentService = new PaymentService()
