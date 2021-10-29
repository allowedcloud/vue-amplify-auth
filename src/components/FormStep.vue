<script setup lang="ts">
const currentIndex = inject('STEP_COUNTER').value++
const formStepIndex = inject('CURRENT_STEP_INDEX')

const shouldShow = computed(() => {
  return currentIndex === formStepIndex.value
})
</script>

<template>
  <div v-if="shouldShow">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
</style>
