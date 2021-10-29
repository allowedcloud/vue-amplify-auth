<script setup lang="ts"></script>

<template>
  <nav>
    <router-link to="/">
      <h1>Vue Amplify Auth</h1>
    </router-link>
    <div class="links">
      <router-link to="/"> <carbon-home />Home </router-link>
      <router-link to="/login"> <carbon-login />Demo </router-link>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
  margin-bottom: 1em;
  border-bottom: 1px solid var(--gray-10);
  & .links {
    display: flex;
    font-family: sans-serif;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
  }
  & h1 {
    @media (max-width: 425px) {
      font-size: 20px;
    }
  }
  & a {
    display: flex;
    align-items: center;
    color: var(--gray-3);
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    margin: 0 0.5em;
    padding: 10px 10px;
    border-radius: 8px;

    &:active {
      color: var(--gray-2);
      background-color: var(--gray-10);
    }

    @media (max-width: 425px) {
      margin: 0 0.5em;
      padding: 6px 6px;
    }

    & svg {
      margin-right: 0.5em;
    }
  }
}

html.dark {
  nav {
    & a {
      color: white;

      &:active {
        background-color: var(--gray-3);
      }
    }
  }
}
</style>
