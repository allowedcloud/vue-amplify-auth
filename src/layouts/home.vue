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
  padding: 0 auto 2rem auto;
  margin: 0 1rem 0 0;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--gray-7);
  border-right: 1px solid var(--gray-7);
  border-top-right-radius: 10px;
  background-color: var(--gray-11);
}

html.dark {
  & main {
    background-color: var(--gray-2);
  }
}
</style>
