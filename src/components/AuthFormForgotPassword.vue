
<script setup lang="ts">
</script>

<template>
    <form class="auth-form">
        <button @click.prevent="$emit('formState', 'signIn')" class="back-button">
            <carbon-arrow-left />&nbsp; Back
        </button>
        <label for="email">Email</label>
        <input type="text" name="email" autocomplete="email" />
        <div class="buttons">
            <button class="solid">Submit</button>
        </div>
    </form>
</template>

<style lang="postcss" scoped>
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