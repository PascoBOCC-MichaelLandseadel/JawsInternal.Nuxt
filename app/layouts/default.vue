<template>
  <v-app>
    <drawer />
    <v-main>
      <v-container style="max-width: 95%; margin-left: auto; margin-right: auto">
        <NuxtPage />
        <build-version />
        <settings />
      </v-container>
    </v-main>
    <toTop />
  </v-app>
</template>
<script setup>
import drawer from "../components/appLayout/drawer.vue";
import settings from "../components/appLayout/settings.vue";
import buildVersion from "../components/buildVersion.vue";
import toTop from "../components/appLayout/toTop.vue";
import localStorageService from "../services/common/localStorageService.js";
import {onMounted, watch} from "vue";
import {useTheme} from "vuetify/framework";

const theme = useTheme()

function checkSiteSettings() {
  if (localStorageService.getData('siteSettings')) {
    theme.change(localStorageService.getData('siteSettings').darkTheme)
    getAccentColor()
  }
}
function getAccentColor() {
  if (localStorageService.getData('siteSettings').accentColor) {
    const accentColor = localStorageService.getData('siteSettings').accentColor
    theme.themes.value.light.colors.primary = accentColor
    theme.themes.value.dark.colors.primary = accentColor
  }
}

watch(
    () => theme.global.name.value,
    (val) => {
      localStorageService.setData('darkTheme', val === 'dark', 'siteSettings')
      getAccentColor()
    }
)

onMounted(() => {
  checkSiteSettings()
})

</script>
