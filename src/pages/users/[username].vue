<script setup lang="ts">
import { useStore } from '~/stores/auth'
const store = useStore()
const user = store.getUser
</script>

<route>
{
    meta: {
        auth: true
    }
}
</route>
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