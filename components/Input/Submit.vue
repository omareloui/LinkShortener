<script setup lang="ts">
defineProps<{ isLoading?: boolean }>();
</script>

<template>
  <ButtonBase type="submit" :disabled="isLoading">
    <slot v-if="isLoading === false"></slot>
    <span v-else-if="isLoading === true">Loading</span>
  </ButtonBase>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

[type="submit"]
  +flex($gap: 10px, $center: true)
  justify-content: center

  border: none
  background: var(--primary-gradient)
  +clr-txt(light)

  +pa(12px)

  +br-lg
  +fw-bold
  +fs-base
  +ff(main)

  &[disabled]
    filter: opacity(0.7)
    +not-allowed

    span
      +dot-load-animation(5px, 3px, bottom 4.5px right -8px)

  ::v-deep(svg)
    +size(25px)
</style>
