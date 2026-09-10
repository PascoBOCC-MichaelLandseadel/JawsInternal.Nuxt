<template>
  <v-card class="mx-auto" max-width="400" style="top: 25%; border-radius: 15px;">
    <v-overlay :value="overlay" absolute>
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <v-form @submit.prevent="onSubmit">
      <v-card-text>
        <div class="text-center mb-5">
          <v-avatar class="mb-4">
            <v-img src="/gavel.png" />
          </v-avatar>
          <h1>{{ appName }}</h1>
          <h3 class="mt-2">
            Pasco County
          </h3>
        </div>
        <div class="text--primary">
        <Field
            v-slot="{ field, errors }"
            name="Username"
            rules="required"
        >
          <v-text-field
              v-bind="field"
              v-model="loginInfo.username"
              type="text"
              label="Username"
              :error-messages="errors"
              autofocus
          />
        </Field>
        <Field
            v-slot="{ field, errors }"
            name="Password"
            rules="required"
        >
          <v-text-field
              v-bind="field"
              v-model="loginInfo.password"
              label="Password"
              autocomplete="off"
              :error-messages="errors"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
          />
        </Field>
          <div class="text-center">
            <v-btn
                color="primary"
                class="mt-2"
                type="submit"
                :loading="overlay"
                :disabled="overlay"
            >
              Login
            </v-btn>
          </div>
        </div>
      </v-card-text>

    </v-form>
  </v-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRuntimeConfig } from '#imports'
import { useForm, Field } from 'vee-validate'
import accountService from '../../services/common/accountService'
import notificationService from "../../services/common/notificationService"

definePageMeta({
  layout: 'external',
  middleware: ['navigation-guard']
})

const config = useRuntimeConfig().public
const appName = config.appName
const showPassword = ref(false)

const router = useRouter()
const overlay = ref(false)
const loginInfo = reactive({ username: '', password: '' })
const { validate } = useForm()

const onSubmit = async () => {
  const valid = await validate()
  if (!valid.valid) return false
  overlay.value = true
  try {
    await accountService.login(loginInfo)
    router.push({ path: '/home' })
  } catch (e) {
    notificationService().error('Username or Password is incorrect')
  }
  overlay.value = false
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
