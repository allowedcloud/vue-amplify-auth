<script setup lang="ts">
import { useForm } from "vee-validate";
const emit = defineEmits(["submit", "next", "currentStep"]);
const props = defineProps({
  validationSchema: {
    type: Array,
    required: true
  },
  currentStep: {
    type: Number,
    required: true
  }
});
const formData = ref({});
const currentStepIndex = ref(0);
// Inject starting step
const stepCounter = ref(0);
provide("STEP_COUNTER", stepCounter);
// Inject live ref of current index to child components
// used to toggle each step visibility
provide("CURRENT_STEP_INDEX", currentStepIndex);
// Get current schema
const currentSchema = computed(() => {
  return props.validationSchema[currentStepIndex.value];
});
// Make vee-validate aware of computed schema changes
const { handleSubmit } = useForm({
  validationSchema: currentSchema
});
// Submit
const onSubmit = handleSubmit((values) => {
  formData.value = {
    ...formData.value,
    ...values
  };

  // console.log(values);
  // currentStepIndex.value++;
  emit("submit", formData.value);
  // currentStepIndex.value++;
  // emit("next", formData.value);
  // emit("currentStep", currentStepIndex.value);
});

watchEffect(() => {
  currentStepIndex.value = currentStepIndex.value + props.currentStep;
});
</script>

<template>
  <form class="auth-form" @submit="onSubmit">
    <slot></slot>
    <div class="buttons">
      <button type="submit" class="solid">Submit</button>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
span {
  color: red;
}
</style>
