import iconsIndexPlugin from './scripts/eslint-plugin-icons-index'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  {
    name: 'app/vue-rules',
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/block-lang': 'off',
    },
  },
  {
    name: 'icons-index-consistency',
    plugins: {
      'icons-index': iconsIndexPlugin,
    },
    rules: {
      'icons-index/icons-index-consistency': 'error',
    },
    files: ['src/icons/index.ts'],
  },
)
