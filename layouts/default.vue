<script setup lang="ts">
import { useTheme } from "../composables/useTheme";

useHead({
  htmlAttrs: { theme: "dark", lang: "en" },
});

if (process.client) {
  useTheme();
}
</script>

<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>
