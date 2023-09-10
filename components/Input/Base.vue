<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string;
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    noAutoComplete?: boolean;
  }>(),
  {
    type: "text",
    noAutoComplete: false,
  },
);
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const inputElement = ref<HTMLInputElement | null>(null);

function focus() {
  inputElement.value?.focus();
}

defineExpose({ focus });

const content = useModelWrapper(props, emit);
</script>

<template>
  <div class="form-field">
    <label :for="name" v-if="label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        v-model="content"
        ref="inputElement"
        v-bind="{ name, id: name, type, required, placeholder }"
        :autocomplete="noAutoComplete ? 'off' : 'on'"
      />
      <span class="required-dot" v-if="required"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.form-field {
  width: 100%;

  .input-wrapper {
    position: relative;
    --padding-x: 10px;

    input {
      @include w(min(var(--screen-desktop), 100%));
      font-size: 1rem;
      font-weight: bold;
      padding: var(--padding-x) 20px;
      outline: none;
      border-radius: 6px;
      background: var(--blur-surface4);
      backdrop-filter: blur(3px);
      margin: 0 auto;
      border: 2px solid transparent;
      transition: border ease-in-out 200ms;

      &:focus {
        border-color: var(--cyan);
      }
    }

    .required-dot {
      position: absolute;
      top: 50%;
      right: calc(var(--padding-x) + 10px);
      translate: 0 -50%;
      @include size(9px);
      border-radius: 50%;
      background: var(--important);
      display: inline-block;
    }
  }

  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
}
</style>
