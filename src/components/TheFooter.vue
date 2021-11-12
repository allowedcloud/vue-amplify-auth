<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../stores/auth";
import { isDark, toggleDark } from "~/logic";

const { t, availableLocales, locale } = useI18n();
const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.isAuthenticated);
const username = computed(() => store.cognitoUser.username);

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

function signOut() {
  store.signOut();
  router.push("/login");
}
</script>

<template>
  <footer>
    <!-- <router-link to="/" title="Home">
      <carbon-home />
    </router-link>
    <router-link v-show="!isAuthenticated" to="/login" title="Login">
      <carbon-login />
    </router-link>
    <router-link v-show="isAuthenticated" :to="`/users/${username}`">
      <carbon-user />
    </router-link> -->
    <button :title="t('button.toggle_dark')" @click="toggleDark()">
      <span v-if="isDark">
        <carbon-sun />
        Light
      </span>
      <span v-else>
        <carbon-moon />
        Dark
      </span>
    </button>
    <button :title="t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
      {{ locale.toUpperCase() }}
    </button>
    <a href="#">
      <carbon-logo-github />
      Repository
    </a>
    <button v-show="isAuthenticated" @click="signOut">Sign out</button>
  </footer>
</template>

<style lang="postcss" scoped>
footer {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 1em;

  & button,
  a {
    display: flex;
    align-items: center;
    color: var(--gray-4);
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 600;
    background: none;
    border: none;
    margin: 0 1em;
    padding: 6px 10px;
    border-radius: 8px;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;

    &:active {
      background-color: var(--gray-10);
      color: var(--gray-4);
    }

    & span {
      display: flex;
      align-items: center;
    }

    & svg {
      color: var(--gray-6);
      width: 20px;
      height: 20px;
      padding: 0;
      margin: 0;
      margin-right: 0.5em;
    }
  }
}

html.dark {
  & button,
  a {
    color: white;

    &:active {
      background-color: var(--gray-3);
    }
  }
}
</style>
