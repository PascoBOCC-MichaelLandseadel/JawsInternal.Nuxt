<script setup>
definePageMeta({
  layout: 'default',
  middleware: ['has-token'],
});

const breadcrumbs = [
  { title: 'Home' }
]
</script>

<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="mb-4" />
  <v-card>
    <v-card-title>Welcome Home!</v-card-title>
    <v-card-text>We were waiting for you, but since it took forever to build this template, we left you this note instead.</v-card-text>
  </v-card>
  </div>
</template>
