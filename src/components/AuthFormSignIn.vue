<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';

// Define a validation schema
const schema = object({
    user: string().required().label('Username'),
    password: string().required().min(8).label('Your Password'),
});

// Create a form context with the validation schema
const { errors, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        user: '',
        password: ''
    }
})

// Define fields
const { value: user, meta: userMeta } = useField('user');
const { value: password, meta: passwordMeta } = useField('password');

const onSubmit = handleSubmit(values => {
    console.log(values)
    console.log("Form submitted!")
});
</script>

<template>
    <form class="auth-form" @submit.prevent>
        <label for="username">Username</label>
        <input v-model="user" type="text" name="username" autocomplete="user" />
        <span v-if="errors.user && userMeta.touched" class="errors">{{ errors.user }}</span>
        <div class="pw">
            <label for="password">Password</label>
            <span
                @click.prevent="$emit('formState', 'forgotPassword')"
                tabindex="0"
            >Forgot password?</span>
        </div>
        <input v-model="password" type="password" name="password" autocomplete="current-password" />
        <span v-if="errors.password && passwordMeta.touched" class="errors">{{ errors.password }}</span>
        <div class="buttons">
            <button @click="onSubmit" class="solid">Sign in</button>
            <span>
                Need an account?
                <button
                    @click.prevent="$emit('formState', 'signUp')"
                    class="clear"
                >Sign up</button>
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