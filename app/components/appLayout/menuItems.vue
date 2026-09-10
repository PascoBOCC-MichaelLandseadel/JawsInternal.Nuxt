<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import tokenService from "../../services/common/tokenService.js";
import List from './lists/list.vue'

const items = ref([
  {
    title: 'Home',
    icon: 'mdi-home',
    to: '/home'
  },
  {
    title: 'Case Search',
    icon: 'mdi-folder-search',
    to: '/cases/search'
  },
  {
    title: 'Info',
    icon: 'mdi-information-variant',
    items: [
      {
        title: 'Help',
        icon: 'mdi-help',
        to: '/help'
      }
    ]
  }
])

function logOut() {
  const router = useRouter();
  tokenService.logout(router);
}
</script>

<template>
  <List :items="items" />
</template>