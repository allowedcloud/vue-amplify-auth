<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useStore } from "../stores/auth";

const router = useRouter();

const store = useStore();
defineEmits(["formState"]);
const errorMessage = computed(() => store.error);

// break down the validation steps into multiple schemas
const validationSchema = [
  yup.object({
    username: yup.string().required().label("Username")
  }),
  yup.object({
    confirmCode: yup.string().min(6).required().label("Code"),
    password: yup.string().min(8).required().label("Password"),
    confirmPass: yup
      .string()
      .required()
      .label("Password")
      .oneOf([yup.ref("password")], "Passwords must match")
  }),
  yup.object({
    password: yup.string().min(8).required().label("Password"),
    confirmPass: yup
      .string()
      .required()
      .label("Password")
      .oneOf([yup.ref("password")], "Passwords must match")
  })
];

/**
 * Only Called when the last step is submitted
 *
 */
const currentStep = ref(0);
async function onSubmit(formData) {
  // console.info("Form Data: ", formData);
  if (currentStep.value === 0) {
    store.forgotPassword(formData.username).then(() => {
      currentStep.value++;
    });
  } else if (currentStep.value === 1) {
    store
      .forgotPasswordSubmit(
        formData.username,
        formData.confirmCode,
        formData.password
      )
      .then(() => {
        store
          .signIn({
            username: formData.username,
            password: formData.password
          })
          .then(() => {
            router.push(`/users/${formData.username}`);
          });
      })
      .catch((error) => console.log(error));
  }
  //
  // Submit username to retrieve code
  // if (formData.username) {
  //   currentStep.value = 1;
  //   const request = await store.forgotPassword(formData.username);
  //   if (request !== undefined) {
  //     currentStep.value = 1;
  //   } else {
  //     console.error("Request: ", request);
  //   }
  // }
  //
  // Submit code and new password
  // if (formData.confirmCode) {
  //   const request = await store.forgotPassword(formData);
  //   if (request !== undefined) {
  //     currentStep.value = 1;
  //     store
  //       .signIn({
  //         username: formData.username,
  //         password: formData.password
  //       })
  //       .then(() => {
  //         router.push(`/users/${formData.username}`);
  //       });
  //   } else {
  //     console.info("Form Data: ", formData);
  //   }
  // }
}
</script>

<template>
  <StepForm
    :validation-schema="validationSchema"
    :current-step="currentStep"
    @submit="onSubmit"
  >
    <form-step>
      <button class="back-button" @click.prevent="$emit('formState', 'signIn')">
        <carbon-arrow-left />&nbsp; Back
      </button>
      <p>
        Please provide your email address in order to recieve a confirmation
        code that allows you to change your password.
      </p>
      <label for="username">Username</label>
      <Field name="username" type="text" />
      <ErrorMessage name="username" />
      <span role="alert">
        {{ errorMessage }}
      </span>
    </form-step>
    <form-step>
      <label for="confirmCode">Confirmation code</label>
      <Field name="confirmCode" type="text" placeholder="Confirmation code" />
      <ErrorMessage name="confirmCode" />
      <Field
        name="password"
        type="password"
        placeholder="Type a strong one"
        autocomplete="new-password"
      />
      <ErrorMessage name="password" />
      <Field
        name="confirmPass"
        type="password"
        placeholder="Confirm your password"
        autocomplete="new-password"
      />
      <ErrorMessage name="confirmPass" />
      <span role="alert">
        {{ errorMessage }}
      </span>
    </form-step>
  </StepForm>
</template>

<style lang="postcss" scoped>
p {
  width: 300px;
  font-family: sans-serif;
}

label {
  display: block;
}

input {
  max-width: 85%;
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
  margin: 0 0 1em 0;
  font-size: 12px;
  color: var(--red-5);
}
</style>
