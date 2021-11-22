<script setup lang="ts"></script>

<template>
  <section>
    <AuthForm />
  </section>
</template>

<style lang="postcss" scoped>
section {
  padding: 0 2em;
}
a {
  display: flex;
  align-items: center;
  gap: 1ch;
  color: var(--gray-2);
  text-decoration: none;
  font-weight: 600;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
