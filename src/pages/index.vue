<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non accumsan
      nunc, at euismod sapien. Etiam aliquet risus et leo laoreet placerat eu
      vel enim. Nunc pharetra eros sit amet dignissim tempus. Donec elementum
      hendrerit elit, a egestas sem aliquet eget. Vestibulum feugiat leo lectus,
      a semper purus aliquam non. Cras ultrices mauris sed sem gravida mollis.
      Vestibulum commodo, enim ut ultrices consectetur, tortor tellus dapibus
      justo, id dapibus leo arcu quis ipsum. Duis finibus ultricies risus, et
      vehicula nisi ultricies ut. Proin feugiat quam quis nisl elementum
      accumsan. Aliquam iaculis ipsum urna, et aliquam lorem commodo sit amet.
      Morbi scelerisque id eros non vehicula. Duis bibendum iaculis sapien. In
      dui eros, feugiat sit amet ligula eget, ultrices lacinia nisi. Vivamus
      imperdiet viverra erat, quis interdum lectus mollis eget.
    </p>
    <router-link to="/login" class="demo-button">Demo</router-link>
  </section>
</template>

<style lang="postcss" scoped>
section {
  display: flex;
  flex-direction: column;
}

p {
  font-family: sans-serif;
  font-size: 16px;
  max-width: 65ch;
  padding: 0 2em;
}
.demo-button {
  background-color: var(--gold-8);
  color: black;
  padding: 0.5em 2em;
  margin: 2em 0;
  border-radius: 15px;
  text-decoration: none;
  font-weight: 600;
  align-self: center;
  border: 2px solid transparent;
  &:hover {
    background-color: white;
    border-color: var(--gold-8);
  }
  &:active {
  }
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
