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
  <router-link to="/" :title="t('button.home')">
    <carbon-campsite />
  </router-link>

  <button :title="t('button.toggle_dark')" @click="toggleDark()">
    <carbon-moon v-if="isDark" />
    <carbon-sun v-else />
  </button>

  <a :title="t('button.toggle_langs')" @click="toggleLocales">
    <carbon-language />
  </a>

  <router-link to="/about" :title="t('button.about')">
    <carbon-dicom-overlay />
  </router-link>
</template>
