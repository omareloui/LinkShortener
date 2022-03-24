<script setup lang="ts">
import { useThemeStore } from "~~/store/useTheme";

const themeStore = useThemeStore();
</script>

<template>
  <ButtonBase
    class="theme-button"
    @click="themeStore.toggleTheme"
    is-normalized
  >
    Toggle Theme
  </ButtonBase>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *


.theme-button
  +pa(5px 8px)
  +br-md
  +fw-medium

  +clr-txt(light)
  background: var(--primary-gradient)
</style>
