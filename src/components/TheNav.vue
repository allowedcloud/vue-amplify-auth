<script setup lang="ts">
import { useStore } from "../stores/auth";
const store = useStore();
const isAuthenticated = computed(() => store.isAuthenticated);
const user = computed(() => store.cognitoUser);
function signOut() {
  store.signOut();
  router.push("/login");
}
</script>

<template>
  <nav>
    <router-link to="/">
      <h1>Vue Amplify Auth</h1>
    </router-link>
    <div class="links">
      <router-link to="/"> <carbon-home />Home </router-link>
      <router-link v-if="!isAuthenticated" to="/login">
        <carbon-login />Demo
      </router-link>
      <router-link v-show="isAuthenticated" :to="`/users/${user.username}`">
        <carbon-user /> {{ user.username }}
      </router-link>
      <button v-show="isAuthenticated" @click="signOut">
        <carbon-logout />Logout
      </button>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0 0 0;
  margin-right: 1rem;
  & .links {
    display: flex;
    font-family: sans-serif;
    font-size: medium;
    text-transform: capitalize;

    @media (max-width: 425px) {
      font-size: small;
    }
  }
  & h1 {
    font-family: monospace;
    font-size: x-large;
    font-weight: 600;
    color: var(--gray-3);
    @media (max-width: 425px) {
      font-size: 18px;
    }
  }
  & a,
  button {
    display: flex;
    align-items: center;
    color: var(--gray-4);
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    margin: 0 0.5em;
    padding: 10px 10px;
    border-radius: 8px;
    cursor: pointer;

    &:active {
      color: var(--gray-2);
      background-color: var(--gray-10);
    }

    @media (max-width: 425px) {
      margin: 0 0.5em;
      padding: 6px 6px;
    }

    & svg {
      color: var(--gray-6);
      margin-right: 0.5em;
    }
  }
}

html.dark {
  nav {
    & a {
      color: var(--gray-9);

      &:active {
        background-color: var(--gray-3);
      }
    }
  }
}
</style>
