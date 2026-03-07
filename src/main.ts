import './assets/main.css'
import '@hivespace/shared/style.css'
// Import Swiper styles removed
import 'vue-final-modal/style.css'

import { createVfm } from 'vue-final-modal'
import i18n from './i18n'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import {
    CULTURE_TEXT,
    THEME_TEXT,
    stringToNumericCulture,
    numericToStringCulture,
    stringToNumericTheme,
    getCookie,
} from '@hivespace/shared'
import { useUserStore } from '@/stores/user'

const initializeApp = async () => {
    const app = createApp(App)
    const pinia = createPinia()
    const vfm = createVfm()

    // 1. Install Core Plugins
    app.use(pinia)
    // 2. Install UI Plugins
    app.use(vfm)
    app.use(i18n)

    app.use(router)

    // 4. Initialize User Settings (Culture & Theme from Cookies)
    const userStore = useUserStore()

    // Initialize culture from cookie
    const cookieCulture = getCookie('culture')
    const cultureText = cookieCulture || CULTURE_TEXT.VIETNAMESE
    const numericCulture = stringToNumericCulture(cultureText)
    const validCultureText = numericToStringCulture(numericCulture)
    i18n.global.locale.value = validCultureText

    // Initialize theme from cookie
    const cookieTheme = getCookie('theme')
    const themeTextCookie = cookieTheme || THEME_TEXT.LIGHT
    const numericTheme = stringToNumericTheme(themeTextCookie)

    userStore.setUserSettings({
        culture: numericCulture,
        theme: numericTheme,
    })

    // Sync theme to document body
    if (themeTextCookie === THEME_TEXT.DARK) {
        document.body.classList.add('dark')
    }

    return app
}

// Initialize and mount the app
initializeApp().then((app) => {
    app.mount('#app')
})
