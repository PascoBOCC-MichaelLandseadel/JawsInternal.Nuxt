<template>
  <v-app-bar
      app
      absolute
      class="v-bar--underline"
      color="transparent"
      height="70"
      flat
  >
    <v-app-bar-nav-icon
        class="d-md-none"
        @click="$emit('drawerUpdated')"
    />
    <v-breadcrumbs :items="breadcrumbs" />
    <v-spacer />
  </v-app-bar>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from '#imports'

const props = defineProps({
  miniProp: Boolean,
  drawerProp: Boolean
})

const mini = ref(props.miniProp)
const drawer = ref(props.drawerProp)

watch(() => props.miniProp, (val) => { mini.value = val })
watch(() => props.drawerProp, (val) => { drawer.value = val })

const route = useRoute()
const breadcrumbs = computed(() => {
  const matched = route.matched?.[0]
  if (!matched) return []
  const comp = matched.components?.default
  return comp?.options?.breadcrumbs || comp?.breadcrumbs || []
})
</script>
