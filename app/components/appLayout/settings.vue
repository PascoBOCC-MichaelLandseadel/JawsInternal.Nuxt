<template>
  <div id="settings-wrapper">
    <v-card
        id="settings"
        class="py-2 px-4"
        color="rgba(0, 0, 0, .3)"
        dark
        flat
        link
        min-width="80"
        style="position: fixed; top: 10px; right: -25px; border-radius: 8px; z-index: 1000;"
    >
      <v-icon>mdi-cog</v-icon>
    </v-card>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        activator="#settings"
        bottom
        content-class="v-settings"
        left
        nudge-left="8"
        offset-x
        origin="top right"
        transition="scale-transition"
    >
      <v-card
          class="text-center mb-0"
          width="350"
      >
        <v-card-text>
          <strong class="d-inline-block">Theme Color</strong>
          <v-color-picker
              v-model="color"
              class="ma-2"
              hide-inputs
          />
          <v-row
              align="center"
              no-gutters
          >
            <v-spacer />
            <v-col cols="6">
              <v-switch
                  v-model="isDark"
                  class="ma-0 pa-0"
                  color="secondary"
                  hide-details
                  label="Dark Mode"
              />
            </v-col>
            <v-col cols="6">
              <v-btn color="primary" @click="reset">Default</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import localStorageService from '../../services/common/localStorageService'

const color = ref('#E91E63')
const menu = ref(false)
const theme = useTheme()

const isDark = ref(theme.global.current.value.dark)

watch(isDark, (val) => {
  theme.change(val ? 'dark' : 'light')
})

watch(() => theme.global.current.value.dark, (val) => {
  isDark.value = val
})

watch(color, (val) => {
  theme.themes.value.light.colors.primary = val
  theme.themes.value.dark.colors.primary = val
  localStorageService.setData('accentColor', val, 'siteSettings')
})

onMounted(() => {
  const siteSettings = localStorageService.getData('siteSettings')
  if (siteSettings && siteSettings.accentColor) {
    color.value = siteSettings.accentColor
  }
})

async function reset() {
  theme.themes.value.light.colors.primary = '#1976d2'
  theme.themes.value.dark.colors.primary = '#1976d2'
  localStorageService.setData('accentColor', '#1976d2', 'siteSettings')
  color.value = '#1976d2'
  theme.change('light')
}
</script>

<style lang="sass">
.v-settings
  .v-item-group > *
    cursor: pointer

  &__item
    border-width: 3px
    border-style: solid
    border-color: transparent !important

    &--active
      border-color: #00cae3 !important
</style>
