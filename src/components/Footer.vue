<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <footer>
    <button :title="t('button.toggle_dark')" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <button :title="t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </button>
    <a href="#">
      <carbon-logo-github />
    </a>
  </footer>
</template>

<style lang="postcss" scoped>
footer {
  display: flex;
  justify-content: center;
  margin: 2em 2em 0 2em;
  padding-top: 1em;
  border-top: 1px solid var(--gray-10);

  & button,
  a {
    color: var(--gray-4);
    background: none;
    border: none;
    margin: 0 1em;
    padding: 0;
    -webkit-tap-highlight-color: transparent;

    & svg {
      width: 20px;
      height: 20px;
    }
  }
}

.dark {
  & a {
    color: white;
  }
}
</style>
