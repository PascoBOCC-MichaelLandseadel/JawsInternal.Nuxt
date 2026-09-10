<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="mb-4" />
  <v-card>
    <div class="ma-3 pa-3">
      <h4>Version: {{ version }}</h4>
      <a @click.prevent="showHelpDoc('Help Document Sample.pdf')" href="/">Download Help Document</a>
    </div>
  </v-card>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from "#app";
import downloadService from "../services/common/downloadService.js";

const breadcrumbs = [
  { title: 'Help', active: true }
]

const config = useRuntimeConfig();
const version = config.public.version;

function showHelpDoc(fileName) {
  downloadService.showGuide(fileName);
}

</script>
