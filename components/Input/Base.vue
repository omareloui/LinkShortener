<script setup lang="ts">
withDefaults(defineProps<{ modelValue: string; type?: string; placeholder?: string; label: string; name: string }>(), {
  type: "text",
});
defineEmits<{ (e: "update:modelValue", value: string): void }>();

function getValue(e: Event) {
  return (e.target as EventTarget & { value: string }).value;
}

const inputElement = ref<HTMLInputElement | null>(null);

function focus() {
  inputElement.value?.focus();
}

defineExpose({ focus });
</script>

<template>
  <div class="form-field">
    <label :for="name">{{ label }}</label>
    <input
      ref="inputElement"
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', getValue($event))"
    />
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.form-field {
  margin: 10px auto;

  input {
    @include w(min(var(--screen-desktop), 100%));
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 20px;
    outline: none;
    border: none;
    border-radius: 6px;
    background: var(--blur-surface4);
    backdrop-filter: blur(3px);
    margin: 0 auto;
  }

  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
}
</style>
