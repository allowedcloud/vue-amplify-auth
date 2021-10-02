<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { object, string, ref } from 'yup';

// Define a validation schema
const schema = object({
    user: string().required().label('Username'),
    password: string().required().min(8).label('Password'),
    email: string().required().label('Email'),
    cpassword: string().required().oneOf([ref("password")], "Passwords do not match").label('This'),
});

// Create a form context with the validation schema
const { errors, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        user: '',
        password: '',
        email: '',
        cpassword: ''
    }
})

// Define fields
const { value: user, meta: userMeta } = useField('user');
const { value: password, meta: passwordMeta } = useField('password');
const { value: email, meta: emailMeta } = useField('email');
const { value: cpassword, meta: cpasswordMeta } = useField('cpassword');

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
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email" autocomplete="email" />
        <span v-if="errors.email && emailMeta.touched" class="errors">{{ errors.email }}</span>
        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" autocomplete="new-password" />
        <span v-if="errors.password && passwordMeta.touched" class="errors">{{ errors.password }}</span>
        <label for="cpassword">Confirm password</label>
        <input v-model="cpassword" type="password" name="cpassword" autocomplete="new-password" />
        <span v-if="errors.cpassword && cpasswordMeta.touched" class="errors">{{ errors.cpassword }}</span>
        <div class="buttons">
            <button @click="onSubmit" class="solid">Sign Up</button>
            <span>
                Have an account?
                <button
                    @click.prevent="$emit('formState', 'signIn')"
                    class="clear"
                >Sign in</button>
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
</style>