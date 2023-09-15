<script setup lang="ts">
const searchInput = ref<HTMLInputElement | null>(null);

const { query, setQuery } = useLinksStore();
const [openModalState] = useOpenModalState();

function focus() {
  searchInput?.value?.focus();
}

function onKeyup(e: KeyboardEvent) {
  if (openModalState.value) return;
  if (e.code === "Slash") focus();
}

function init() {
  addEventListener("keyup", onKeyup);
}

function onDestroy() {
  removeEventListener("keyup", onKeyup);
}

onMounted(focus);
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

::v-deep(input[type="search"]) {
  display: block;
}
</style>
