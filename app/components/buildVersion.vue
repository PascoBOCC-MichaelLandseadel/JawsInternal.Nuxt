<template>
  <div>
    <v-snackbar
        v-model="showSnackbar"
        :timeout="-1"
        :dark="true"
    >
      A newer version is available.

      <template v-slot:actions>
        <v-btn
            variant="elevated"
            class="ma-2"
            color="primary"
            @click="refreshBuildVersionCache"
        >
          <strong>Update</strong>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#imports'
import localStorageService from '../services/common/localStorageService.js'

const showSnackbar = ref(false)
const buildVersion = useRuntimeConfig().public.buildVersion

function checkCachedBuildVersion() {
  const siteSettings = localStorageService.getData('siteSettings')
  if (!siteSettings || !siteSettings.buildVersion) {
    refreshBuildVersionCache()
  } else if (siteSettings.buildVersion !== buildVersion) {
    showSnackbar.value = true
  }
}

function refreshBuildVersionCache() {
  localStorageService.setData('buildVersion', buildVersion, 'siteSettings')
  // Only reload if the value was actually different
  window.location.reload()
}

onMounted(() => {
  checkCachedBuildVersion()
})
</script>
