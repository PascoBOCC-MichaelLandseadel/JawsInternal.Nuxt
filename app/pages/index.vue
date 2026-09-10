<script setup>
import { useRouter } from "#app"

const router = useRouter()

onMounted(() => {
  router.push({ path: '/home' })
})
</script>

<template>
  <v-card class="ma-3 pa-3 d-flex align-center">
    <v-progress-circular indeterminate size="20" class="mr-2" />
    Loading...
  </v-card>
</template>
