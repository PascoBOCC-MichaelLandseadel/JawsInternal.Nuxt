<template>
  <v-btn
      :loading="busy"
      :disabled="busy"
      :color="variant"
      :size="size"
      type="button"
      class="d-flex align-center"
      @click="clickEvent"
  >
    <template #loader>
      <v-progress-circular indeterminate color="white" />
    </template>
    <v-icon v-if="icon && !busy" :icon="icon" />
    <span v-if="!busy">{{ text }}</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    busy: Boolean,
    variant: String,
    icon: String,
    size: String,
    text: String
  },
  methods: {
    clickEvent () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
