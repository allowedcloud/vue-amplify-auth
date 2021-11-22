<script setup lang="ts">
import { useStore } from "~/stores/auth";
interface User {
  username?: string;
}
const store = useStore();
const user: User = store.getUser;
</script>

<!-- SFC route meta data -->
<!-- <route>
{
    meta: {
        auth: true
    }
}
</route> -->

<template>
  <section>
    <h1>Hello {{ user.username }}!</h1>
  </section>
</template>

<style lang="postcss" scoped>
section {
  padding: 0 2em;
}
</style>
