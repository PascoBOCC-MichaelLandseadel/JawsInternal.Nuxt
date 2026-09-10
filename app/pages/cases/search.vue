<template>
  <v-container>
    <h1 class="mb-4">Case Search</h1>

    <v-row class="mb-2" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="query"
          label="Case number"
          placeholder="e.g. 2020"
          clearable
          @keyup.enter="search"
        />
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" :loading="loading" @click="search">Search</v-btn>
      </v-col>
    </v-row>

    <p v-if="searched && !loading" class="text-medium-emphasis">
      {{ results.length }} result(s).
    </p>

    <v-data-table
      v-if="results.length"
      :headers="headers"
      :items="results"
      :items-per-page="25"
      density="comfortable"
    />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import caseService from '../../services/jaws/caseService'
import notificationService from '../../services/common/notificationService'

definePageMeta({
  layout: 'default',
  middleware: ['has-token']
})

const query = ref('2020')
const results = ref([])
const loading = ref(false)
const searched = ref(false)

const headers = [
  { title: 'Case ID', key: 'caseId' },
  { title: 'Case Number', key: 'caseNumber' },
  { title: 'Status', key: 'caseStatus' },
  { title: 'Type', key: 'caseType' },
  { title: 'Filed Date', key: 'filedDate' }
]

const search = async () => {
  loading.value = true
  searched.value = true
  try {
    results.value = await caseService.search(query.value, 25)
  } catch (e) {
    notificationService().error('Search failed.')
    results.value = []
  }
  loading.value = false
}
</script>