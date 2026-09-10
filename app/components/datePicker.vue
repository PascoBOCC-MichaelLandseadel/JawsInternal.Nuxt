<template>
  <div>
    <v-menu
        ref="menu1"
        v-model="showDatePicker"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
    >
      <template #activator="{ on, props }">
        <v-text-field
            v-model="dateFormatted"
            :disabled="disabled"
            :label="label"
            :persistent-hint="showHint"
            hint="MM/DD/YYYY"
            :error="invalidDate || errorMessages.length !== 0"
            :error-messages="invalidDate ? 'Date is not valid' : errorMessages.length !== 0 ? errorMessages : ''"
            v-bind="props"
            :density="density"
            prepend-icon="mdi-calendar-month"
            v-on="on"
            @blur="date = parseDate(dateFormatted)"
        />
      </template>
      <v-date-picker
          v-model="date"
          scrollable
          hide-header
          @input="showDatePicker = false"
      />
    </v-menu>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import moment from 'moment'

const props = defineProps({
  dateProp: [String, Date],
  disabled: Boolean,
  label: String,
  showHint: Boolean,
  density: String,
  errorMessages: Array,
})
const emit = defineEmits(['update:date-prop'])

const showDatePicker = ref(false)
const date = ref('')
const dateFormatted = ref('')
const invalidDate = ref(false)

watch(() => props.dateProp, () => {
  fixProp()
}, { immediate: true })

watch(() => date.value, (val) => {
  dateFormatted.value = formatDate(val)
  emit('update:date-prop', dateFormatted.value)
})

onMounted(async () => {
  fixProp()
})

function fixProp () {
  const dateFixed = parseDate(props.dateProp)
  date.value = dateFixed
  dateFormatted.value = formatDate(dateFixed)
}

function parseDate(date) {
  if (!date) { return '' }
  if (date.includes('/')) {
    const [month, day, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  } else {
    const [month, day, year] = date.split('-')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
}

function formatDate (date) {
  if (!date) { return '' }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  showDatePicker.value = false
  return `${month}/${day}/${year}`
}
</script>

<style scoped>
</style>
