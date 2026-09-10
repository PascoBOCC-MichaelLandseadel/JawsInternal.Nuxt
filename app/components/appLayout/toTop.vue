<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const fab = ref(false)

function onScroll() {
  const top = window.pageYOffset || 0
  fab.value = top > 20
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <v-btn
      v-show="fab"
      icon
      color="primary"
      class="to-top-btn"
      style="position: fixed; bottom: 24px; right: 24px; z-index: 1000;"
      @click="toTop"
  >
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<style scoped>
/* Optional: add custom styles if needed */
</style>
