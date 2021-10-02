<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { object, string } from 'yup'

const schema = object({
    email: string().required().label('Email')
})

const { errors, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        email: ''
    }
})

const { value: email, meta: emailMeta } = useField('email')

const onSubmit = handleSubmit(values => {
    console.log(values)
    console.log("Form submitted!")
});
</script>

<template>
    <form class="auth-form" @submit.prevent>
        <button @click.prevent="$emit('formState', 'signIn')" class="back-button">
            <carbon-arrow-left />&nbsp; Back
        </button>
        <label for="email">Email</label>
        <input v-model="email" type="text" name="email" autocomplete="email" />
        <span v-if="errors.email && emailMeta.touched" class="errors">{{ errors.email }}</span>
        <div class="buttons">
            <button @click="onSubmit" class="solid">Submit</button>
        </div>
    </form>
</template>

<style lang="postcss" scoped>
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
</style>