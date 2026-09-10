<template>
  <v-app>
    <!-- <v-app-bar app /> -->
    <v-main class="backgroundImage">
      <v-container style="height: 100%">
        <nuxt-page />
        <build-version />
        <settings />
      </v-container>
    </v-main>
    <v-footer
        v-if="showFooter"
        color="primary lighten-1"
        padless
    >
      <v-row
          justify="center"
          no-gutters
      >
        <v-btn
            v-for="link in links"
            :key="link"
            color="white"
            text
            rounded
            class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRuntimeConfig } from "#imports";
import { useTheme } from 'vuetify/lib/framework.mjs'
import localStorageService from '../services/common/localStorageService'
import buildVersion from "../components/buildVersion.vue";
import settings from "../components/appLayout/settings.vue";

const route = useRoute()
const env = useRuntimeConfig().public
const regPage = ref(false)
const loginPage = ref(false)
const showFooter = ref(env.showFooter)

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

<style scoped lang="scss">
.backgroundImage {
  background-image: url('/login-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
