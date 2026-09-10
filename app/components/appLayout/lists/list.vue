<template>
  <v-list>
    <template v-for="(item, i) in items" :key="item.id || i">
      <list-group v-if="item.items" :item="item" />
      <list-item v-else :item="item" />
    </template>
  </v-list>
</template>

<script>
import listGroup from './listGroup.vue'
import listItem from './listItem.vue'

export default {
  name: 'List',
  components: { listGroup, listItem },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
