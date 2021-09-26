<script setup lang="ts">
</script>

<template>
    <nav>
        <router-link to="/">
            <h1>Vue Amplify Auth</h1>
        </router-link>
    </nav>
</template>

<style lang="postcss" scoped>
nav {
    text-align: center;

    & a {
        color: var(--gray-3);
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
    }
}
</style>