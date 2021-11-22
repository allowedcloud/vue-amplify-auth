<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../stores/auth";
interface User {
  username?: string;
}
const router = useRouter();
const store = useStore();
const isAuthenticated = computed(() => store.isAuthenticated);
const user: User = computed(() => store.cognitoUser);
function signOut() {
  store.signOut();
  router.push("/");
}
</script>

<template>
  <nav>
    <router-link to="/">
      <h1>Vue Amplify Auth</h1>
    </router-link>
    <div class="links">
      <router-link to="/">
        <carbon-home />
        <span class="label"> Home </span>
      </router-link>
      <router-link v-if="!isAuthenticated" to="/login">
        <carbon-login />
        <span class="label"> Demo </span>
      </router-link>
      <router-link v-show="isAuthenticated" :to="`/users/${user.username}`">
        <carbon-user />
        <span class="label">
          {{ user.username }}
        </span>
      </router-link>
      <button v-show="isAuthenticated" @click="signOut">
        <carbon-logout />
        <span class="label"> Logout </span>
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

  & .label {
    @media (max-width: 425px) {
      display: none;
    }
  }
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
    & a,
    button,
    h1 {
      color: var(--gray-10);
      &:active {
        background-color: var(--gray-3);
      }
    }

    & svg {
      color: var(--gray-8);
    }
  }
}
</style>
