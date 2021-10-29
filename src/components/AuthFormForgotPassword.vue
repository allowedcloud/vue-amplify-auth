<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { object, string, ref as yupRef } from 'yup'

defineEmits(['formState'])

// Break down steps into multiple schemas
const validationSchemas = [
  object({
    email: string().email().required().label('Email'),
  }),
  object({
    confirmCode: string().min(6).required().label('Confirmation code'),
  }),
  object({
    password: string().min(8).required().label('New password'),
    confirmPassword: string().required().oneOf([yupRef('password')], 'Passwords must match').label('Confirm password'),
  }),
]
// Current step the form is on
const currentStep = ref(0)
// The schema to use based on which step the form is on
const currentSchema = computed(() => {
  return validationSchemas[currentStep.value]
})

// Errors and handleSubmit
const { resetForm, handleSubmit } = useForm({
  validationSchema: currentSchema,
  // initialValues: {
  //     email: '',
  // }
})

// Declare form values
const { value: email, meta: emailMeta, errors: emailError } = useField('email')
const { value: confirmCode, meta: confirmCodeMeta, errors: confirmCodeError } = useField('confirmCode')
const { value: password, meta: passwordMeta, errors: passwordError } = useField('password')
const { value: confirmPassword, meta: confirmPasswordMeta, errors: confirmPasswordError } = useField('confirmPassword')

const formData = ref({})
// Submit function
// Submits request and moves onto next step if success
const onSubmit = handleSubmit((values) => {
  formData.value = {
    ...values,
  }
  console.log(formData.value)
  console.log('Form submitted!')
  currentStep.value = currentStep.value + 1
})
</script>

<template>
  <template v-if="currentStep === 0">
    <form class="auth-form" @submit.prevent>
      <button class="back-button" @click.prevent="$emit('formState', 'signIn')">
        <carbon-arrow-left />&nbsp; Back
      </button>
      <p>
        Please provide the email you registered your account with.
        We will send you a confirmation code that will allow you
        to reset your password.
      </p>
      <label for="email">Email</label>
      <input v-model="email" type="text" name="email" autocomplete="email" autofocus="true" />
      <span v-if="emailError[0] && emailMeta.touched" class="errors">{{ emailError[0] }}</span>
      <div class="buttons">
        <button class="solid" @click="onSubmit">Submit</button>
      </div>
    </form>
  </template>
  <template v-if="currentStep === 1">
    <form class="auth-form" @submit.prevent>
      <p>Check your email for the confirmation code.</p>
      <label for="code">Code</label>
      <input v-model="confirmCode" type="text" name="code" />
      <span
        v-if="confirmCodeError[0] && confirmCodeMeta.touched"
        class="errors"
      >{{ confirmCodeError[0] }}</span>
      <div class="buttons">
        <button class="solid" @click="onSubmit">Submit</button>
      </div>
    </form>
  </template>
  <template v-if="currentStep === 2">
    <form class="auth-form" @submit.prevent>
      <p>Enter new password</p>
      <label for="password">New password</label>
      <input v-model="password" type="password" name="password" autocomplete="new-password" />
      <span v-if="passwordError[0] && passwordMeta.touched" class="errors">{{ passwordError[0] }}</span>
      <label for="confirmPassword">Confirm password</label>
      <input
        v-model="confirmPassword"
        type="password"
        name="confirmPassword"
        autocomplete="new-password"
      />
      <span
        v-if="confirmPasswordError[0] && confirmPasswordMeta.touched"
        class="errors"
      >{{ confirmPasswordError[0] }}</span>
      <div class="buttons">
        <button class="solid" @click="onSubmit">Submit</button>
      </div>
    </form>
  </template>
</template>

<style lang="postcss" scoped>
.errors {
  font-size: 12px;
  color: var(--red-6);
  font-weight: 600;
}
button.back-button {
}

.errors {
  font-size: 12px;
  color: var(--red-6);
  font-weight: 600;
}
button.back-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  align-self: flex-start;
  cursor: pointer;
}

p {
  margin: 1em 0;
}
