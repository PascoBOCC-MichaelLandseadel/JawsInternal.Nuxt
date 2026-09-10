<!-- layouts/error.vue -->
<template>
  <v-app dark>
    <h1 v-if="error?.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/home">
      Home page
    </NuxtLink>
    <slot />
  </v-app>
</template>

<script setup>
import { useHead } from '#imports'

const props = defineProps({
  error: {
    type: Object,
    default: null
  }
})

const pageNotFound = '404 Not Found'
const otherError = 'An error occurred'

useHead({
  title: props.error?.statusCode === 404 ? pageNotFound : otherError
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
