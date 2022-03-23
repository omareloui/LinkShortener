<script setup lang="ts">
withDefaults(defineProps<{ isNormalized?: boolean }>(), {
  isNormalized: false,
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button :class="{ normalized: isNormalized }" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped lang="sass">
@use "~~/assets/styles/mixins" as *

button
  +clickable

  &.normalized
    border: none
    +clr-bg(none)
</style>
