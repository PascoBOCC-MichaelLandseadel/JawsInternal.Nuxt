<template>
  <v-list-group
      v-model="isOpen"
      :prepend-icon="item.icon"
  >
    <template #activator="{ props: activatorProps }">
      <v-list-item v-bind="activatorProps">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </template>
    <template v-for="(child, i) in item.items" :key="child.id || i">
      <list-group v-if="child.items" :item="child" />
      <list-item v-else :item="child" />
    </template>
  </v-list-group>
</template>

<script>
import listItem from './listItem.vue'

export default {
  name: 'ListGroup',
  components: {
    // Register by name to avoid circular import issues
    listGroup: () => import('./listGroup.vue'),
    listItem
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
