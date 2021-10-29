<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";
import { useStore } from "../stores/auth";

const store = useStore();
const router = useRouter();
const errorMessage = ref("");

// Define a validation schema
const schema = object({
  username: string().required().label("Username"),
  password: string().required().min(8).label("Your Password")
});

// Create a form context with the validation schema
const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    username: "",
    password: ""
  }
});

// Define fields
const { value: username, meta: userMeta } = useField("username");
const { value: password, meta: passwordMeta } = useField("password");

// Submit function
const onSubmit = handleSubmit((values) => {
  // Log the user in
  const user = store.signIn(values);
  // Handle return Promise
  user.then(
    () => {
      // Success
      router.push(`/users/${username.value}`);
    },
    (value) => {
      // Fail
      errorMessage.value = value.message;
      password.value = "";
      passwordMeta.touched = false;
    }
  );
});
</script>

<template>
  <form class="auth-form" @submit.prevent>
    <p class="errors">{{ errorMessage }}</p>
    <!-- Username field -->
    <label for="username">Username</label>
    <input
      v-model="username"
      type="text"
      name="username"
      autocomplete="user"
      autofocus="true"
    />
    <span v-if="errors.username && userMeta.touched" class="errors">{{
      errors.username
    }}</span>
    <!-- Password field -->
    <div class="pw">
      <label for="password">Password</label>
      <span tabindex="0" @click.prevent="$emit('formState', 'forgotPassword')"
        >Forgot password?</span
      >
    </div>
    <input
      v-model="password"
      type="password"
      name="password"
      autocomplete="current-password"
    />
    <span v-if="errors.password && passwordMeta.touched" class="errors">{{
      errors.password
    }}</span>
    <!-- Buttons -->
    <div class="buttons">
      <button class="solid" @click="onSubmit">Sign in</button>
      <span class="need-account">
        Need an account?
        <button class="clear" @click.prevent="$emit('formState', 'signUp')">
          Sign up
        </button>
      </span>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
.errors {
  font-size: 12px;
  color: var(--red-6);
  font-weight: 600;
}
.pw {
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  & span {
    background: none;
    border: none;
    white-space: nowrap;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
