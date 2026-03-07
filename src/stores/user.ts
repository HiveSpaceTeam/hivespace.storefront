import {
    type UserSettings,
    type CultureText,
    type ThemeText,
    DEFAULT_USER_SETTINGS,
    numericToStringCulture,
    numericToStringTheme,
} from '@hivespace/shared'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    // User settings state
    const userSettings = ref<UserSettings>(DEFAULT_USER_SETTINGS)

    // User Settings Actions
    const setUserSettings = (settings: UserSettings) => {
        userSettings.value = settings

        // Sync theme to DOM for TailWindCSS
        if (numericToStringTheme(settings.theme) === 'dark') {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }

    /**
     * Update theme setting
     */
    const updateTheme = async (themeValue: number) => {
        const newSettings = { ...userSettings.value, theme: themeValue }
        // Store in cookie
        document.cookie = `theme=${numericToStringTheme(themeValue)}; path=/; max-age=31536000`
        setUserSettings(newSettings)
    }

    /**
     * Update culture setting and sync with i18n
     */
    const updateCulture = async (cultureValue: number) => {
        const newSettings = { ...userSettings.value, culture: cultureValue }
        // Store in cookie
        document.cookie = `culture=${numericToStringCulture(cultureValue)}; path=/; max-age=31536000`
        setUserSettings(newSettings)
    }

    /**
     * Get current culture as string ('vi'|'en')
     */
    const getCurrentCulture = (): CultureText => {
        return numericToStringCulture(userSettings.value.culture)
    }

    /**
     * Get current theme as string ('light'|'dark')
     */
    const getCurrentTheme = (): ThemeText => {
        return numericToStringTheme(userSettings.value.theme)
    }

    return {
        // User Settings State
        userSettings,
        // User Settings Actions
        setUserSettings,
        updateTheme,
        updateCulture,
        getCurrentCulture,
        getCurrentTheme,
    }
})
