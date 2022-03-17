<script setup lang="ts">
import { useThemeStore } from "~~/store/useTheme";

const themeStore = useThemeStore();
themeStore.load();

onMounted(themeStore.loadMediaQuery);
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
