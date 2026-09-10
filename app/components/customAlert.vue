<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ props.title }}
        </v-card-title>
        <v-card-text>{{ props.body }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
              v-if="props.cancelButtonText"
              color="red"
              variant="text"
              @click="close"
          >
            {{ props.cancelButtonText }}
          </v-btn>
          <v-btn
              color="primary"
              variant="text"
              @click="confirmedClicked"
          >
            {{ props.confirmButtonText || 'Close' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  body: String,
  cancelButtonText: String,
  confirmButtonText: String
})

const dialog = ref(false)
let resolveFn = null

function show() {
  dialog.value = true
  return new Promise((resolve) => {
    resolveFn = resolve
  })
}

function close() {
  dialog.value = false
  if (resolveFn) resolveFn(false)
}

function confirmedClicked() {
  dialog.value = false
  if (resolveFn) resolveFn(true)
}

defineExpose({ show })
</script>
