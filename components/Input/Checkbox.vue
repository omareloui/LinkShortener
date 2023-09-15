<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  name: string;
  label: string;
  required?: boolean;
}>();

const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const inputElement = ref<HTMLInputElement | null>(null);

function focus() {
  inputElement.value?.focus();
}

defineExpose({ focus });

const content = useModelWrapper(props, emit);
</script>

<template>
  <div class="form-field form-field--checkbox">
    <label :for="name">{{ label }}</label>
    <input type="checkbox" v-model="content" ref="inputElement" v-bind="{ name, id: name, required }" />
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.form-field--checkbox {
  display: flex;
  gap: 8px;

  input:focus {
    outline: 2px dotted var(--subtext0);
    outline-offset: -1px;
    border-radius: 6px;
  }
}
</style>
