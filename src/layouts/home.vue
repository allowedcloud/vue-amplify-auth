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
  /* margin: 0 auto; */
  margin: 0 auto 2rem auto;
  max-width: 70ch;
  /* margin-bottom: 3rem; */
  flex-grow: 1;

  @media (min-width: 425px) {
    margin: 5em auto;
  }
}
</style>
