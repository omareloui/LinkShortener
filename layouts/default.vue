<script setup lang="ts">
useHead({
  htmlAttrs: { theme: "dark", lang: "en" },
});

if (process.client) {
  useTheme();
  useShortCuts();
}
</script>

<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>
