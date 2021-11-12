<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useStore } from "../stores/auth";
const store = useStore();
const isAuthenticated = computed(() => store.isAuthenticated);
const { t } = useI18n();
</script>

<template>
  <section>
    <img src="/vue-amplify-auth-logo.png" class="logo" />
    <h3>Vue 3 application showcasing user authentication with AWS Amplify.</h3>
    <p>
      This was built to show others how to implement user authentication in a
      Vue 3 application with the Composition API.
    </p>
    <ul>
      <li>Built with Vue 3 and the new Composition API</li>
      <li>Uses PostCSS</li>
      <li>Vite with Vitesse</li>
      <li>Custom-built authentication component</li>
    </ul>
    <router-link v-if="!isAuthenticated" to="/login" class="demo-button"
      >Demo</router-link
    >
  </section>
</template>

<style lang="postcss" scoped>
section {
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  padding: 1em;

  & img {
    width: 45%;
    filter: none;
    transition: filter 0.3s ease-in-out;
    margin: 2em 0;

    @media (min-width: 426px) {
      width: 20%;
    }

    &:hover {
      filter: grayscale(75%);
    }
  }

  & h3 {
    font-size: x-large;
    color: var(--gray-3);
    margin: 0.5em 0;
  }

  & p {
    font-size: large;
    color: var(--gray-4);
  }

  & ul {
    list-style: disc;
    list-style-position: inside;
    margin: 1em 0;
    color: var(--gray-4);

    & li {
      margin: 1em 0;
    }
  }

  & a.demo-button {
    -webkit-tap-highlight-color: transparent;
    border-radius: 14px;
    cursor: pointer;
    align-self: center;
    font-family: sans-serif;
    font-weight: 600;
    padding: 1em 2em;
    border: 3px solid var(--gold-7);
    background-color: var(--gold-8);
    color: var(--gold-5);

    &:hover {
      background-color: var(--gold-10);
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
