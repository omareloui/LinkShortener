<script setup lang="ts">
withDefaults(defineProps<{ isGradiant?: boolean; type?: "submit" | "button"; isBlock?: boolean }>(), {
  type: "button",
});

defineEmits<{ (e: "click"): void }>();
</script>

<template>
  <button v-bind="{ type }" :class="{ gradiant: isGradiant, block: isBlock }" @click="$emit('click')"><slot /></button>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

button {
  font-size: 1.1rem;
  @include w(min 110px);
  padding: 10px 20px;
  background: none;
  border: 2px solid white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:focus {
    outline: 2px var(--text) dotted;
    outline-offset: 3px;
  }

  &.gradiant {
    background: var(--gradient-primary);
    border: none;
    &:focus {
      outline-color: var(--cyan);
    }
  }

  &.block {
    display: block;
    @include w(100%);
  }
}
</style>
