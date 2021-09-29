
<script setup lang="ts">
function submitForm() {
    console.log('Form submitted!')
}
</script>

<template>
    <form class="auth-form">
        <label for="username">Username</label>
        <input type="text" name="username" autocomplete="user" />
        <span class="pw">
            <label for="password">Password</label>
            <button
                @click.prevent="$emit('formState', 'forgotPassword')"
                class="clear"
            >Forgot password?</button>
        </span>
        <input type="password" name="password" autocomplete="current-password" />
        <div class="buttons">
            <button @click="submitForm" class="solid">Sign in</button>
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
.pw {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    & button {
        background: none;
        border: none;
        white-space: nowrap;
        font-size: 12px;
        cursor: pointer;
    }
}
</style>