<template>
  <main>
    <TheNav />
    <router-view />
    <TheFooter />
  </main>
</template>

<style lang="postcss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 70ch;
  margin: 0 auto;
}
</style>