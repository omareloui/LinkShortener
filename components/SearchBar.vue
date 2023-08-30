<script setup lang="ts">
defineProps<{ modelValue: string }>();
defineEmits<{ (e: "update:modelValue", value: string): void }>();

const searchInput = ref<HTMLInputElement | null>(null);

function getValueFromEvent(e: Event) {
  return (e.target as EventTarget & { value: string }).value;
}

function focus() {
  searchInput?.value?.focus();
}

function onKeyup(e: KeyboardEvent) {
  if (e.code === "Slash") focus();
}

function init() {
  addEventListener("keyup", onKeyup);
  focus();
}

function onDestroy() {
  removeEventListener("keyup", onKeyup);
}

onBeforeMount(init);
onBeforeUnmount(onDestroy);
</script>

<template>
  <input
    ref="searchInput"
    type="search"
    placeholder="Type / to search"
    :value="modelValue"
    @input="$emit('update:modelValue', getValueFromEvent($event))"
  />
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

input[type="search"] {
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
</style>
