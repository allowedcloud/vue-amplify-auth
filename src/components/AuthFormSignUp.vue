<script setup lang="ts">
import { useForm, useField, ErrorMessage } from 'vee-validate';
import { object, string, ref as yupRef } from 'yup';
import { useStore } from '../stores/auth'
import { ref } from 'vue'

defineEmits([
    'formState'
])

// Declare store
const store = useStore()

// Declare router
const router = useRouter()

// Declare form state
const confirmUser = ref(false)

// Declare response error message
const errorMessage = ref('')


// Define a validation schema
const schema = object({
    username: string().required().label('Username'),
    password: string().required().min(8).label('Password'),
    email: string().required().label('Email'),
    cpassword: string().required().oneOf([yupRef("password")], "Passwords do not match").label('This'),
});

// Create a form context with the validation schema
const { errors, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        username: '',
        password: '',
        email: '',
        cpassword: '',
    }

})

// Define fields
const { value: username, meta: userMeta } = useField('username');
const { value: password, meta: passwordMeta } = useField('password');
const { value: email, meta: emailMeta } = useField('email');
const { value: cpassword, meta: cpasswordMeta } = useField('cpassword');
const confirmCode = ref('')

// Submit handler
const onSubmit = handleSubmit(values => {
    console.log('Hello')
    const user = store.signUp(values)

    user.then(function () {
        // Success
        confirmUser.value = true
    },
        function (value) {
            // Fail
            errorMessage.value = value.message
            password.value = ''
            cpassword.value = ''
        }
    )
});

// Submit handler for confirmation code
const submitConfirmCode = () => {
    const userData = {
        username: username.value,
        code: confirmCode.value
    }
    const user = store.confirmSignUp(userData)
    user.then(function () {
        // Success
        const userData = {
            username: username.value,
            password: password.value
        }
        store.signIn(userData)
        router.push(`/users/${username.value}`)
    },
        function () {
            // Fail
            console.log(user)
            confirmCode.value = ''
            // confirmCodeMeta.touched = false
        })
}

</script>

<template>
    <template v-if="confirmUser === false">
        <form class="auth-form" @submit.prevent>
            <p class="errors">{{ errorMessage }}</p>
            <label for="username">Username</label>
            <input v-model="username" type="text" name="username" autocomplete="user" />
            <span v-if="errors.username && userMeta.touched" class="errors">{{ errors.username }}</span>
            <label for="email">Email</label>
            <input type="email" v-model="email" name="email" autocomplete="email" />
            <span v-if="errors.email && emailMeta.touched" class="errors">{{ errors.email }}</span>
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" autocomplete="new-password" />
            <span
                v-if="errors.password && passwordMeta.touched"
                class="errors"
            >{{ errors.password }}</span>
            <label for="cpassword">Confirm password</label>
            <input v-model="cpassword" type="password" name="cpassword" autocomplete="new-password" />
            <span
                v-if="errors.cpassword && cpasswordMeta.touched"
                class="errors"
            >{{ errors.cpassword }}</span>
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
    <template v-if="confirmUser === true">
        <form class="auth-form">
            <p class="errors">{{ errorMessage }}</p>
            <label for="confirmCode">Confirmation code</label>
            <input v-model="confirmCode" type="text" name="confirmCode" />
            <!-- <span
                v-if="errors.confirmCode && confirmCodeMeta.touched"
                class="errors"
            >{{ errors.confirmCode }}</span>-->
            <div class="buttons">
                <button @click.prevent="submitConfirmCode" class="solid">Confirm</button>
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
</style>