<template>
  <v-list-item
      :href="item.href"
      :rel="item.href ? 'nofollow noopener noreffer' : undefined"
      :target="item.href ? '_blank' : undefined"
      :to="item.to"
      active-class="my-active"
      link
      class="py-1"
      v-bind="$attrs"
  >
    <template #prepend>
      <span
          v-if="!item.icon"
          class="text-caption text-uppercase justify-center ml-1 my-2 align-self-center"
      >
        {{ initials }}
      </span>
      <v-icon
          v-else
          class="my-2 align-self-center"
          :icon="item.icon"
      />
    </template>

    <template #append v-if="item.avatar">
      <v-avatar>
        <v-img :src="item.avatar" />
      </v-avatar>
    </template>

    <v-list-item-title v-if="item.title">
      {{ item.title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    initials() {
      if (!this.item.title) return ''
      const matches = this.item.title.match(/\b(\w)/g)
      return matches ? matches.join('') : ''
    }
  }
}
</script>

<style>
.theme--dark.v-list-item--active:hover::before, .theme--dark.v-list-item--active::before {
  opacity: 0 !important;
}

.my-active {
  background-color: #1976d2 !important; /* Vuetify primary blue */
  color: #fff !important;
}
</style>
