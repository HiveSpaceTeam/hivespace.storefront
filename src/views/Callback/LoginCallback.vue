<template>
  <div>
    <h1></h1>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@hivespace/shared'

const router = useRouter()
const { handleLoginCallback } = useAuth()

onMounted(async () => {
  let returnToUrl = '/'
  try {
    const result = await handleLoginCallback()
    if (result.state !== undefined) {
      returnToUrl = (result.state as string) || returnToUrl
    }
  } catch (error) {
    console.error('Callback error:', error)
    router.replace('/')
    return
  }

  router.push({ path: returnToUrl })
})
</script>
