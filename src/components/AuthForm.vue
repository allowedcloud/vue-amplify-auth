<script setup lang="ts">
import { ref } from 'vue'
const formState = ref('signIn')

function changeFormState(state: string) {
  formState.value = state
}
</script>

<template>
  <div class="form-wrapper">
    <template v-if="formState === 'signIn'">
      <AuthFormSignIn @form-state="changeFormState($event)" />
    </template>
    <template v-if="formState === 'signUp'">
      <AuthFormSignUp @form-state="changeFormState($event)" />
    </template>
    <template v-if="formState === 'forgotPassword'">
      <!-- <AuthFormForgotPassword @form-state="changeFormState($event)" /> -->
      <AuthFormForgotPass @form-state="changeFormState($event)" />
    </template>
  </div>
</template>

<style lang="postcss" scoped>
.form-wrapper {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
