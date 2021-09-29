<script setup lang="ts">
function submitForm() {
    console.log('Form submitted!')
}
</script>

<template>
    <form class="auth-form" @submit.prevent="submit">
        <label for="username">Username</label>
        <input type="text" name="username" autocomplete="user" />
        <label for="email">Email</label>
        <input type="text" name="email" autocomplete="email" />
        <label for="password">Password</label>
        <input type="password" name="password" autocomplete="new-password" />
        <label for="cpassword">Confirm password</label>
        <input type="password" name="cpassword" autocomplete="new-password" />
        <div class="buttons">
            <button @click="submitForm" class="solid">Sign Up</button>
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
</style>