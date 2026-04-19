import { createNotificationStore } from '@hivespace/shared'
import { notificationService } from '@/services/notification.service'
import i18n from '@/i18n'

const resolveLink = (eventType: string): string => {
  switch (eventType) {
    case 'order.confirmed':
    case 'order.cancelled':
      return '/orders'
    default:
      return '/notifications'
  }
}

const resolveMessage = (eventType: string, payload: Record<string, unknown>): string => {
  const t = i18n.global.t
  switch (eventType) {
    case 'order.confirmed':
      return t('notification.events.orderConfirmed', { storeName: payload.storeName ?? '', orderCode: payload.orderCode ?? '' })
    case 'order.cancelled':
      return t('notification.events.orderCancelled', { orderCode: payload.orderCode ?? '' })
    default:
      return t('notification.events.generic', { eventType })
  }
}

export const useNotificationStore = createNotificationStore({
  service: notificationService,
  resolveLink,
  resolveMessage,
})
