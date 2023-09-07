<script setup lang="ts">
const searchInput = ref<HTMLInputElement | null>(null);

const { query, setQuery } = await useLinksStore();

function focus() {
  searchInput?.value?.focus();
}

function onKeyup(e: KeyboardEvent) {
  if (e.code === "Slash" && document.activeElement?.tagName !== "INPUT") focus();
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
  <InputBase
    ref="searchInput"
    type="search"
    placeholder="Type / to search"
    name="search"
    no-auto-complete
    :modelValue="query"
    @update:modelValue="setQuery"
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
</style>
