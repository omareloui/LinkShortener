<script setup lang="ts">
const searchInput = ref<HTMLInputElement | null>(null);

const { query, setQuery } = useLinksStore();
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
