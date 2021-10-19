<script setup lang="ts">
import { useStore } from './stores/auth'
const store = useStore()
store.load()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
import { useHead } from '@vueuse/head'
useHead({
  title: 'Vue Amplify Auth',
  meta: [
    { name: 'description', content: 'User auth in Vue 3 with AWS Amplify' },
  ],
})
</script>

<template>
  <router-view />
</template>
