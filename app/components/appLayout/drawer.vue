<template>
  <div>
    <v-app-bar
        app
        absolute
        class="v-bar--underline"
        color="transparent"
        height="70"
        border="border"
        flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <i class="fa-solid fa-bars" />
      </v-app-bar-nav-icon>
      <v-app-bar-title>
        {{ appName }}<span v-if="appEnv !== 'prod'"> - {{ appEnv }}</span>
      </v-app-bar-title>
      <v-breadcrumbs :items="breadcrumbs" />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        :rail="display.md.value"
        :expand-on-hover="display.md.value"
        :temporary="display.smAndDown.value"
        :permanent="display.mdAndUp.value"
        rail-width="80"
        :width="300"
        app
    >
      <div class="d-flex flex-column h-100">
        <div class="px-2">
          <v-list-item class="mb-0 pl-3">
            <div class="d-flex align-center">
              <v-avatar style="border-radius: unset">
                <v-img src="/pascoBirb.png" />
              </v-avatar>
              <div class="pl-1">
                <v-list-item-title>
                  <strong class="mr-1 font-weight-black">{{ appName }}</strong>
                </v-list-item-title>
              </div>
            </div>
          </v-list-item>
          <v-divider class="mx-3 mb-2" />
          <menuItems />
        </div>

        <div class="ma-2 mt-auto">
          <v-list-item

              style="background-color: #1976d2 !important; /* Vuetify primary blue */
  color: #fff !important;
  border-radius: 5px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;"
              class="pl-1"
              @click="logOff"
          >
            <div class="d-flex align-center">
              <div v-if="loggingOff">
                <v-progress-circular
                    indeterminate
                />
              </div>
              <div v-else>
                <v-icon class="white--text mr-2">
                  mdi-logout
                </v-icon>
                <strong class="white--text">Logout</strong>
              </div>
            </div>
          </v-list-item>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute, useRouter, useRuntimeConfig } from '#imports'
import tokenService from '../../services/common/tokenService'
import userProfileService from '../../services/common/userProfileService'
import menuItems from "./menuItems.vue";

const config = useRuntimeConfig().public
const route = useRoute()
const router = useRouter()
const drawer = ref(true)
const appName = config.appName
const display = useDisplay()
const loggingOff = ref(false)
const overlay = computed(() => loggingOff.value)
const appEnv = config.BIND
const userProfile = ref({})

onMounted(() => {
  userProfile.value = userProfileService.getProfile()
})

const breadcrumbs = computed(() => {
  // Adapted for Vue 3 router
  const matched = route.matched?.[0]
  return matched?.components?.default?.breadcrumbs || []
})

function logOff() {
  loggingOff.value = true
  tokenService.logout(router)
}
function profileUpdated() {
  userProfile.value = userProfileService.getProfile()
}
function canHas(permission) {
  // Implement your permission logic here
  return true
}
</script>

<style scoped lang="scss">

</style>
