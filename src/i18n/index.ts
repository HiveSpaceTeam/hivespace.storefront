import { createI18n } from 'vue-i18n'
import { CULTURE_TEXT, en as enShared, vi as viShared } from '@hivespace/shared'

// Import storefront translation files
import enStorefront from './locales/en/storefront.json'
import viStorefront from './locales/vi/storefront.json'

const en = {
    ...enShared,
    storefront: enStorefront,
}

const vi = {
    ...viShared,
    storefront: viStorefront,
}

const i18n = createI18n({
    legacy: false,
    locale: CULTURE_TEXT.VIETNAMESE,
    fallbackLocale: CULTURE_TEXT.ENGLISH,
    messages: {
        [CULTURE_TEXT.VIETNAMESE]: vi,
        [CULTURE_TEXT.ENGLISH]: en,
    },
})

export default i18n
