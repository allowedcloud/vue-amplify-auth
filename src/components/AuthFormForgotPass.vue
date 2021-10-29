<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

defineEmits(['formState'])

// break down the validation steps into multiple schemas
const validationSchema = [
  yup.object({
    email: yup
      .string()
      .required()
      .email()
      .label('Email Address'),
  }),
  yup.object({
    confirmCode: yup
      .string()
      .min(8)
      .required()
      .label('Code'),
  }),
  yup.object({
    password: yup
      .string()
      .min(8)
      .required()
      .label('Password'),
    confirmPass: yup
      .string()
      .required()
      .label('Password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  }),
]

/**
 * Only Called when the last step is submitted
 */
function onSubmit(formData) {
  console.log(JSON.stringify(formData, null, 2))
}

</script>

<template>
  <StepForm :validation-schema="validationSchema" @submit="onSubmit">
    <form-step>
      <button class="back-button" @click.prevent="$emit('formState', 'signIn')">
        <carbon-arrow-left />&nbsp; Back
      </button>
      <p>
        Please provide your email address in order to recieve
        a confirmation code that allows you to change your password.
      </p>
      <label for="email">Email</label>
      <Field name="email" type="email" placeholder="Email" />
      <ErrorMessage name="email" />
    </form-step>
    <form-step>
      <label for="confirmCode">Confirmation code</label>
      <Field name="confirmCode" type="text" placeholder="Confirmation code" />
      <ErrorMessage name="confirmCode" />
    </form-step>
    <form-step>
      <Field name="password" type="password" placeholder="Type a strong one" />
      <ErrorMessage name="password" />
      <Field name="confirmPass" type="password" placeholder="Confirm your password" />
      <ErrorMessage name="confirmPass" />
    </form-step>
  </StepForm>
</template>

<style lang="postcss" scoped>
p {
  width: 70%;
  font-family: sans-serif;
}

label {
  display: block;
}

button.back-button {
  background: none;
  border: none;
  display: block;
  margin-bottom: 2em;
  display: flex;
  align-items: center;
  cursor: pointer;
}

span[role="alert"] {
  font-size: 12px;
  color: var(--red-5);
}
</style>
