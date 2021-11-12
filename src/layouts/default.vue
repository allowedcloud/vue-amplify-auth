<template>
  <TheNav />
  <main>
    <router-view />
  </main>
  <TheFooter />
</template>

<style lang="postcss" scoped>
main {
  display: flex;
  flex-direction: column;
  margin: 0 auto 2rem auto;
  max-width: 70ch;
  flex-grow: 1;
}
</style>
