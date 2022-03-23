<script setup lang="ts">
import { useThemeStore } from "~~/store/useTheme";

const themeStore = useThemeStore();
themeStore.load();

onMounted(themeStore.loadMediaQuery);
</script>

<template>
  <div class="layouts-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

.layouts-wrapper
  +py(20px)
</style>
